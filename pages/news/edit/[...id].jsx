/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/templates/Layout";
import Spinner from "@/components/atoms/Spinner";
import NewsForm from "@/components/organisms/NewsForm";

export default function EditNewsPage() {
  const [newsData, setNewsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get("/api/news?id=" + id).then((response) => {
      setNewsData(response.data);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edytuj newsa {newsData?.name}</h1>
      {isLoading && <Spinner />}
      {newsData && <NewsForm {...newsData} />}
    </Layout>
  );
}
