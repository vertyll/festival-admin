import Layout from "@/components/templates/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonDanger from "@/components/atoms/ButtonDanger";
import Spinner from "@/components/atoms/Spinner";

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchArtists() {
    axios.get("/api/artists").then((response) => {
      setArtists(response.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetchArtists();
  }, []);

  function deleteArtist(artist) {
    Swal.fire({
      title: "Uwaga",
      text: `Czy na pewno chcesz usunąć ${artist.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Nie",
      confirmButtonText: "Tak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = artist;
        await axios.delete("/api/artists?_id=" + _id);
        fetchArtists();
        Swal.fire("Usunięto!", `Artysta ${artist.name} został usunięty`, "success");
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
                <ButtonDanger onClick={() => deleteArtist(artist)}>Usuń</ButtonDanger>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default ArtistsPage;
