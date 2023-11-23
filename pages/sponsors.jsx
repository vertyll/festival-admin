/* eslint-disable react/jsx-key */
import Layout from "@/components/templates/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import ButtonDanger from "@/components/atoms/ButtonDanger";
import Spinner from "@/components/atoms/Spinner";

function SponsorsPage({ swal }) {
  const [sponsors, setSponsors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSponsors();
  }, []);

  function fetchSponsors() {
    setIsLoading(true);
    axios.get("/api/sponsors").then((response) => {
      setSponsors(response.data);
      setIsLoading(false);
    });
  }

  function deleteSponsor(sponsor) {
    swal
      .fire({
        title: "Uwaga",
        text: `Czy na pewno chcesz usunąć ${sponsor.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Nie",
        confirmButtonText: "Tak",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = sponsor;
          await axios.delete("/api/sponsors?_id=" + _id);
          fetchSponsors();
          swal.fire(
            "Usunięto!",
            `Sponsor ${sponsor.name} został usunięty`,
            "success"
          );
        }
      });
  }

  return (
    <Layout>
      <h1>Sponsorzy</h1>
      <div className="my-3">
        <Link className="btn-primary" href={"/sponsors/new"}>
          Dodaj nowego sponsora
        </Link>
      </div>
      <table className="primary-table mt-5">
        <thead>
          <tr>
            <th>Nazwa sponsora</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <Spinner />
              </td>
            </tr>
          )}
          {sponsors.map((sponsor) => (
            <tr key={sponsor._id}>
              <td>{sponsor.name}</td>
              <td>
                <Link href={"/sponsors/edit/" + sponsor._id}>Edytuj</Link>
                <ButtonDanger onClick={() => deleteSponsor(sponsor)}>
                  Usuń
                </ButtonDanger>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }) => <SponsorsPage swal={swal} />);
