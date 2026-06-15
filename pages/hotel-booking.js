import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Auth.module.css";

const hotelData = {
  "goa-oceanfront-retreat": {
    name: "Goa Oceanfront Retreat",
    price: 12999,
  },
  "kashmir-lake-view-hotel": {
    name: "Kashmir Lake View Hotel",
    price: 14999,
  },
  "udaipur-palace-hotel": {
    name: "Udaipur Palace Hotel",
    price: 18999,
  },
  "kerala-backwater-resort": {
    name: "Kerala Backwater Resort",
    price: 11999,
  },
};

export default function HotelBooking() {
  const router = useRouter();
  const { id } = router.query;

  const hotel = hotelData[id];

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: 2,
  });

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (!data.success) {
       router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
        return;
      }

      setUser(data.user);
    };

    checkUser();
  }, [router]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector("#razorpay-script")) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleHotelBooking = async (e) => {
    e.preventDefault();

    if (!hotel) {
      alert("Invalid hotel");
      return;
    }

    if (!form.checkIn || !form.checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Razorpay failed to load");
      return;
    }

    const orderRes = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: hotel.price }),
    });

    const orderData = await orderRes.json();

    if (!orderData.success) {
      alert(orderData.message);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.order.amount,
      currency: "INR",
      name: "Veloura Holidays",
      description: hotel.name,
      order_id: orderData.order.id,
      handler: async function () {
        const bookingRes = await fetch("/api/bookings/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageId: id,
            packageName: `Hotel: ${hotel.name}`,
            travellers: form.guests,
            travelDate: form.checkIn,
            amount: hotel.price,
          }),
        });

        const bookingData = await bookingRes.json();

        if (bookingData.success) {
          alert(
            `Hotel booking successful! ${bookingData.message || ""}`
          );
          router.push("/my-bookings");
        } else {
          alert(bookingData.message || "Booking failed");
        }
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: user?.phone || "",
      },
      theme: {
        color: "#0B1F3A",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <h1>Book Hotel</h1>

        <p>{hotel?.name || "Loading hotel..."}</p>

        <h2 style={{ color: "#d4af37" }}>
          Rs. {hotel?.price || 0} / night
        </h2>

        <form onSubmit={handleHotelBooking} className={styles.authForm}>
          <input
            type="date"
            value={form.checkIn}
            onChange={(e) =>
              setForm({ ...form, checkIn: e.target.value })
            }
          />

          <input
            type="date"
            value={form.checkOut}
            onChange={(e) =>
              setForm({ ...form, checkOut: e.target.value })
            }
          />

          <input
            type="number"
            min="1"
            value={form.guests}
            onChange={(e) =>
              setForm({ ...form, guests: e.target.value })
            }
            placeholder="Guests"
          />

          <button type="submit">Pay Now & Book Hotel</button>
        </form>
      </div>
    </div>
  );
}   
