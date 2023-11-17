import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/templates/Layout";
import { normalDate } from "@/lib/date";
import Spinner from "@/components/atoms/Spinner";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <Layout>
      <h1>Zamówienia</h1>
      <div className="overflow-x-auto">
        <table className="primary-table min-w-full mt-5">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">Opłacono</th>
              <th className="px-4 py-2">Dane</th>
              <th className="px-4 py-2">Produkty</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  <Spinner />
                </td>
              </tr>
            )}
            {orders.length > 0 &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2">{normalDate(order.createdAt)}</td>
                  <td
                    className={`px-4 py-2 ${
                      order.paid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order.paid ? "Tak" : "Nie"}
                  </td>
                  <td className="px-4 py-2">
                    <b>Imie:</b> {order.name} <br />
                    <b>Email:</b> {order.email} <br />
                    <b>Adres:</b> {order.streetAddress} <br />
                    <b>Miasto:</b> {order.city} <br />
                    <b>Kod pocztowy:</b> {order.postalCode} <br />
                    <b>Kraj:</b> {order.country}
                  </td>
                  <td className="px-4 py-2">
                    {order.line_items.map((l) => (
                      <div key={l.id}>
                        <b>Produkt:</b> {l.price_data?.product_data.name} x{" "}
                        {l.quantity} <br />
                        <b>Opis produktu:</b>{" "}
                        {l.price_data?.product_data.description} <br />
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
