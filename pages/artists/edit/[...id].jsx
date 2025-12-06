import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/templates/Layout";
import Spinner from "@/components/atoms/Spinner";
import ArtistForm from "@/components/organisms/ArtistForm";

export default function EditArtistPage() {
  const [artistData, setArtistData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(!!id);

  useEffect(() => {
    if (!id) {
      return;
    }
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
