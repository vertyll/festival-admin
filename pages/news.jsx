/* eslint-disable react/jsx-key */
import Layout from "@/components/templates/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import ButtonDanger from "@/components/atoms/ButtonDanger";
import Spinner from "@/components/atoms/Spinner";

function NewsPage({ swal }) {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  function fetchNews() {
    setIsLoading(true);
    axios.get("/api/news").then((response) => {
      setNews(response.data);
      setIsLoading(false);
    });
  }

  function deleteNews(news) {
    swal
      .fire({
        title: "Uwaga",
        text: `Czy na pewno chcesz usunąć ${news.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Nie",
        confirmButtonText: "Tak",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = news;
          await axios.delete("/api/news?_id=" + _id);
          fetchNews();
          swal.fire(
            "Usunięto!",
            `News ${news.name} został usunięty`,
            "success"
          );
        }
      });
  }

  return (
    <Layout>
      <h1>Newsy</h1>
      <div className="my-3">
        <Link className="btn-primary" href={"/news/new"}>
          Dodaj nowy news
        </Link>
      </div>
      <table className="primary-table mt-5">
        <thead>
          <tr>
            <th>Nazwa newsa</th>
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
          {news.map((news) => (
            <tr key={news._id}>
              <td>{news.name}</td>
              <td>
                <Link href={"/news/edit/" + news._id}>Edytuj</Link>
                <ButtonDanger onClick={() => deleteNews(news)}>
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

export default withSwal(({ swal }) => <NewsPage swal={swal} />);
