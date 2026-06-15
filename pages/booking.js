import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/Auth.module.css";

export default function BookingPage() {
  const router = useRouter();
  const { id, type = "package" } = router.query;

  const [user, setUser] = useState(null);
  const [item, setItem] = useState(null);
  const [loadingItem, setLoadingItem] = useState(true);

  const [form, setForm] = useState({
    travellers: 2,
    travelDate: "",
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

       if (!data.success) {
  router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
  return;
}

        setUser(data.user);
      } catch {
        router.push("/login");
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (!router.isReady || !id) return;

    const loadItem = async () => {
      try {
        setLoadingItem(true);

        let apiUrl = "/api/packages";
        let dataKey = "packages";

        if (type === "destination") {
          apiUrl = "/api/destinations";
          dataKey = "destinations";
        }

        if (type === "package") {
          apiUrl = "/api/packages";
          dataKey = "packages";
        }

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data.success) {
          setItem(null);
          return;
        }

        const list = data[dataKey] || [];

        const foundItem = list.find(
          (x) =>
            String(x.slug).toLowerCase() === String(id).toLowerCase() ||
            String(x.id) === String(id)
        );

        setItem(foundItem || null);
      } catch (error) {
        console.error("Booking item load error:", error);
        setItem(null);
      } finally {
        setLoadingItem(false);
      }
    };

    loadItem();
  }, [router.isReady, id, type]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!item) {
      alert(type === "destination" ? "Invalid destination" : "Invalid package");
      return;
    }

    if (!form.travelDate) {
      alert("Please select travel date");
      return;
    }

    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Razorpay failed to load");
      return;
    }

    const amount = Number(item.price);

    const orderRes = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const orderData = await orderRes.json();

    if (!orderData.success) {
      alert(orderData.message || "Failed to create Razorpay order");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: "Veloura Holidays",
      description:
        type === "destination"
          ? `Destination Booking - ${item.name}`
          : `Package Booking - ${item.name}`,
      order_id: orderData.order.id,

      handler: async function () {
        const bookingRes = await fetch("/api/bookings/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageId: item.slug,
            packageName:
              type === "destination"
                ? `Destination: ${item.name}`
                : item.name,
            travellers: Number(form.travellers),
            travelDate: form.travelDate,
            amount,
          }),
        });

        const bookingData = await bookingRes.json();

        if (bookingData.success) {
          alert("Payment successful and booking confirmed!");
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
        <h1>
          {type === "destination"
            ? "Book Destination"
            : "Book Your Trip"}
        </h1>

        <p>
          {loadingItem
            ? "Loading..."
            : item
            ? item.name
            : type === "destination"
            ? "Destination not found"
            : "Package not found"}
        </p>

        <h2 style={{ color: "#d4af37" }}>
          Rs. {item?.price || 0}
        </h2>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <input
            type="number"
            min="1"
            value={form.travellers}
            onChange={(e) =>
              setForm({
                ...form,
                travellers: e.target.value,
              })
            }
            placeholder="Travellers"
          />

          <input
            type="date"
            value={form.travelDate}
            onChange={(e) =>
              setForm({
                ...form,
                travelDate: e.target.value,
              })
            }
          />

          <button type="submit" disabled={!item || loadingItem}>
            Pay Now & Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}