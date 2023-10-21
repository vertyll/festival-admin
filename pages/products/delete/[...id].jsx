import Layout from "@/components/templates/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonDanger from "@/components/atoms/ButtonDanger";
import ButtonPrimary from "@/components/atoms/ButtonPrimary";

export default function DeleteProductPage() {
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

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Czy na pewno chcesz usunąć &nbsp;{productData?.name} ?
      </h1>
      <div className="flex gap-2 justify-center">
        <ButtonDanger onClick={deleteProduct}>Tak</ButtonDanger>
        <ButtonPrimary onClick={goBack}>Nie</ButtonPrimary>
      </div>
    </Layout>
  );
}
