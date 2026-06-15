import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `veloura_${Date.now()}`,
    });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
}