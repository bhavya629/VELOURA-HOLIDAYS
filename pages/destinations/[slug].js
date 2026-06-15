import Link from "next/link";
import { useRouter } from "next/router";

const destinations = {
  goa: {
    title: "Goa",
    image: "/images/destinations/goa-calangute-beach.jpg",
    description:
      "Goa blends golden beaches, Portuguese heritage, boutique resorts, seafood dining, and slow luxury by the Arabian Sea.",
    duration: "4 Nights / 5 Days",
    startDate: "November 15, 2026",
    endDate: "November 19, 2026",
    maxPeople: "10 guests",
    hotelName: "Goa Oceanfront Retreat",
    hotelType: "Luxury Beach Resort",
    price: "Rs. 42,999",
    bestTime: "November to February",
    itinerary: [
      "Day 1: Arrive in Goa, private transfer to a beach resort, and enjoy a relaxed sunset dinner.",
      "Day 2: Explore North Goa with Fort Aguada, Calangute, Candolim, and a curated beach lounge evening.",
      "Day 3: Visit Old Goa churches, Fontainhas lanes, and Panjim's riverside cafes.",
      "Day 4: Spend the day at leisure with optional spa, watersports, or a private Mandovi cruise.",
      "Day 5: Breakfast at the resort and private airport transfer.",
    ],
    places: ["Calangute Beach", "Fort Aguada", "Fontainhas", "Old Goa Churches", "Mandovi River"],
    included: ["Luxury stay", "Daily breakfast", "Private transfers", "Sightseeing car", "Cruise dinner"],
    excluded: ["Flights", "Personal expenses", "Watersports", "Meals not mentioned"],
    tips: ["Carry light cotton clothing.", "Reserve popular beach clubs in advance.", "Keep evenings free for sunset experiences."],
  },
  jaipur: {
    title: "Jaipur",
    image: "/images/destinations/jaipur-hawa-mahal.jpg",
    description:
      "Jaipur offers regal palaces, hill forts, handcrafted bazaars, and refined stays that turn Rajasthan's Pink City into a royal escape.",
    duration: "3 Nights / 4 Days",
    startDate: "December 10, 2026",
    endDate: "December 13, 2026",
    maxPeople: "12 guests",
    hotelName: "Jaipur Royal Heritage Haveli",
    hotelType: "Heritage Luxury Hotel",
    price: "Rs. 34,999",
    bestTime: "October to March",
    itinerary: [
      "Day 1: Arrive in Jaipur, check in to a heritage hotel, and enjoy a curated Rajasthani dinner.",
      "Day 2: Visit Amber Fort, Panna Meena ka Kund, City Palace, and Jantar Mantar.",
      "Day 3: See Hawa Mahal, explore Johari Bazaar, and attend a private block-printing or craft experience.",
      "Day 4: Breakfast, optional spa time, and private transfer to airport or railway station.",
    ],
    places: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Johari Bazaar"],
    included: ["Heritage stay", "Daily breakfast", "Private vehicle", "Local guide", "Cultural dinner"],
    excluded: ["Flights", "Monument tickets", "Shopping", "Camera fees"],
    tips: ["Start fort visits early.", "Wear comfortable footwear.", "Keep room in your luggage for textiles and jewellery."],
  },
  manali: {
    title: "Manali",
    image: "/images/destinations/manali-solang-valley.jpg",
    description:
      "Manali is a mountain retreat of pine forests, snow views, boutique stays, valley drives, and crisp Himalayan air.",
    duration: "4 Nights / 5 Days",
    startDate: "January 20, 2027",
    endDate: "January 24, 2027",
    maxPeople: "8 guests",
    hotelName: "Solang Valley Mountain Lodge",
    hotelType: "Luxury Mountain Resort",
    price: "Rs. 39,999",
    bestTime: "October to June",
    itinerary: [
      "Day 1: Arrive in Manali, check in to a mountain-view resort, and relax by the fireplace.",
      "Day 2: Visit Hadimba Temple, Old Manali, Manu Temple, and riverside cafes.",
      "Day 3: Drive to Solang Valley for snow views, ropeway options, and soft adventure activities.",
      "Day 4: Scenic day excursion toward Atal Tunnel or nearby valleys, depending on weather.",
      "Day 5: Breakfast and private transfer for departure.",
    ],
    places: ["Solang Valley", "Hadimba Temple", "Old Manali", "Manu Temple", "Atal Tunnel"],
    included: ["Mountain resort stay", "Daily breakfast", "Private transfers", "Local sightseeing", "Driver allowance"],
    excluded: ["Flights", "Adventure activity fees", "Snow gear rental", "Meals not mentioned"],
    tips: ["Pack warm layers.", "Road plans may shift with snow.", "Keep motion sickness medicine for winding routes."],
  },
  srinagar: {
    title: "Srinagar",
    image: "/images/destinations/srinagar-dal-lake.jpg",
    description:
      "Srinagar moves gently between Dal Lake, Mughal gardens, houseboats, mountain air, and elegant Kashmiri hospitality.",
    duration: "5 Nights / 6 Days",
    startDate: "April 12, 2027",
    endDate: "April 17, 2027",
    maxPeople: "8 guests",
    hotelName: "Kashmir Lake View Hotel",
    hotelType: "Lake View Luxury Hotel",
    price: "Rs. 58,999",
    bestTime: "April to October",
    itinerary: [
      "Day 1: Arrive in Srinagar, check in to a lake-view hotel, and enjoy a private shikara ride.",
      "Day 2: Explore Mughal Gardens, Nishat Bagh, Shalimar Bagh, and Hazratbal.",
      "Day 3: Full-day Gulmarg excursion with optional gondola experience.",
      "Day 4: Scenic Pahalgam day trip with valley stops and riverside lunch.",
      "Day 5: Houseboat-style evening experience with Kashmiri dinner.",
      "Day 6: Breakfast and private airport transfer.",
    ],
    places: ["Dal Lake", "Mughal Gardens", "Gulmarg", "Pahalgam", "Hazratbal"],
    included: ["Lake-view stay", "Daily breakfast", "Private transfers", "Shikara ride", "Sightseeing car"],
    excluded: ["Flights", "Gondola tickets", "Pony rides", "Personal expenses"],
    tips: ["Carry a light jacket even in spring.", "Book gondola slots early.", "Keep identity documents handy for local checks."],
  },
  munnar: {
    title: "Munnar",
    image: "/images/destinations/munnar-tea-gardens.jpg",
    description:
      "Munnar is Kerala's tea-country escape, shaped by misty hills, plantation walks, boutique resorts, and quiet wellness.",
    duration: "3 Nights / 4 Days",
    startDate: "September 18, 2026",
    endDate: "September 21, 2026",
    maxPeople: "10 guests",
    hotelName: "Munnar Tea Valley Resort",
    hotelType: "Plantation Luxury Resort",
    price: "Rs. 29,999",
    bestTime: "September to March",
    itinerary: [
      "Day 1: Arrive in Munnar, check in to a plantation resort, and enjoy a tea-view sunset.",
      "Day 2: Visit tea gardens, Tea Museum, Mattupetty Dam, and Echo Point.",
      "Day 3: Explore Eravikulam National Park and enjoy an optional Ayurveda session.",
      "Day 4: Breakfast and private transfer to Kochi or onward destination.",
    ],
    places: ["Tea Gardens", "Tea Museum", "Mattupetty Dam", "Echo Point", "Eravikulam National Park"],
    included: ["Plantation resort stay", "Daily breakfast", "Private transfers", "Sightseeing car", "Tea estate visit"],
    excluded: ["Flights", "Park entry fees", "Ayurveda extras", "Meals not mentioned"],
    tips: ["Carry a light rain jacket.", "Book Eravikulam entry ahead in peak season.", "Mornings are best for tea garden photos."],
  },
  rishikesh: {
    title: "Rishikesh",
    image: "/images/destinations/rishikesh-laxman-jhula.jpg",
    description:
      "Rishikesh combines the Ganga, yoga, riverfront stays, soft adventure, and spiritual calm in the Himalayan foothills.",
    duration: "3 Nights / 4 Days",
    startDate: "October 05, 2026",
    endDate: "October 08, 2026",
    maxPeople: "12 guests",
    hotelName: "Ganga Riverside Luxury Retreat",
    hotelType: "Riverfront Wellness Resort",
    price: "Rs. 27,999",
    bestTime: "September to April",
    itinerary: [
      "Day 1: Arrive in Rishikesh, check in to a riverfront retreat, and attend evening Ganga Aarti.",
      "Day 2: Visit Lakshman Jhula area, Beatles Ashram, yoga cafes, and riverside viewpoints.",
      "Day 3: Optional river rafting, spa time, and guided meditation session.",
      "Day 4: Breakfast and private transfer to Dehradun or Haridwar.",
    ],
    places: ["Lakshman Jhula", "Triveni Ghat", "Beatles Ashram", "Ganga River", "Yoga Cafes"],
    included: ["Riverfront stay", "Daily breakfast", "Private transfers", "Aarti visit", "Yoga or meditation session"],
    excluded: ["Flights", "Rafting fees", "Personal expenses", "Meals not mentioned"],
    tips: ["Choose modest clothing around ghats.", "Avoid rafting during restricted monsoon periods.", "Carry sandals for riverside walks."],
  },
};

