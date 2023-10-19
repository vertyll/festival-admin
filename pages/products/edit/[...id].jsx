/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function EditProduct() {
  const [productData, setProductData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return;
  }

  useEffect(() => {
    axios.get("/api/products?id=" + id).then((response) => {
      setProductData(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edytuj produkt</h1>
      {productData && (
        <ProductForm {...productData} />
      )}
    </Layout>
  );
}
