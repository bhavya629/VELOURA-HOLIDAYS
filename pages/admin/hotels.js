import AdminCatalogPage from "../../components/AdminCatalogPage";

const fields = [
  { name: "slug", label: "Slug", required: true },
  { name: "name", label: "Hotel Name", required: true },
  { name: "location", label: "Location", required: true },
  { name: "type", label: "Hotel Type", required: true },
  { name: "rating", label: "Rating", type: "number", required: true },
  { name: "price", label: "Price / Night", type: "number", required: true },
  { name: "image", label: "Image Path", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["Active", "Draft", "Hidden"],
    required: true,
  },
  { name: "description", label: "Description", type: "textarea", required: true },
];

export default function AdminHotels() {
  return (
    <AdminCatalogPage
      title="Hotels"
      subtitle="Manage luxury hotel inventory, pricing, and display status."
      type="hotels"
      fields={fields}
      emptyItem={{
        slug: "",
        name: "",
        location: "",
        type: "Hotel",
        rating: 5,
        price: "",
        image: "/images/hotel/goa-luxury-beach-resort.jpg",
        status: "Active",
        description: "",
      }}
    />
  );
}