export default function DestinationDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const destination = destinations[slug];

  if (!slug) {
    return null;
  }

  if (!destination) {
    return (
      <main style={pageStyle}>
        <section style={cardStyle}>
          <h1 style={titleStyle}>Destination Not Found</h1>
          <Link href="/" style={backLinkStyle}>
            Back to Home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main style={pageStyle}>
      <section
        style={{
          ...heroStyle,
          backgroundImage: `linear-gradient(90deg, rgba(7, 20, 38, 0.86), rgba(7, 20, 38, 0.3)), url("${destination.image}")`,
        }}
      >
        <div>
          <p style={kickerStyle}>Veloura Destination</p>
          <h1 style={heroTitleStyle}>{destination.title}</h1>
          <p style={heroTextStyle}>{destination.description}</p>
        </div>
      </section>

      <section style={contentWrapStyle}>
        <div style={cardStyle}>
          <p style={kickerStyle}>Overview</p>
          <h2 style={titleStyle}>Luxury travel plan for {destination.title}</h2>
          <p style={bodyTextStyle}>{destination.description}</p>
        </div>

        <div style={infoGridStyle}>
          <InfoCard label="Duration" value={destination.duration} />
          <InfoCard label="Start Date" value={destination.startDate} />
          <InfoCard label="End Date" value={destination.endDate} />
          <InfoCard label="Maximum People" value={destination.maxPeople} />
          <InfoCard label="Price" value={destination.price} />
          <InfoCard label="Best Time" value={destination.bestTime} />
        </div>

        <Section title="Day-wise Itinerary" items={destination.itinerary} ordered />

        <div style={cardStyle}>
          <p style={kickerStyle}>Hotel Stay Details</p>
          <h2 style={titleStyle}>{destination.hotelName}</h2>
          <p style={bodyTextStyle}>{destination.hotelType}</p>
        </div>

        <Section title="Places Covered" items={destination.places} />

        <div style={twoColumnStyle}>
          <Section title="Included Items" items={destination.included} />
          <Section title="Excluded Items" items={destination.excluded} />
        </div>

        <Section title="Travel Tips" items={destination.tips} />

        <div style={actionRowStyle}>
          <Link href={`/booking?type=destination&id=${slug}`} style={buttonStyle}>
  Book Now
</Link>
          <Link href="/" style={backLinkStyle}>
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }) {
  return (
    <article style={smallCardStyle}>
      <span style={kickerStyle}>{label}</span>
      <strong style={{ display: "block", marginTop: "8px" }}>{value}</strong>
    </article>
  );
}

