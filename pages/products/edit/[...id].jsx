/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/templates/Layout";
import ProductForm from "@/components/organisms/ProductForm";
import Spinner from "@/components/atoms/Spinner";

export default function EditProductPage() {
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get("/api/products?id=" + id).then((response) => {
      setProductData(response.data);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edytuj produkt {productData?.name}</h1>
      {isLoading && <Spinner />}
      {productData && <ProductForm {...productData} />}
    </Layout>
  );
}
