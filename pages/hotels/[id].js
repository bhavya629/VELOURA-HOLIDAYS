import { useRouter } from "next/router";
import Link from "next/link";

const hotels = [
  {
    id: "goa-oceanfront-retreat",
    name: "Goa Oceanfront Retreat",
    location: "North Goa",
    rating: 5,
    type: "Luxury Beach Resort",
    price: 12999,
    image: "/images/hotel/goa-luxury-beach-resort.jpg",
    description:
      "A polished oceanfront resort experience designed around slow beach mornings, private transfers, spa rituals, and relaxed coastal dining. The stay is ideal for couples and families who want Goa's beach energy with a quieter luxury base.",
    roomType: "Premium Sea View Room",
    beds: "1 king bed or 2 twin beds",
    ac: "AC",
    roomSize: "430 sq. ft.",
    viewType: "Arabian Sea and garden view",
    maxGuests: "3 adults or 2 adults + 2 children",
    food: {
      breakfast: "Buffet breakfast with Indian, continental, and fresh coastal options",
      lunch: "A la carte lunch at the all-day restaurant or poolside cafe",
      dinner: "Seafood grill, Goan curries, and private beachside dining on request",
      vegNonVeg: "Vegetarian, Jain-friendly, seafood, and non-vegetarian meals available",
    },
    amenities: [
      "Wi-Fi",
      "Swimming pool",
      "Spa",
      "Parking",
      "Restaurant",
      "Room service",
      "Housekeeping",
      "Airport pickup",
    ],
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    cancellation:
      "Free cancellation up to 72 hours before check-in. One-night retention may apply for late cancellation or no-show.",
    rules: [
      "Valid government ID is required at check-in.",
      "Outside food and loud music are restricted in guest areas.",
      "Pool access follows resort timings and safety rules.",
      "Pets are allowed only if confirmed before arrival.",
    ],
    nearby: ["Calangute Beach", "Candolim Beach", "Fort Aguada", "Baga Beach", "Fontainhas"],
    gallery: [
      "/images/hotel/goa-luxury-beach-resort.jpg",
      "/images/destinations/goa-calangute-beach.jpg",
      "/images/packages/goa-luxury-package.jpg",
    ],
  },
  {
    id: "kashmir-lake-view-hotel",
    name: "Kashmir Lake View Hotel",
    location: "Srinagar",
    rating: 5,
    type: "Lake View Luxury Hotel",
    price: 14999,
    image: "/images/hotel/kashmir-lake-view-hotel.jpg",
    description:
      "A serene Srinagar stay with lake-facing rooms, warm Kashmiri interiors, shikara access, and curated local hospitality. The hotel works well for honeymooners and slow travellers who want Dal Lake close without losing modern comfort.",
    roomType: "Luxury Lake View Room",
    beds: "1 king bed",
    ac: "Heated room with seasonal AC",
    roomSize: "390 sq. ft.",
    viewType: "Dal Lake and mountain view",
    maxGuests: "3 guests",
    food: {
      breakfast: "Kashmiri and continental breakfast with kahwa service",
      lunch: "North Indian, Kashmiri, and light international meals",
      dinner: "Wazwan-inspired dinner options and private dining on request",
      vegNonVeg: "Vegetarian and non-vegetarian meals available",
    },
    amenities: [
      "Wi-Fi",
      "Parking",
      "Restaurant",
      "Room service",
      "Housekeeping",
      "Airport pickup",
      "Shikara assistance",
      "Heating",
    ],
    checkIn: "1:00 PM",
    checkOut: "11:00 AM",
    cancellation:
      "Free cancellation up to 5 days before check-in. Seasonal date changes are subject to availability.",
    rules: [
      "Photo ID is mandatory for all adult guests.",
      "Heating equipment should not be moved or covered.",
      "Shikara rides depend on weather and lake conditions.",
      "Quiet hours begin at 10:00 PM.",
    ],
    nearby: ["Dal Lake", "Nishat Bagh", "Shalimar Bagh", "Hazratbal Shrine", "Local floating market"],
    gallery: [
      "/images/hotel/kashmir-lake-view-hotel.jpg",
      "/images/destinations/srinagar-dal-lake.jpg",
      "/images/Gallery/dal-lake-shikara.jpg",
    ],
  },
  {
    id: "udaipur-palace-hotel",
    name: "Udaipur Palace Hotel",
    location: "Udaipur",
    rating: 5,
    type: "Palace Heritage Hotel",
    price: 18999,
    image: "/images/hotel/udaipur-palace-hotel.jpg",
    description:
      "A royal-style Udaipur stay inspired by lake palaces, carved balconies, courtyard dining, and heritage service. It is built for travellers who want regal atmosphere near the city's lakes, palaces, and old quarters.",
    roomType: "Royal Lake View Suite",
    beds: "1 king bed with lounge seating",
    ac: "AC",
    roomSize: "520 sq. ft.",
    viewType: "Lake, courtyard, or palace view",
    maxGuests: "3 adults",
    food: {
      breakfast: "Buffet breakfast with Rajasthani and continental selections",
      lunch: "Rooftop and courtyard lunch options",
      dinner: "Fine dining with regional thalis, grills, and candlelight setups",
      vegNonVeg: "Vegetarian, Jain, and non-vegetarian meals available",
    },
    amenities: [
      "Wi-Fi",
      "Swimming pool",
      "Spa",
      "Parking",
      "Restaurant",
      "Room service",
      "Housekeeping",
      "Airport pickup",
    ],
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    cancellation:
      "Free cancellation up to 96 hours before arrival. Festive and long-weekend dates may be non-refundable.",
    rules: [
      "Government ID is required at arrival.",
      "Heritage furniture and decor must be handled with care.",
      "Outside alcohol is not permitted in public areas.",
      "Extra guests are allowed only after front desk approval.",
    ],
    nearby: ["City Palace", "Lake Pichola", "Jagdish Temple", "Fateh Sagar Lake", "Gulab Bagh"],
    gallery: [
      "/images/hotel/udaipur-palace-hotel.jpg",
      "/images/destinations/jaipur-hawa-mahal.jpg",
      "/images/packages/rajasthan-royal-package.jpg",
    ],
  },
  {
    id: "kerala-backwater-resort",
    name: "Kerala Backwater Resort",
    location: "Alleppey",
    rating: 4,
    type: "Backwater Wellness Resort",
    price: 11999,
    image: "/images/hotel/kerala-backwater-resort.jpg",
    description:
      "A calm Alleppey retreat surrounded by coconut palms, canals, and slow backwater life. The stay focuses on wellness, local food, water views, and easy access to houseboat and shikara experiences.",
    roomType: "Backwater View Cottage",
    beds: "1 king bed",
    ac: "AC",
    roomSize: "410 sq. ft.",
    viewType: "Backwater and garden view",
    maxGuests: "3 guests",
    food: {
      breakfast: "Kerala breakfast with appam, dosa, fruits, and continental options",
      lunch: "Traditional Kerala meals and lighter resort menus",
      dinner: "Coastal Kerala dinner, grills, and private waterside dining on request",
      vegNonVeg: "Vegetarian, seafood, and non-vegetarian meals available",
    },
    amenities: [
      "Wi-Fi",
      "Swimming pool",
      "Spa",
      "Parking",
      "Restaurant",
      "Room service",
      "Housekeeping",
      "Airport pickup",
    ],
    checkIn: "1:00 PM",
    checkOut: "10:30 AM",
    cancellation:
      "Free cancellation up to 72 hours before arrival. Houseboat add-ons follow separate cancellation terms.",
    rules: [
      "Valid ID is required for every adult guest.",
      "Children must be supervised near water areas.",
      "Ayurveda therapies should be booked in advance.",
      "Boat activities depend on weather and local safety guidance.",
    ],
    nearby: ["Alleppey Backwaters", "Alappuzha Beach", "Vembanad Lake", "Kumarakom", "Marari Beach"],
    gallery: [
      "/images/hotel/kerala-backwater-resort.jpg",
      "/images/packages/kerala-backwater-package.jpg",
      "/images/Gallery/marine-drive-night-view.jpg",
    ],
  },
];

