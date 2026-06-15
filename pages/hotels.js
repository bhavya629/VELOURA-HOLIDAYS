import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const hotels = [
  {
    id: "goa-oceanfront-retreat",
    name: "Goa Oceanfront Retreat",
    location: "Goa",
    rating: 5,
    type: "Resort",
    amenities: ["Wi-Fi", "Swimming Pool", "Spa", "Restaurant"],
    price: 12999,
    distance: 3,
    image: "/images/hotel/goa-luxury-beach-resort.jpg",
  },
  {
    id: "kashmir-lake-view-hotel",
    name: "Kashmir Lake View Hotel",
    location: "Srinagar",
    rating: 5,
    type: "Hotel",
    amenities: ["Wi-Fi", "Room Service", "Restaurant"],
    price: 14999,
    distance: 5,
    image: "/images/hotel/kashmir-lake-view-hotel.jpg",
  },
  {
    id: "udaipur-palace-hotel",
    name: "Udaipur Palace Hotel",
    location: "Udaipur",
    rating: 5,
    type: "Hotel",
    amenities: ["Wi-Fi", "Swimming Pool", "Parking", "Restaurant"],
    price: 18999,
    distance: 2,
    image: "/images/hotel/udaipur-palace-hotel.jpg",
  },
  {
    id: "kerala-backwater-resort",
    name: "Kerala Backwater Resort",
    location: "Alleppey",
    rating: 4,
    type: "Resort",
    amenities: ["Wi-Fi", "Spa", "Room Service"],
    price: 11999,
    distance: 7,
    image: "/images/hotel/kerala-backwater-resort.jpg",
  },
];

