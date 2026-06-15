import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

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

const stays = [
  {
    id: "goa-oceanfront-retreat",
    name: "Goa Oceanfront Retreat",
    location: "North Goa",
    image: "/images/hotel/goa-luxury-beach-resort.jpg",
    price: "Rs. 12,999",
    detail: "Private beach access, spa suites, sunset dining",
  },
  {
    id: "kashmir-lake-view-hotel",
    name: "Kashmir Lake View Hotel",
    location: "Srinagar",
    image: "/images/hotel/kashmir-lake-view-hotel.jpg",
    price: "Rs. 14,999",
    detail: "Panoramic Dal Lake rooms with curated shikara rides",
  },
  {
    id: "udaipur-palace-hotel",
    name: "Udaipur Palace Hotel",
    location: "Udaipur",
    image: "/images/hotel/udaipur-palace-hotel.jpg",
    price: "Rs. 18,999",
    detail: "Royal suites, lakefront courtyards, heritage dining",
  },
  {
    id: "kerala-backwater-resort",
    name: "Kerala Backwater Resort",
    location: "Alleppey",
    image: "/images/hotel/kerala-backwater-resort.jpg",
    price: "Rs. 11,999",
    detail: "Water villas, Ayurveda rituals, private cruises",
  },
];

const packages = [
  {
    id: "goa-luxury-escape",
    title: "Goa Luxury Escape",
    duration: "4 Nights / 5 Days",
    image: "/images/packages/goa-luxury-package.jpg",
    price: "Rs. 42,999",
  },
  {
    id: "kashmir-honeymoon",
    title: "Kashmir Honeymoon",
    duration: "5 Nights / 6 Days",
    image: "/images/packages/kashmir-honeymoon-package.jpg",
    price: "Rs. 58,999",
  },
  {
    id: "kerala-backwater-indulgence",
    title: "Kerala Backwater Indulgence",
    duration: "5 Nights / 6 Days",
    image: "/images/packages/kerala-backwater-package.jpg",
    price: "Rs. 49,999",
  },
  {
    id: "rajasthan-royal-trail",
    title: "Rajasthan Royal Trail",
    duration: "6 Nights / 7 Days",
    image: "/images/packages/rajasthan-royal-package.jpg",
    price: "Rs. 64,999",
  },
];

const reasons = [
  "Handpicked luxury hotels and palace stays",
  "Private transfers with premium vehicles",
  "Curated itineraries across India",
  "Dedicated travel concierge support",
];

