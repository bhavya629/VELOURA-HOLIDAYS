import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const packages = [
  {
    id: "goa-luxury-escape",
    title: "Goa Luxury Escape",
    duration: "4 Nights / 5 Days",
    image: "/images/packages/goa-luxury-package.jpg",
    price: "Rs. 42,999",
    keywords: "goa beach calangute north goa",
  },
  {
    id: "kashmir-honeymoon",
    title: "Kashmir Honeymoon",
    duration: "5 Nights / 6 Days",
    image: "/images/packages/kashmir-honeymoon-package.jpg",
    price: "Rs. 58,999",
    keywords: "kashmir srinagar dal lake gulmarg",
  },
  {
    id: "kerala-backwater-indulgence",
    title: "Kerala Backwater Indulgence",
    duration: "5 Nights / 6 Days",
    image: "/images/packages/kerala-backwater-package.jpg",
    price: "Rs. 49,999",
    keywords: "kerala alleppey munnar backwater",
  },
  {
    id: "rajasthan-royal-trail",
    title: "Rajasthan Royal Trail",
    duration: "6 Nights / 7 Days",
    image: "/images/packages/rajasthan-royal-package.jpg",
    price: "Rs. 64,999",
    keywords: "rajasthan jaipur udaipur palace hawa mahal",
  },
];

export default function PackagesPage() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    if (typeof router.query.location === "string") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocation(router.query.location);
    }
  }, [router.isReady, router.query.location]);

  const filteredPackages = packages.filter((item) => {
    const term = location.toLowerCase();

    return (
      term === "" ||
      item.title.toLowerCase().includes(term) ||
      item.keywords.toLowerCase().includes(term)
    );
  });

  return (
    <main className={styles.page}>
      <section className={styles.section} style={{ paddingTop: "120px" }}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Exclusive Packages</p>
            <h2>Luxury holiday packages</h2>
          </div>
          <Link href="/" className={styles.secondaryButton}>
            Back Home
          </Link>
        </div>

        <form className={styles.searchGrid} style={{ marginBottom: "34px" }}>
          <label>
            Location
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search packages"
            />
          </label>
        </form>

        {filteredPackages.length === 0 ? (
          <h3 style={{ color: "#f8f6f0" }}>No results found.</h3>
        ) : (
          <div className={styles.packageGrid}>
            {filteredPackages.map((item) => (
              <Link
                href={`/packages/${item.id}`}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <article className={styles.packageCard}>
                  <img src={item.image} alt={item.title} />
                  <div className={styles.packageBody}>
                    <p>{item.duration}</p>
                    <h3>{item.title}</h3>
                    <div>
                      <span>{item.price}</span>
                      <button>View Details</button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