function Section({ title, items, ordered = false }) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <section style={cardStyle}>
      <p style={kickerStyle}>{title}</p>
      <ListTag style={{ margin: "12px 0 0", paddingLeft: "22px", lineHeight: "1.85" }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    </section>
  );
}

const pageStyle = {
  minHeight: "100vh",
  color: "#F8F6F0",
  background:
    "radial-gradient(circle at 12% 8%, rgba(212, 175, 55, 0.16), transparent 30rem), linear-gradient(180deg, #07182d 0%, #0B1F3A 48%, #111827 100%)",
  fontFamily: "Poppins, sans-serif",
};

const heroStyle = {
  minHeight: "58vh",
  display: "flex",
  alignItems: "end",
  padding: "120px clamp(20px, 7vw, 90px) 70px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const contentWrapStyle = {
  maxWidth: "1180px",
  margin: "0 auto",
  padding: "42px 20px 70px",
  display: "grid",
  gap: "22px",
};

const cardStyle = {
  padding: "26px",
  background: "rgba(248, 246, 240, 0.08)",
  border: "1px solid rgba(248, 246, 240, 0.14)",
  borderRadius: "16px",
  boxShadow: "0 18px 48px rgba(0, 0, 0, 0.22)",
  backdropFilter: "blur(18px)",
};

const smallCardStyle = {
  ...cardStyle,
  padding: "20px",
};

const infoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
};

const twoColumnStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "22px",
};

const actionRowStyle = {
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
  alignItems: "center",
};

const kickerStyle = {
  margin: 0,
  color: "#D4AF37",
  fontSize: "0.78rem",
  fontWeight: "800",
  textTransform: "uppercase",
};

const heroTitleStyle = {
  margin: "12px 0 0",
  maxWidth: "760px",
  fontFamily: "Playfair Display, Georgia, serif",
  fontSize: "clamp(3.2rem, 7vw, 6.4rem)",
  lineHeight: 1,
};

const heroTextStyle = {
  maxWidth: "680px",
  margin: "22px 0 0",
  color: "rgba(248, 246, 240, 0.86)",
  fontSize: "1.08rem",
  lineHeight: 1.8,
};

const titleStyle = {
  margin: "8px 0 0",
  color: "#F8F6F0",
  fontFamily: "Playfair Display, Georgia, serif",
  fontSize: "2rem",
};

const bodyTextStyle = {
  margin: "14px 0 0",
  color: "rgba(248, 246, 240, 0.78)",
  lineHeight: 1.8,
};

const buttonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "48px",
  padding: "0 24px",
  color: "#111827",
  background: "#D4AF37",
  borderRadius: "8px",
  fontWeight: "800",
  textDecoration: "none",
};

const backLinkStyle = {
  color: "#D4AF37",
  fontWeight: "700",
  textDecoration: "none",
};
