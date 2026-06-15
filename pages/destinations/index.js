import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const destinations = [
  {
    slug: "goa",
    name: "Goa",
    region: "Calangute Beach",
    image: "/images/destinations/goa-calangute-beach.jpg",
    price: "From Rs. 18,999",
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    region: "Hawa Mahal",
    image: "/images/destinations/jaipur-hawa-mahal.jpg",
    price: "From Rs. 21,499",
  },
  {
    slug: "manali",
    name: "Manali",
    region: "Solang Valley",
    image: "/images/destinations/manali-solang-valley.jpg",
    price: "From Rs. 19,999",
  },
  {
    slug: "srinagar",
    name: "Srinagar",
    region: "Dal Lake",
    image: "/images/destinations/srinagar-dal-lake.jpg",
    price: "From Rs. 24,999",
  },
  {
    slug: "munnar",
    name: "Munnar",
    region: "Tea Gardens",
    image: "/images/destinations/munnar-tea-gardens.jpg",
    price: "From Rs. 17,999",
  },
  {
    slug: "rishikesh",
    name: "Rishikesh",
    region: "Laxman Jhula",
    image: "/images/destinations/rishikesh-laxman-jhula.jpg",
    price: "From Rs. 15,999",
  },
];

export default function DestinationsPage() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    if (typeof router.query.location === "string") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocation(router.query.location);
    }
  }, [router.isReady, router.query.location]);

  const filteredDestinations = destinations.filter((destination) => {
    const term = location.toLowerCase();

    return (
      term === "" ||
      destination.name.toLowerCase().includes(term) ||
      destination.region.toLowerCase().includes(term) ||
      destination.slug.toLowerCase().includes(term)
    );
  });

  return (
    <main className={styles.page}>
      <section className={styles.section} style={{ paddingTop: "120px" }}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Destinations</p>
            <h2>Explore India&apos;s luxury destinations</h2>
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
              placeholder="Search destination"
            />
          </label>
        </form>

        {filteredDestinations.length === 0 ? (
          <h3 style={{ color: "#f8f6f0" }}>No results found.</h3>
        ) : (
          <div className={styles.destinationGrid}>
            {filteredDestinations.map((destination) => (
              <Link
                href={`/destinations/${destination.slug}`}
                key={destination.slug}
                style={{ textDecoration: "none" }}
              >
                <article className={styles.imageCard}>
                  <img src={destination.image} alt={destination.name} />
                  <div className={styles.cardShade} />
                  <div className={styles.cardContent}>
                    <p>{destination.region}</p>
                    <h3>{destination.name}</h3>
                    <span>{destination.price}</span>
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