export default function HotelsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("relevance");
  const [price, setPrice] = useState(50000);
  const [rating, setRating] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [amenity, setAmenity] = useState("");
  const [distance, setDistance] = useState(10);
  const [guests, setGuests] = useState("1 Room, 2 Adults");
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (typeof router.query.location === "string") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocation(router.query.location);
    }
  }, [router.isReady, router.query.location]);

  let filteredHotels = hotels.filter((hotel) => {
    const locationTerm = location.toLowerCase();
    const matchesLocation =
      locationTerm === "" ||
      hotel.location.toLowerCase().includes(locationTerm) ||
      hotel.name.toLowerCase().includes(locationTerm) ||
      (locationTerm === "kerala" &&
        (hotel.location.toLowerCase().includes("alleppey") ||
          hotel.name.toLowerCase().includes("kerala")));

    return (
      hotel.name.toLowerCase().includes(search.toLowerCase()) &&
      hotel.price <= price &&
      hotel.distance <= distance &&
      matchesLocation &&
      (rating === "" || hotel.rating === Number(rating)) &&
      (propertyType === "" || hotel.type === propertyType) &&
      (amenity === "" || hotel.amenities.includes(amenity))
    );
  });

  if (sort === "rating") {
    filteredHotels = [...filteredHotels].sort((a, b) => b.rating - a.rating);
  }

  if (sort === "priceLow") {
    filteredHotels = [...filteredHotels].sort((a, b) => a.price - b.price);
  }

  if (sort === "priceHigh") {
    filteredHotels = [...filteredHotels].sort((a, b) => b.price - a.price);
  }

  const mapQuery =
    filteredHotels.length > 0
      ? filteredHotels.map((hotel) => hotel.location).join(", India ")
      : location || "India luxury hotels";

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 12% 8%, rgba(212, 175, 55, 0.16), transparent 30rem), linear-gradient(180deg, #07182d 0%, #0B1F3A 48%, #111827 100%)",
        color: "#F8F6F0",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <nav
        style={{
          height: "78px",
          background: "rgba(11, 31, 58, 0.78)",
          borderBottom: "1px solid rgba(248, 246, 240, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 52px",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(18px)",
          boxShadow: "0 18px 46px rgba(0, 0, 0, 0.26)",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <img
            src="/images/logo/veloura-logo.png"
            alt="Veloura Holidays"
            style={{ width: "46px", height: "46px", objectFit: "contain" }}
          />
          <strong style={{ color: "#F8F6F0", fontSize: "18px" }}>
            Veloura Holidays
          </strong>
        </Link>

        <div style={{ display: "flex", gap: "34px", alignItems: "center" }}>
          <Link href="/hotels" style={{ textDecoration: "none", color: "#D4AF37", fontWeight: "700" }}>
            Hotels
          </Link>
          <Link href="/" style={{ textDecoration: "none", color: "rgba(248, 246, 240, 0.86)", fontWeight: "600" }}>
            Packages
          </Link>
          <Link href="/my-bookings" style={{ textDecoration: "none", color: "rgba(248, 246, 240, 0.86)", fontWeight: "600" }}>
            My Bookings
          </Link>
        </div>
      </nav>

      <section
        style={{
          background: "rgba(248, 246, 240, 0.08)",
          padding: "28px 52px",
          borderBottom: "1px solid rgba(248, 246, 240, 0.12)",
          backdropFilter: "blur(14px)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "28px" }}>Search Results</h1>
        <p style={{ marginTop: "10px", color: "rgba(248, 246, 240, 0.72)" }}>
          {filteredHotels.length} properties found - {guests}
        </p>

        <div
          style={{
            marginTop: "25px",
            display: "grid",
            gridTemplateColumns: "1.2fr 1.2fr 0.7fr 180px",
            gap: "12px",
            alignItems: "end",
          }}
        >
          <label style={topLabelStyle}>
            Location
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search location"
              style={topInputStyle}
            />
          </label>

          <label style={topLabelStyle}>
            Check In - Check Out
            <input type="text" defaultValue="Jun 11, 2026 - Jul 04, 2026" style={topInputStyle} />
          </label>

          <label style={topLabelStyle}>
            Guests
            <select value={guests} onChange={(e) => setGuests(e.target.value)} style={topInputStyle}>
              <option>1 Room, 2 Adults</option>
              <option>1 Room, 2 Adults, 1 Child</option>
              <option>2 Rooms, 4 Adults</option>
              <option>2 Rooms, 4 Adults, 2 Children</option>
            </select>
          </label>

          <button style={goldButtonStyle}>
            Search Hotels
          </button>
        </div>
      </section>

      <main
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "24px",
          padding: "24px 40px",
        }}
      >
        <aside style={{ display: "grid", gap: "16px", alignSelf: "start" }}>
          <FilterBox title="Sort By">
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={filterInputStyle}>
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rating</option>
              <option value="priceLow">Price Low to High</option>
              <option value="priceHigh">Price High to Low</option>
            </select>
          </FilterBox>

          <FilterBox title="Price Range">
            <input
              type="range"
              min="0"
              max="50000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#D4AF37" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(248, 246, 240, 0.78)" }}>
              <span>Rs. 0</span>
              <span>Rs. {price}</span>
            </div>
          </FilterBox>

          <FilterBox title="Star Rating">
            {[5, 4, 3, 2, 1].map((star) => (
              <label key={star} style={checkStyle}>
                <input
                  type="checkbox"
                  checked={rating === String(star)}
                  onChange={() => setRating(rating === String(star) ? "" : String(star))}
                />
                {star} Stars {"*".repeat(star)}
              </label>
            ))}
          </FilterBox>

          <FilterBox title="Distance from Center">
            <input
              type="range"
              min="1"
              max="20"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#D4AF37" }}
            />
            <p style={{ textAlign: "center", color: "rgba(248, 246, 240, 0.78)" }}>Within {distance} km</p>
          </FilterBox>

          <FilterBox title="Property Type">
            {["Hotel", "Resort", "Villa", "Apartment", "Guest House"].map((item) => (
              <label key={item} style={checkStyle}>
                <input
                  type="checkbox"
                  checked={propertyType === item}
                  onChange={() => setPropertyType(propertyType === item ? "" : item)}
                />
                {item}
              </label>
            ))}
          </FilterBox>

          <FilterBox title="Amenities">
            {["Wi-Fi", "Swimming Pool", "Gym", "Parking", "Restaurant", "Bar", "Spa", "Room Service"].map((item) => (
              <label key={item} style={checkStyle}>
                <input
                  type="checkbox"
                  checked={amenity === item}
                  onChange={() => setAmenity(amenity === item ? "" : item)}
                />
                {item}
              </label>
            ))}
          </FilterBox>
        </aside>

        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "22px",
            }}
          >
            <p style={{ color: "rgba(248, 246, 240, 0.78)" }}>
              {filteredHotels.length} properties found
            </p>

            <button
              onClick={() => setShowMap(!showMap)}
              style={{
                background: "rgba(248, 246, 240, 0.1)",
                border: "1px solid rgba(212, 175, 55, 0.38)",
                color: "#F8F6F0",
                padding: "12px 18px",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {showMap ? "Hide Map" : "Map View"}
            </button>
          </div>

          {showMap && (
            <div
              style={{
                height: "300px",
                overflow: "hidden",
                marginBottom: "18px",
                border: "1px solid rgba(248, 246, 240, 0.14)",
                borderRadius: "18px",
                background: "rgba(248, 246, 240, 0.08)",
                boxShadow: "0 18px 48px rgba(0, 0, 0, 0.22)",
              }}
            >
              <iframe
                title="Hotel map view"
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                loading="lazy"
              />
            </div>
          )}

          {filteredHotels.length === 0 ? (
            <div
              style={{
                height: "360px",
                background: "rgba(248, 246, 240, 0.08)",
                borderRadius: "16px",
                border: "1px solid rgba(248, 246, 240, 0.14)",
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                backdropFilter: "blur(18px)",
              }}
            >
              <div>
                <div style={{ fontSize: "70px", color: "#D4AF37" }}>Search</div>
                <h2>No results found.</h2>
                <p style={{ color: "rgba(248, 246, 240, 0.68)" }}>
                  Try another hotel location.
                </p>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "18px" }}>
              {filteredHotels.map((hotel) => (
                <article
                  key={hotel.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "196px 1fr 150px",
                    gap: "14px",
                    background: "rgba(248, 246, 240, 0.08)",
                    border: "1px solid rgba(248, 246, 240, 0.14)",
                    borderRadius: "18px",
                    padding: "12px",
                    boxShadow: "0 18px 48px rgba(0, 0, 0, 0.28)",
                    backdropFilter: "blur(18px)",
                  }}
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    style={{
                      width: "100%",
                      height: "142px",
                      objectFit: "cover",
                      borderRadius: "14px",
                    }}
                  />

                  <div>
                    <h2 style={{ margin: "0 0 3px", fontSize: "20px" }}>{hotel.name}</h2>
                    <p style={{ margin: "0 0 3px", color: "rgba(248, 246, 240, 0.72)" }}>{hotel.location}</p>
                    <p style={{ margin: "0 0 3px", color: "#D4AF37", fontWeight: "800" }}>
                      {"*".repeat(hotel.rating)} {hotel.rating} Star
                    </p>
                    <p style={{ margin: "0 0 3px" }}>{hotel.type}</p>
                    <p style={{ margin: "0 0 3px", color: "rgba(248, 246, 240, 0.68)" }}>
                      {hotel.amenities.join(" - ")}
                    </p>
                    <p style={{ margin: 0, color: "rgba(248, 246, 240, 0.68)" }}>
                      {hotel.distance} km from center
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <div style={{ textAlign: "right" }}>
                      <h2 style={{ color: "#D4AF37", margin: "0 0 3px", fontSize: "20px" }}>
                        Rs. {hotel.price}
                      </h2>
                      <p style={{ margin: 0, color: "rgba(248, 246, 240, 0.68)" }}>per night</p>
                    </div>
                    <Link href={`/hotels/${hotel.id}`}>
                      <button style={goldButtonStyle}>
                        View Details
                      </button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer
        style={{
          marginTop: "24px",
          padding: "34px 40px",
          background: "rgba(7, 20, 38, 0.92)",
          borderTop: "1px solid rgba(212, 175, 55, 0.22)",
          color: "rgba(248, 246, 240, 0.76)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ margin: 0, color: "#F8F6F0" }}>Veloura Holidays</h2>
            <p style={{ margin: "8px 0 0" }}>Experience India in Luxury</p>
          </div>

          <div style={{ display: "flex", gap: "22px", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </Link>
            <Link href="/hotels" style={{ color: "#D4AF37", textDecoration: "none" }}>
              Hotels
            </Link>
            <Link href="/my-bookings" style={{ color: "inherit", textDecoration: "none" }}>
              My Bookings
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FilterBox({ title, children }) {
  return (
    <div
      style={{
        background: "rgba(248, 246, 240, 0.08)",
        border: "1px solid rgba(248, 246, 240, 0.14)",
        borderRadius: "14px",
        padding: "22px 24px",
        color: "#F8F6F0",
        boxShadow: "0 18px 44px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(18px)",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "18px", color: "#D4AF37" }}>{title}</h3>
      {children}
    </div>
  );
}

const topLabelStyle = {
  fontWeight: "700",
  fontSize: "13px",
  color: "#D4AF37",
};

const topInputStyle = {
  width: "100%",
  marginTop: "8px",
  height: "54px",
  border: "1px solid rgba(212, 175, 55, 0.3)",
  borderRadius: "9px",
  padding: "0 16px",
  fontSize: "15px",
  color: "#F8F6F0",
  background: "rgba(17, 24, 39, 0.72)",
  outline: "none",
};

const filterInputStyle = {
  width: "100%",
  height: "44px",
  border: "1px solid rgba(212, 175, 55, 0.3)",
  borderRadius: "8px",
  padding: "0 12px",
  color: "#F8F6F0",
  background: "rgba(17, 24, 39, 0.72)",
  outline: "none",
};

const checkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "12px",
  fontWeight: "500",
  color: "rgba(248, 246, 240, 0.82)",
};

const goldButtonStyle = {
  background: "#D4AF37",
  color: "#111827",
  border: "1px solid #D4AF37",
  padding: "10px 16px",
  borderRadius: "10px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow: "0 14px 30px rgba(212, 175, 55, 0.2)",
};
