import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/templates/Layout";
import Spinner from "@/components/atoms/Spinner";
import SponsorForm from "@/components/organisms/SponsorForm";

export default function EditSponsorPage() {
  const [sponsorData, setSponsorData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(!!id);

  useEffect(() => {
    if (!id) {
      return;
    }
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
