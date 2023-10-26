/* eslint-disable react/jsx-key */
import Layout from "@/components/templates/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import ButtonDanger from "@/components/atoms/ButtonDanger";
import Spinner from "@/components/atoms/Spinner";

function ProductsPage({ swal }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    setIsLoading(true);
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }

  function deleteProduct(product) {
    swal
      .fire({
        title: "Uwaga",
        text: `Czy na pewno chcesz usunąć ${product.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Nie",
        confirmButtonText: "Tak",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = product;
          await axios.delete("/api/products?_id=" + _id);
          fetchProducts();
          swal.fire(
            "Usunięto!",
            `Produkt ${product.name} został usunięty`,
            "success"
          );
        }
      });
  }

  return (
    <Layout>
      <h1>Produkty</h1>
      <div className="my-3">
        <Link className="btn-primary" href={"/products/new"}>
          Dodaj nowy produkt
        </Link>
      </div>
      <table className="primary-table mt-5">
        <thead>
          <tr>
            <th>Nazwa produktu</th>
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
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                <Link href={"/products/edit/" + product._id}>Edytuj</Link>
                <ButtonDanger onClick={() => deleteProduct(product)}>
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

export default withSwal(({ swal }, ref) => <ProductsPage swal={swal} />);
