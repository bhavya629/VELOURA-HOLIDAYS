import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Auth.module.css";

const packages = {
  "goa-luxury-escape": {
    id: "goa-luxury-escape",
    title: "Goa Luxury Escape",
    duration: "4 Nights / 5 Days",
    image: "/images/packages/goa-luxury-package.jpg",
    price: 42999,
    travelDates: "November 15, 2026 - November 19, 2026",
    maxPeople: "10 guests",
    hotel: "Goa Oceanfront Retreat - Luxury Beach Resort",
    overview:
      "A premium coastal escape with beach resort comfort, private transfers, sunset dining, relaxed sightseeing, and curated leisure along Goa's most loved shoreline.",
    places: ["Calangute Beach", "Candolim", "Fort Aguada", "Old Goa", "Mandovi River"],
    itinerary: [
      "Arrival in Goa, private transfer, resort check-in, and sunset dinner.",
      "North Goa sightseeing with Fort Aguada, Candolim, and Calangute.",
      "Old Goa churches, Fontainhas walk, and Panjim riverside cafes.",
      "Leisure day with optional spa, watersports, or Mandovi cruise.",
      "Breakfast and private airport transfer.",
    ],
    included: ["Luxury stay", "Daily breakfast", "Private transfers", "Sightseeing car", "Cruise dinner"],
    excluded: ["Flights", "Personal expenses", "Watersports", "Meals not mentioned"],
    gallery: [
      "/images/destinations/goa-calangute-beach.jpg",
      "/images/hotel/goa-luxury-beach-resort.jpg",
      "/images/hero/goa-beach-sunset-hero.jpg",
    ],
  },
  "kashmir-honeymoon": {
    id: "kashmir-honeymoon",
    title: "Kashmir Honeymoon",
    duration: "5 Nights / 6 Days",
    image: "/images/packages/kashmir-honeymoon-package.jpg",
    price: 58999,
    travelDates: "April 12, 2027 - April 17, 2027",
    maxPeople: "8 guests",
    hotel: "Kashmir Lake View Hotel - Lake View Luxury Hotel",
    overview:
      "A romantic Kashmir journey with lake-view stays, shikara rides, garden walks, snow mountain views, and private luxury travel between Srinagar, Gulmarg, and Pahalgam.",
    places: ["Dal Lake", "Mughal Gardens", "Gulmarg", "Pahalgam", "Srinagar Old City"],
    itinerary: [
      "Arrival in Srinagar, lake-view check-in, and private shikara ride.",
      "Mughal Gardens, Hazratbal, and old Srinagar sightseeing.",
      "Gulmarg excursion with optional gondola experience.",
      "Pahalgam valley day trip with scenic stops.",
      "Houseboat-style evening and Kashmiri dinner.",
      "Breakfast and airport transfer.",
    ],
    included: ["Luxury hotel stay", "Daily breakfast", "Private cab", "Shikara ride", "Sightseeing"],
    excluded: ["Flights", "Gondola tickets", "Snow activities", "Meals not mentioned"],
    gallery: [
      "/images/destinations/srinagar-dal-lake.jpg",
      "/images/hero/kashmir-snow-mountains-hero.jpg",
      "/images/Gallery/gulmarg-gondola.jpg",
    ],
  },
  "kerala-backwater-indulgence": {
    id: "kerala-backwater-indulgence",
    title: "Kerala Backwater Indulgence",
    duration: "5 Nights / 6 Days",
    image: "/images/packages/kerala-backwater-package.jpg",
    price: 49999,
    travelDates: "September 18, 2026 - September 23, 2026",
    maxPeople: "10 guests",
    hotel: "Kerala Backwater Resort - Backwater Wellness Resort",
    overview:
      "A slow luxury Kerala journey with backwater resorts, private houseboat cruising, tea country views, Ayurveda wellness, and refined coastal dining.",
    places: ["Kochi", "Munnar Tea Gardens", "Alleppey Backwaters", "Kumarakom", "Vembanad Lake"],
    itinerary: [
      "Arrival in Kochi, heritage drive, and premium hotel check-in.",
      "Drive to Munnar for tea gardens and hill resort stay.",
      "Munnar sightseeing with tea museum and Eravikulam region.",
      "Private Alleppey houseboat cruise through backwaters.",
      "Backwater resort leisure and Ayurveda wellness session.",
      "Breakfast and transfer to Kochi airport.",
    ],
    included: ["Resort stay", "Houseboat cruise", "Daily breakfast", "Private transfers", "Ayurveda session"],
    excluded: ["Flights", "Entry tickets", "Personal expenses", "Meals not listed"],
    gallery: [
      "/images/hero/kerala-backwaters-hero.jpg",
      "/images/destinations/munnar-tea-gardens.jpg",
      "/images/hotel/kerala-backwater-resort.jpg",
    ],
  },
  "rajasthan-royal-trail": {
    id: "rajasthan-royal-trail",
    title: "Rajasthan Royal Trail",
    duration: "6 Nights / 7 Days",
    image: "/images/packages/rajasthan-royal-package.jpg",
    price: 64999,
    travelDates: "December 10, 2026 - December 16, 2026",
    maxPeople: "12 guests",
    hotel: "Udaipur Palace Hotel - Palace Heritage Hotel",
    overview:
      "A royal Rajasthan trail through forts, palace stays, lake views, private city tours, heritage dining, and handcrafted cultural experiences.",
    places: ["Hawa Mahal", "Amber Fort", "City Palace Jaipur", "Lake Pichola", "Udaipur City Palace"],
    itinerary: [
      "Arrival in Jaipur, heritage hotel check-in, and royal welcome dinner.",
      "Amber Fort, City Palace, Hawa Mahal, and bazaar walk.",
      "Drive to Jodhpur or heritage stop with scenic Rajasthan countryside.",
      "Blue City and fort sightseeing with private guide.",
      "Transfer to Udaipur via heritage route.",
      "City Palace, Lake Pichola boat ride, and lakeside dinner.",
      "Breakfast and airport transfer.",
    ],
    included: ["Palace-style stay", "Daily breakfast", "Private vehicle", "Guided sightseeing", "Lake boat ride"],
    excluded: ["Flights", "Monument tickets", "Camera fees", "Meals not mentioned"],
    gallery: [
      "/images/Gallery/hawa-mahal-front-view.jpg",
      "/images/destinations/udaipur-city-palace.jpg",
      "/images/hero/rajasthan-palace-sunset-hero.jpg",
    ],
  },
};

