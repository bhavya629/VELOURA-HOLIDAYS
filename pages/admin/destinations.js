import AdminCatalogPage from "../../components/AdminCatalogPage";

const fields = [
  { name: "slug", label: "Slug", required: true },
  { name: "name", label: "Destination Name", required: true },
  { name: "region", label: "Region / Landmark", required: true },
  { name: "price", label: "Starting Price", type: "number", required: true },
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

export default function AdminDestinations() {
  return (
    <AdminCatalogPage
      title="Destinations"
      subtitle="Control destination cards and luxury travel information."
      type="destinations"
      fields={fields}
      emptyItem={{
        slug: "",
        name: "",
        region: "",
        price: "",
        image: "/images/destinations/goa-calangute-beach.jpg",
        status: "Active",
        description: "",
      }}
    />
  );
}
