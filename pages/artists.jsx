/* eslint-disable react/jsx-key */
import Layout from "@/components/templates/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import ButtonDanger from "@/components/atoms/ButtonDanger";
import Spinner from "@/components/atoms/Spinner";

function ArtistsPage({ swal }) {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchArtists();
  }, []);

  function fetchArtists() {
    setIsLoading(true);
    axios.get("/api/artists").then((response) => {
      setArtists(response.data);
      setIsLoading(false);
    });
  }

  function deleteArtist(artist) {
    swal
      .fire({
        title: "Uwaga",
        text: `Czy na pewno chcesz usunąć ${artist.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Nie",
        confirmButtonText: "Tak",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = artist;
          await axios.delete("/api/artists?_id=" + _id);
          fetchArtists();
          swal.fire(
            "Usunięto!",
            `Artysta ${artist.name} został usunięty`,
            "success"
          );
        }
      });
  }

  return (
    <Layout>
      <h1>Artyści</h1>
      <div className="my-3">
        <Link className="btn-primary" href={"/artists/new"}>
          Dodaj nowego artystę
        </Link>
      </div>
      <table className="primary-table mt-5">
        <thead>
          <tr>
            <th>Nazwa artysty</th>
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
          {artists.map((artist) => (
            <tr key={artist._id}>
              <td>{artist.name}</td>
              <td>
                <Link href={"/artists/edit/" + artist._id}>Edytuj</Link>
                <ButtonDanger onClick={() => deleteArtist(artist)}>
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

export default withSwal(({ swal }) => <ArtistsPage swal={swal} />);
