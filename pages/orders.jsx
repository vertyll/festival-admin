import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/templates/Layout";
import { normalDate } from "@/lib/date";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <Layout>
      <table className="primary-table mt-5">
        <thead>
          <tr>
            <th>Data</th>
            <th>Status (opłacono)</th>
            <th>Dane</th>
            <th>Produkty</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{normalDate(order.createdAt)}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "Tak" : "Nie"}
                </td>
                <td>
                  <b>Imie:</b> {order.name} <b>Email:</b> {order.email}
                  <br />
                  <b>Adres:</b> {order.streetAddress} <b>Miasto:</b>{" "}
                  {order.city} <br />
                  <b>Kod pocztowy:</b> {order.postalCode} <b>Kraj:</b>{" "}
                  {order.country}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      <b>Produkt:</b> {l.price_data?.product_data.name} x{l.quantity}
                      <br />
                      <b>Opis produktu:</b> {l.price_data?.product_data.description}
                      <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
