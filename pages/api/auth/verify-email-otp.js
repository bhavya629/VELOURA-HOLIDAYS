const otpStore = global.otpStore || new Map();
global.otpStore = otpStore;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { email, otp } = req.body;

    const savedOtp = otpStore.get(email);

    if (!savedOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new OTP.",
      });
    }

    if (Date.now() > savedOtp.expiresAt) {
      otpStore.delete(email);

      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new OTP.",
      });
    }

    if (savedOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    otpStore.delete(email);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "OTP verification failed.",
    });
  }
}