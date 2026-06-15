import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Auth.module.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

export default function Login() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState("email");
  const [form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const isEmailLogin = loginMethod === "email";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleMethodChange = (method) => {
    setLoginMethod(method);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isEmailLogin && !emailRegex.test(form.email)) {
      alert("Email must contain @ and end with .com");
      return;
    }

    if (!isEmailLogin && form.phone.trim().length < 10) {
      alert("Phone number must be minimum 10 digits");
      return;
    }

    if (!form.password) {
      alert("Please enter your password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: isEmailLogin ? form.email : undefined,
          phone: isEmailLogin ? undefined : form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();
if (data.success) {
  alert("Login successful!");

  const redirectPath = router.query.redirect || "/";

  router.push(redirectPath);
}
 else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={`${styles.authCard} ${styles.signupCard}`}>
        <span className={styles.authEyebrow}>Veloura Holidays</span>
        <h1>Welcome Back</h1>
        <p>Login to continue your luxury journey with Veloura Holidays.</p>

        <form onSubmit={handleLogin} className={styles.authForm}>
          <div className={styles.otpTabs}>
            <button
              type="button"
              className={isEmailLogin ? styles.otpTabActive : styles.otpTab}
              onClick={() => handleMethodChange("email")}
            >
              Login with Email
            </button>

            <button
              type="button"
              className={!isEmailLogin ? styles.otpTabActive : styles.otpTab}
              onClick={() => handleMethodChange("phone")}
            >
              Login with Phone
            </button>
          </div>

          {isEmailLogin ? (
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

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <div className={styles.authLink}>
          Don&apos;t have an account? <Link
  href={
    router.query.redirect
      ? `/signup?redirect=${encodeURIComponent(router.query.redirect)}`
      : "/signup"
  }
>
  Create Account
</Link>
        </div>

        <Link href="/" className={styles.backHome}>
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