export default function HotelDetails() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return null;
  }

  const hotel = hotels.find((item) => item.id === id);

  if (!hotel) {
    return (
      <main style={pageStyle}>
        <section style={cardStyle}>
          <h1 style={titleStyle}>Hotel Not Found</h1>
          <Link href="/hotels" style={backLinkStyle}>
            Back to Hotels
          </Link>
        </section>
      </main>
    );
  }

  const handleBookHotel = () => {
    router.push(`/hotel-booking?id=${hotel.id}`);
  };

  return (
    <main style={pageStyle}>
      <section
        style={{
          ...heroStyle,
          backgroundImage: `linear-gradient(90deg, rgba(7, 20, 38, 0.92), rgba(7, 20, 38, 0.28)), url("${hotel.image}")`,
        }}
      >
        <div>
          <p style={kickerStyle}>Veloura Luxury Stay</p>
          <h1 style={heroTitleStyle}>{hotel.name}</h1>
          <p style={heroTextStyle}>{hotel.location} | {hotel.type} | {hotel.rating} / 5 Rating</p>
          <button onClick={handleBookHotel} style={buttonStyle}>
            Book Hotel
          </button>
        </div>
      </section>

      <section style={contentWrapStyle}>
        <section style={cardStyle}>
          <p style={kickerStyle}>Room Gallery</p>
          <div style={galleryGridStyle}>
            {hotel.gallery.map((image) => (
              <img
                key={image}
                src={image}
                alt={hotel.name}
                style={galleryImageStyle}
              />
            ))}
          </div>
        </section>

        <section style={cardStyle}>
          <p style={kickerStyle}>Hotel Overview</p>
          <h2 style={titleStyle}>{hotel.name}</h2>
          <p style={bodyTextStyle}>{hotel.description}</p>
          <h2 style={priceStyle}>Rs. {hotel.price.toLocaleString("en-IN")} / night</h2>
        </section>

        <div style={infoGridStyle}>
          <InfoCard label="Location" value={hotel.location} />
          <InfoCard label="Hotel Type" value={hotel.type} />
          <InfoCard label="Rating" value={`${hotel.rating} / 5`} />
          <InfoCard label="Check-in" value={hotel.checkIn} />
          <InfoCard label="Check-out" value={hotel.checkOut} />
          <InfoCard label="Max Guests" value={hotel.maxGuests} />
        </div>

        <section style={cardStyle}>
          <p style={kickerStyle}>Room Details</p>
          <div style={detailGridStyle}>
            <Detail label="Room Type" value={hotel.roomType} />
            <Detail label="Beds" value={hotel.beds} />
            <Detail label="AC / Non-AC" value={hotel.ac} />
            <Detail label="Room Size" value={hotel.roomSize} />
            <Detail label="View Type" value={hotel.viewType} />
            <Detail label="Maximum Guests" value={hotel.maxGuests} />
          </div>
        </section>

        <section style={cardStyle}>
          <p style={kickerStyle}>Food & Dining</p>
          <div style={detailGridStyle}>
            <Detail label="Breakfast" value={hotel.food.breakfast} />
            <Detail label="Lunch" value={hotel.food.lunch} />
            <Detail label="Dinner" value={hotel.food.dinner} />
            <Detail label="Veg / Non-Veg" value={hotel.food.vegNonVeg} />
          </div>
        </section>

        <Section title="Amenities" items={hotel.amenities} />
        <Section title="Nearby Attractions" items={hotel.nearby} />

        <section style={cardStyle}>
          <p style={kickerStyle}>Policies</p>
          <div style={detailGridStyle}>
            <Detail label="Cancellation Policy" value={hotel.cancellation} />
            <Detail label="Hotel Rules" value={hotel.rules.join(" ")} />
          </div>
        </section>

        <div style={actionRowStyle}>
          <button onClick={handleBookHotel} style={buttonStyle}>
            Book Hotel
          </button>
          <Link href="/hotels" style={backLinkStyle}>
            Back to Hotels
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

function Detail({ label, value }) {
  return (
    <div>
      <h3 style={detailTitleStyle}>{label}</h3>
      <p style={bodyTextStyle}>{value}</p>
    </div>
  );
}

function Section({ title, items }) {
  return (
    <section style={cardStyle}>
      <p style={kickerStyle}>{title}</p>
      <div style={pillGridStyle}>
        {items.map((item) => (
          <span key={item} style={pillStyle}>{item}</span>
        ))}
      </div>
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
  minHeight: "62vh",
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

const detailGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "18px",
  marginTop: "18px",
};

const pillGridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "16px",
};

const galleryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "14px",
  marginTop: "18px",
};

