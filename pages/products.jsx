import Layout from "@/components/templates/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ButtonDanger from "@/components/atoms/ButtonDanger";
import Spinner from "@/components/atoms/Spinner";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function fetchProducts() {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function deleteProduct(product) {
    Swal.fire({
      title: "Uwaga",
      text: `Czy na pewno chcesz usunąć ${product.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Nie",
      confirmButtonText: "Tak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = product;
        await axios.delete("/api/products?_id=" + _id);
        fetchProducts();
        Swal.fire("Usunięto!", `Produkt ${product.name} został usunięty`, "success");
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
                <ButtonDanger onClick={() => deleteProduct(product)}>Usuń</ButtonDanger>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default ProductsPage;