const testimonials = [
  {
    name: "Aarav Mehta",
    trip: "Rajasthan Royal Trail",
    quote:
      "Veloura made every city feel effortless, elegant, and deeply personal. The palace stay in Udaipur was unforgettable.",
  },
  {
    name: "Nisha Kapoor",
    trip: "Kashmir Honeymoon",
    quote:
      "The lake-view hotel, private shikara, and quiet itinerary were exactly the luxury experience we wanted.",
  },
  {
    name: "Rohan Iyer",
    trip: "Kerala Backwater Indulgence",
    quote:
      "Polished planning, beautiful properties, and a pace that felt premium without ever feeling rushed.",
  },
];

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [homeDestinations, setHomeDestinations] = useState(destinations);
  const [homeStays, setHomeStays] = useState(stays);
  const [homePackages, setHomePackages] = useState(packages);
  const [activeSearch, setActiveSearch] = useState("destinations");
  const [searchForm, setSearchForm] = useState({
    destination: "",
    days: "",
    nights: "",
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "2 Adults",
    stayType: "Beach Resort",
    budget: "Luxury",
  });

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    const loadCatalog = async () => {
      try {
        const [destRes, hotelRes, packageRes] = await Promise.all([
          fetch("/api/catalog?type=destinations"),
          fetch("/api/catalog?type=hotels"),
          fetch("/api/catalog?type=packages"),
        ]);
        const [destData, hotelData, packageData] = await Promise.all([
          destRes.json(),
          hotelRes.json(),
          packageRes.json(),
        ]);

        if (destData.success && destData.items.length > 0) {
          setHomeDestinations(
            destData.items.map((item) => ({
              slug: item.slug,
              name: item.name,
              region: item.region,
              image: item.image,
              price: `From Rs. ${Number(item.price).toLocaleString("en-IN")}`,
            }))
          );
        }

        if (hotelData.success && hotelData.items.length > 0) {
          setHomeStays(
            hotelData.items.map((item) => ({
              id: item.slug,
              name: item.name,
              location: item.location,
              image: item.image,
              price: `Rs. ${Number(item.price).toLocaleString("en-IN")}`,
              detail: item.description,
            }))
          );
        }

        if (packageData.success && packageData.items.length > 0) {
          setHomePackages(
            packageData.items.map((item) => ({
              id: item.slug,
              title: item.name,
              duration: item.duration,
              image: item.image,
              price: `Rs. ${Number(item.price).toLocaleString("en-IN")}`,
            }))
          );
        }
      } catch {
        console.error("Homepage catalog failed to load");
      }
    };

    checkUser();
    loadCatalog();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setUser(null);
      window.location.href = "/";
    } catch (error) {
      alert("Logout failed");
    }
  };

  const handleHolidaySearch = (e) => {
    e.preventDefault();

    const location =
      activeSearch === "hotels"
        ? searchForm.location.trim()
        : searchForm.destination.trim();
    const routeMap = {
      destinations: "/destinations",
      hotels: "/hotels",
      packages: "/packages",
    };

    router.push(
      location
        ? `${routeMap[activeSearch]}?location=${encodeURIComponent(location)}`
        : routeMap[activeSearch]
    );
  };

  return (
    <>
      <Head>
        <title>Veloura Holidays | Experience India in Luxury</title>
        <meta
          name="description"
          content="Luxury travel booking website for curated holidays across India."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.page}>
        <nav className={styles.navbar}>
          <Link className={styles.brand} href="/">
            <img
              src="/images/logo/veloura-logo.png"
              alt="Veloura Holidays"
              className={styles.logo}
            />
            <span>Veloura Holidays</span>
          </Link>

          <div className={styles.navLinks}>
            {user?.role === "ADMIN" ? (
              <>
                <Link href="/admin" className={styles.signupBtn}>
                  Admin Panel
                </Link>
                <span className={styles.userName}>Hi, {user.name.split(" ")[0]}</span>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </>
            ) : user ? (
              <>
                <Link href="/">Home</Link>
                <Link href="#destinations">Destinations</Link>
                <Link href="#hotels">Hotels</Link>
                <Link href="#packages">Packages</Link>
                <Link href="/my-bookings">My Bookings</Link>
                <Link href="#contact">Contact</Link>
                <span className={styles.userName}>Hi, {user.name.split(" ")[0]}</span>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/">Home</Link>
                <Link href="#destinations">Destinations</Link>
                <Link href="#hotels">Hotels</Link>
                <Link href="#packages">Packages</Link>
                <Link href="/my-bookings">My Bookings</Link>
                <Link href="#contact">Contact</Link>
                <Link href="/login">Login</Link>
                <Link href="/signup" className={styles.signupBtn}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </nav>

        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p className={styles.kicker}>Veloura Holidays</p>
            <h1>Experience India in Luxury</h1>
            <p>
              Curated journeys across India&apos;s most breathtaking destinations.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#destinations">
                Explore Destinations
              </a>
              <a className={styles.secondaryButton} href="#packages">
                View Packages
              </a>
            </div>
          </div>
        </section>

        <section className={styles.searchWrap} aria-label="Search holidays">
          <div className={styles.searchBox}>
            <div className={styles.searchTabs}>
              <button
                type="button"
                className={activeSearch === "destinations" ? styles.activeTab : ""}
                onClick={() => setActiveSearch("destinations")}
              >
                Destination
              </button>
              <button
                type="button"
                className={activeSearch === "hotels" ? styles.activeTab : ""}
                onClick={() => setActiveSearch("hotels")}
              >
                Hotel
              </button>
              <button
                type="button"
                className={activeSearch === "packages" ? styles.activeTab : ""}
                onClick={() => setActiveSearch("packages")}
              >
                Package
              </button>
            </div>

            <form className={styles.searchGrid} onSubmit={handleHolidaySearch}>
              {activeSearch === "destinations" && (
                <>
                  <label>
                    Destination
                    <input
                      type="text"
                      value={searchForm.destination}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          destination: e.target.value,
                        })
                      }
                      placeholder="Search destination"
                    />
                  </label>
                </>
              )}

              {activeSearch === "packages" && (
                <>
                  <label>
                    Package Location
                    <input
                      type="text"
                      value={searchForm.destination}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          destination: e.target.value,
                        })
                      }
                      placeholder="Where do you want to go?"
                    />
                  </label>

                  <label>
                    How Many Days
                    <input
                      type="number"
                      min="1"
                      value={searchForm.days}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          days: e.target.value,
                        })
                      }
                      placeholder="Days"
                    />
                  </label>

                  <label>
                    How Many Nights
                    <input
                      type="number"
                      min="1"
                      value={searchForm.nights}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          nights: e.target.value,
                        })
                      }
                      placeholder="Nights"
                    />
                  </label>
                </>
              )}

              {activeSearch === "hotels" && (
                <>
                  <label>
                    Location
                    <input
                      type="text"
                      value={searchForm.location}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          location: e.target.value,
                        })
                      }
                      placeholder="Search location"
                    />
                  </label>

                  <label>
                    Check In
                    <input
                      type="date"
                      value={searchForm.checkIn}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          checkIn: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Check Out
                    <input
                      type="date"
                      value={searchForm.checkOut}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          checkOut: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Guests
                    <select
                      value={searchForm.guests}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          guests: e.target.value,
                        })
                      }
                    >
                      <option>2 Adults</option>
                      <option>Family of 4</option>
                      <option>Group of 6</option>
                    </select>
                  </label>
                </>
              )}

              <button className={styles.searchButton} type="submit">
                Search
              </button>
            </form>
          </div>
        </section>

        <section className={styles.section} id="destinations">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>Destinations</p>
              <h2>India&apos;s most breathtaking escapes</h2>
            </div>
            <Link href="/destinations" className={styles.secondaryButton}>
              View All
            </Link>
          </div>

          <div className={styles.destinationGrid}>
            {homeDestinations.map((destination) => (
              <Link
                href={`/destinations/${destination.slug}`}
                key={destination.name}
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
        </section>

        <section className={styles.section} id="hotels">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>Luxury Stays</p>
              <h2>Hotels selected for setting, service, and soul</h2>
            </div>
            <Link href="/hotels" className={styles.secondaryButton}>
              View All
            </Link>
          </div>

          <div className={styles.packageGrid}>
            {homeStays.map((stay) => (
              <Link
                href={`/hotels/${stay.id}`}
                key={stay.name}
                style={{ textDecoration: "none" }}
              >
                <article className={styles.packageCard}>
                  <img src={stay.image} alt={stay.name} />
                  <div className={styles.packageBody}>
                    <p>{stay.location}</p>
                    <h3>{stay.name}</h3>
                    <div>
                      <span>{stay.price}</span>
                      <button>View Details</button>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} id="packages">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>Exclusive Packages</p>
              <h2>Ready-made journeys with a made-for-you feel</h2>
            </div>
            <Link href="/packages" className={styles.secondaryButton}>
              View All
            </Link>
          </div>
<div className={styles.packageGrid}>
  {homePackages.map((item) => (
    <Link
      href={`/packages/${item.id}`}
      key={item.title}
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
         </section>

        <section className={styles.whySection}>
          <div>
            <p className={styles.kicker}>Why Choose Veloura</p>
            <h2>Luxury planning with the precision of a concierge desk</h2>
          </div>

          <div className={styles.reasonGrid}>
            {reasons.map((reason, index) => (
              <article key={reason} className={styles.reasonCard}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{reason}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Testimonials</p>
            <h2>Travellers who chose the finer route</h2>
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial) => (
              <article className={styles.testimonialCard} key={testimonial.name}>
                <p>&quot;{testimonial.quote}&quot;</p>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.trip}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className={styles.footer} id="contact">
          <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <img
              src="/images/logo/veloura-logo.png"
              alt="Veloura Holidays"
              className={styles.footerLogo}
            />
            <h2>Veloura Holidays</h2>
            <p>Experience India in Luxury</p>
            <p>
              Curated luxury holidays across India with premium stays, private
              transfers, refined itineraries, and personal travel assistance.
            </p>
          </div>

          <div className={styles.footerColumn}>
            <h3>Explore</h3>
            <Link href="/">Home</Link>
            <Link href="/hotels">Luxury Hotels</Link>
            <Link href="#packages">Packages</Link>
            <Link href="#destinations">Destinations</Link>
            <Link href="/my-bookings">My Bookings</Link>
          </div>

          <div className={styles.footerColumn}>
            <h3>Company</h3>
            <Link href="/about">About Veloura</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>

          <div className={styles.footerColumn}>
            <h3>Contact</h3>
            <p>Veloura Holidays Travel Desk</p>
            <p>Mumbai, Maharashtra, India</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: support@velouraholidays.com</p>
            <p>Hours: 10:00 AM - 7:00 PM</p>
          </div>
          </div>

          <div className={styles.footerShowcase}>
            <div>
              <h3>Signature Experiences</h3>
              <p>
                Beachfront Goa escapes, Kashmir honeymoon stays, Kerala
                backwater cruises, Rajasthan palace trails, Himalayan retreats,
                and private family holidays across India.
              </p>
            </div>

            <div>
              <h3>Travel Assistance</h3>
              <p>
                Hotel curation, private cab planning, day-wise itineraries,
                payment support, booking help, cancellation guidance, and
                WhatsApp assistance during active trips.
              </p>
            </div>
          </div>

          <div className={styles.footerGallery} aria-label="Veloura travel highlights">
            <img src="/images/destinations/goa-calangute-beach.jpg" alt="Goa beach" />
            <img src="/images/destinations/srinagar-dal-lake.jpg" alt="Dal Lake Srinagar" />
            <img src="/images/destinations/jaipur-hawa-mahal.jpg" alt="Jaipur Hawa Mahal" />
            <img src="/images/hero/kerala-backwaters-hero.jpg" alt="Kerala backwaters" />
            <img src="/images/hero/rajasthan-palace-sunset-hero.jpg" alt="Rajasthan palace" />
          </div>

          <p className={styles.copyright}>
            Copyright 2026 Veloura Holidays. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}
