/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/templates/Layout";
import ProductForm from "@/components/organisms/product/ProductForm";

export default function EditProductPage() {
  const [productData, setProductData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductData(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edytuj produkt {productData?.name}</h1>
      {productData && <ProductForm {...productData} />}
    </Layout>
  );
}
