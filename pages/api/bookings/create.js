import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { prisma } from "../../../lib/prisma";
import { generateInvoice } from "../../../lib/generateInvoice";
import { sendBookingEmail } from "../../../lib/sendBookingEmail";

function createBookingCodes(bookingId) {
  const year = new Date().getFullYear();
  const serial = String(bookingId).padStart(4, "0");

  return {
    bookingReference: `BK-${year}${serial}`,
    invoiceNumber: `INV-${year}${serial}`,
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.veloura_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const {
      packageId,
      packageName,
      travellers,
      travelDate,
      amount,
    } = req.body;

    if (!packageId || !packageName || !travellers || !travelDate || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing booking details",
      });
    }

    const parsedTravelDate = new Date(travelDate);

    if (Number.isNaN(parsedTravelDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid travel date",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const booking = await prisma.booking.create({
      data: {
        userId: decoded.id,
        packageId,
        packageName,
        travellers: Number(travellers),
        travelDate: parsedTravelDate,
        amount: Number(amount),
        status: "Confirmed",
      },
    });

    const { bookingReference, invoiceNumber } = createBookingCodes(booking.id);

    let confirmedBooking = {
      ...booking,
      bookingReference,
      invoiceNumber,
      paymentStatus: "Paid",
    };
    let referenceMessage = "Booking reference and invoice number saved.";

    try {
      confirmedBooking = await prisma.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          bookingReference,
          invoiceNumber,
          paymentStatus: "Paid",
        },
      });
    } catch (referenceError) {
      console.error("Booking reference update failed:", referenceError);

      try {
        await prisma.$executeRaw`
          UPDATE Booking
          SET bookingReference = ${bookingReference},
              invoiceNumber = ${invoiceNumber},
              paymentStatus = ${"Paid"}
          WHERE id = ${booking.id}
        `;

        confirmedBooking = {
          ...booking,
          bookingReference,
          invoiceNumber,
          paymentStatus: "Paid",
        };
      } catch (rawReferenceError) {
        console.error("Raw booking reference update failed:", rawReferenceError);
        referenceMessage =
          "Booking saved, but invoice reference could not be stored.";
      }
    }

    setTimeout(async () => {
  try {
    const invoiceBuffer = await generateInvoice({
      booking: confirmedBooking,
      user,
    });

    await sendBookingEmail({
      booking: confirmedBooking,
      user,
      invoiceBuffer,
    });

    console.log("Booking confirmation email sent.");
  } catch (emailError) {
    console.error("Background booking email failed:", emailError);
  }
}, 0);

return res.status(201).json({
  success: true,
  booking: confirmedBooking,
  emailSent: "processing",
  message:
    "Booking confirmed! Invoice email is being sent to your registered email.",
});  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? `Booking failed: ${error.message}`
          : "Booking failed",
    });
  }
}