export default function PackageDetails() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  const pkg = packages[id];

  if (!pkg) {
    return (
      <div className={styles.authPage}>
        <div className={styles.authCard}>
          <h1>Package Not Found</h1>
          <Link href="/" className={styles.backHome}>Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard} style={{ maxWidth: "980px" }}>
        <img src={pkg.image} alt={pkg.title} style={heroImageStyle} />

        <h1>{pkg.title}</h1>
        <p>{pkg.duration}</p>
        <h2 style={{ color: "#d4af37" }}>Rs. {pkg.price.toLocaleString("en-IN")}</h2>

        <InfoBlock title="Overview">
          <p>{pkg.overview}</p>
        </InfoBlock>

        <div style={gridStyle}>
          <InfoBlock title="Travel Dates"><p>{pkg.travelDates}</p></InfoBlock>
          <InfoBlock title="Maximum People"><p>{pkg.maxPeople}</p></InfoBlock>
          <InfoBlock title="Hotel Stay Details"><p>{pkg.hotel}</p></InfoBlock>
        </div>

        <InfoBlock title="Places Covered">
          <PillList items={pkg.places} />
        </InfoBlock>

        <InfoBlock title="Day-wise Itinerary">
          {pkg.itinerary.map((day, index) => (
            <p key={day}>Day {index + 1}: {day}</p>
          ))}
        </InfoBlock>

        <div style={gridStyle}>
          <InfoBlock title="Included">
            <PillList items={pkg.included} />
          </InfoBlock>
          <InfoBlock title="Excluded">
            <PillList items={pkg.excluded} />
          </InfoBlock>
        </div>

        <InfoBlock title="Gallery">
          <div style={galleryGridStyle}>
            {pkg.gallery.map((image) => (
              <img key={image} src={image} alt={pkg.title} style={galleryImageStyle} />
            ))}
          </div>
        </InfoBlock>
<button
  onClick={() => router.push(`/booking?type=package&id=${pkg.id}`)}
  style={buttonStyle}
>
          Book Package
        </button>

        <br />

        <Link href="/" className={styles.backHome}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function InfoBlock({ title, children }) {
  return (
    <section style={blockStyle}>
      <h3 style={{ color: "#d4af37", marginTop: 0 }}>{title}</h3>
      {children}
    </section>
  );
}

function PillList({ items }) {
  return (
    <div style={pillWrapStyle}>
      {items.map((item) => (
        <span key={item} style={pillStyle}>{item}</span>
      ))}
    </div>
  );
}

const heroImageStyle = {
  width: "100%",
  height: "390px",
  objectFit: "cover",
  borderRadius: "20px",
  marginBottom: "25px",
};

const blockStyle = {
  marginTop: "22px",
  padding: "18px",
  border: "1px solid rgba(212, 175, 55, 0.35)",
  borderRadius: "16px",
  background: "rgba(255,255,255,0.06)",
  textAlign: "left",
  color: "#f8f6f0",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "16px",
};

const pillWrapStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
};

const pillStyle = {
  padding: "9px 12px",
  color: "#f8f6f0",
  border: "1px solid rgba(212, 175, 55, 0.28)",
  borderRadius: "999px",
  background: "rgba(11,31,58,0.55)",
};

const galleryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
};

const galleryImageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "14px",
};

const buttonStyle = {
  marginTop: "24px",
  background: "#d4af37",
  color: "#0b1f3a",
  border: "none",
  padding: "14px 28px",
  borderRadius: "12px",
  fontWeight: "800",
  cursor: "pointer",
};
