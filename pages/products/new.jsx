import Layout from "@/components/templates/Layout";
import ProductForm from "@/components/organisms/form/ProductForm";

export default function NewProductPage() {
  return (
    <Layout>
      <h1>Nowy produkt</h1>
      <ProductForm />
    </Layout>
  );
}
