/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/templates/Layout";
import Spinner from "@/components/atoms/Spinner";
import ArtistForm from "@/components/organisms/ArtistForm";

export default function EditArtistPage() {
  const [artistData, setArtistData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get("/api/artists?id=" + id).then((response) => {
      setArtistData(response.data);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edytuj artystę: {artistData?.name}</h1>
      {isLoading && <Spinner />}
      {artistData && <ArtistForm {...artistData} />}
    </Layout>
  );
}
