/* eslint-disable react/jsx-key */
import Layout from "@/components/templates/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

function ProductsPage({ swal }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
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
            `Kategoria ${product.name} została usunięta`,
            "success"
          );
        }
      });
  }

  return (
    <Layout>
      <div className="my-3">
        <Link
          className="bg-green-600 rounded-lg text-white py-2 px-6"
          href={"/products/new"}
        >
          Dodaj nowy produkt
        </Link>
      </div>
      <table className="primary-table mt-5">
        <thead>
          <tr>
            <td>Nazwa produktu</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                <Link href={"/products/edit/" + product._id}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Edytuj
                </Link>
                <button onClick={() => deleteProduct(product)}>usun</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <ProductsPage swal={swal} />);
