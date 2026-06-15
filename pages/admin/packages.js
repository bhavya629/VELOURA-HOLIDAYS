import AdminCatalogPage from "../../components/AdminCatalogPage";

const fields = [
  { name: "slug", label: "Slug", required: true },
  { name: "name", label: "Package Name", required: true },
  { name: "duration", label: "Duration", required: true },
  { name: "price", label: "Price", type: "number", required: true },
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

export default function AdminPackages() {
  return (
    <AdminCatalogPage
      title="Packages"
      subtitle="Insert, edit, and delete Veloura holiday packages."
      type="packages"
      fields={fields}
      emptyItem={{
        slug: "",
        name: "",
        duration: "",
        price: "",
        image: "/images/packages/goa-luxury-package.jpg",
        status: "Active",
        description: "",
      }}
    />
  );
}
