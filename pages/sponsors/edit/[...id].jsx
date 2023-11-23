/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/templates/Layout";
import Spinner from "@/components/atoms/Spinner";
import SponsorForm from "@/components/organisms/SponsorForm";

export default function EditSponsorPage() {
  const [sponsorData, setSponsorData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get("/api/sponsors?id=" + id).then((response) => {
      setSponsorData(response.data);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edytuj sponsora: {sponsorData?.name}</h1>
      {isLoading && <Spinner />}
      {sponsorData && <SponsorForm {...sponsorData} />}
    </Layout>
  );
}