const galleryImageStyle = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "14px",
  border: "1px solid rgba(248, 246, 240, 0.14)",
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
  maxWidth: "860px",
  fontFamily: "Playfair Display, Georgia, serif",
  fontSize: "clamp(3rem, 6vw, 5.8rem)",
  lineHeight: 1,
};

const heroTextStyle = {
  maxWidth: "720px",
  margin: "20px 0 24px",
  color: "rgba(248, 246, 240, 0.86)",
  fontSize: "1.05rem",
  lineHeight: 1.8,
};

const titleStyle = {
  margin: "8px 0 0",
  color: "#F8F6F0",
  fontFamily: "Playfair Display, Georgia, serif",
  fontSize: "2rem",
};

const detailTitleStyle = {
  margin: 0,
  color: "#D4AF37",
  fontSize: "1rem",
};

const bodyTextStyle = {
  margin: "10px 0 0",
  color: "rgba(248, 246, 240, 0.78)",
  lineHeight: 1.75,
};

const priceStyle = {
  margin: "18px 0 0",
  color: "#D4AF37",
};

const pillStyle = {
  padding: "10px 14px",
  color: "#F8F6F0",
  background: "rgba(17, 24, 39, 0.55)",
  border: "1px solid rgba(212, 175, 55, 0.28)",
  borderRadius: "999px",
  fontWeight: "700",
};

const buttonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "48px",
  padding: "0 24px",
  color: "#111827",
  background: "#D4AF37",
  border: "1px solid #D4AF37",
  borderRadius: "8px",
  fontWeight: "800",
  textDecoration: "none",
  cursor: "pointer",
};

const backLinkStyle = {
  color: "#D4AF37",
  fontWeight: "700",
  textDecoration: "none",
};
