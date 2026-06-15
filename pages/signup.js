import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Auth.module.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

const passwordRules = {
  length: /^.{8,}$/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*]/,
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [verificationMethod, setVerificationMethod] = useState("email");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailSignup = verificationMethod === "email";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleTabChange = (method) => {
    setVerificationMethod(method);
    setOtp("");
    setOtpSent(false);
    setOtpMessage("");
  };

  const validateBeforeOtp = () => {
    if (!form.name.trim()) {
      alert("Please enter your full name");
      return false;
    }

    if (isEmailSignup && !emailRegex.test(form.email)) {
      alert("Email must contain @ and end with .com");
      return false;
    }

    if (!isEmailSignup && form.phone.trim().length < 10) {
      alert("Please enter a valid phone number");
      return false;
    }

    if (!passwordRegex.test(form.password)) {
      alert(
        "Password must be 8+ characters and include uppercase, lowercase, number, and special character"
      );
      return false;
    }

    return true;
  };

  const handleSendOtp = async () => {
    if (!validateBeforeOtp()) return;

    if (!isEmailSignup) {
      alert("Phone OTP will be connected after SMS provider setup.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/send-email-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOtpSent(true);
        setOtpMessage("OTP sent to your email.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      await handleSendOtp();
      return;
    }

    if (!otp.trim()) {
      alert("Please enter OTP");
      return;
    }

    if (!validateBeforeOtp()) return;

    try {
      setLoading(true);

      const verifyRes = await fetch("/api/auth/verify-email-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          otp,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        alert(verifyData.message);
        return;
      }

      const signupRes = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          password: form.password,
        }),
      });

      const signupData = await signupRes.json();

      if (signupData.success) {
        alert("Account created successfully! Please login now.");

        setForm({
          name: "",
          email: "",
          phone: "",
          password: "",
        });

        setOtp("");
        setOtpSent(false);
        setOtpMessage("");
        router.push("/login");
      } else {
        alert(signupData.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const passwordBadges = [
    { label: "8+ characters", valid: passwordRules.length.test(form.password) },
    { label: "Uppercase", valid: passwordRules.uppercase.test(form.password) },
    { label: "Lowercase", valid: passwordRules.lowercase.test(form.password) },
    { label: "Number", valid: passwordRules.number.test(form.password) },
    { label: "Special", valid: passwordRules.special.test(form.password) },
  ];

  return (
    <div className={styles.authPage}>
      <div className={`${styles.authCard} ${styles.signupCard}`}>
        <span className={styles.authEyebrow}>Veloura Holidays</span>
        <h1>Create Your Luxury Travel Account</h1>

        <form onSubmit={handleSignup} className={styles.authForm}>
          <div className={styles.otpTabs}>
            <button
              type="button"
              className={isEmailSignup ? styles.otpTabActive : styles.otpTab}
              onClick={() => handleTabChange("email")}
            >
              Email OTP
            </button>

            <button
              type="button"
              className={!isEmailSignup ? styles.otpTabActive : styles.otpTab}
              onClick={() => handleTabChange("phone")}
            >
              Phone OTP
            </button>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          {isEmailSignup ? (
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
          ) : (
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {passwordBadges.map((badge) => (
              <span
                key={badge.label}
                style={{
                  border: "1px solid rgba(212, 175, 55, 0.28)",
                  borderRadius: "999px",
                  padding: "7px 10px",
                  background: badge.valid
                    ? "rgba(212, 175, 55, 0.2)"
                    : "rgba(255, 255, 255, 0.06)",
                  color: badge.valid ? "#F8F6F0" : "rgba(248, 246, 240, 0.72)",
                  fontSize: "0.78rem",
                  fontWeight: "700",
                }}
              >
                {badge.valid ? "✓ " : ""}
                {badge.label}
              </span>
            ))}
          </div>

          {otpMessage && (
            <p style={{ margin: 0, color: "#D4AF37", fontWeight: "700" }}>
              {otpMessage}
            </p>
          )}

          {otpSent && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : otpSent
              ? "Verify OTP & Create Account"
              : "Send OTP"}
          </button>
        </form>

        <div className={styles.authLink}>
          Already have an account? <Link href="/login">Login</Link>
        </div>

        <Link href="/" className={styles.backHome}>
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
