import { useEffect, useState } from "react";
import axios from "axios";
import { subHours } from "date-fns";
import Spinner from "@/components/atoms/Spinner";
import Layout from "@/components/templates/Layout";

export default function HomeStats() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
      setIsLoading(false);
    });
  }, []);

  function ordersTotal(orders) {
    let sum = 0;
    orders.forEach((order) => {
      const { line_items } = order;
      line_items.forEach((li) => {
        const lineSum = (li.quantity * li.price_data.unit_amount) / 100;
        sum += lineSum;
      });
    });
    // console.log({ orders });
    return new Intl.NumberFormat("pl-PL").format(sum);
  }

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  const ordersToday = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24)
  );
  const ordersWeek = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 7)
  );
  const ordersMonth = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 30)
  );

  return (
    <Layout>
      <h1>Panel</h1>
      <div className="my-2 mx-10">
        <h2 className="title-title">Zamówienia</h2>
        <div className="tiles-grid">
          <div className="tile">
            <h3 className="tile-header">Dzisiaj</h3>
            <div className="tile-number">{ordersToday.length}</div>
            <div className="tile-desc">
              {ordersToday.length} zamówień dzisiaj
            </div>
          </div>
          <div className="tile">
            <h3 className="tile-header">Ten tydzień</h3>
            <div className="tile-number">{ordersWeek.length}</div>
            <div className="tile-desc">{ordersWeek.length} w tym tygodniu</div>
          </div>
          <div className="tile">
            <h3 className="tile-header">Ten miesiąc</h3>
            <div className="tile-number">{ordersMonth.length}</div>
            <div className="tile-desc">{ordersMonth.length} w tym miesiącu</div>
          </div>
        </div>
        <h2 className="title-title">Przychody</h2>
        <div className="tiles-grid">
          <div className="tile">
            <h3 className="tile-header">Dzisiaj</h3>
            <div className="tile-number">zł {ordersTotal(ordersToday)}</div>
            <div className="tile-desc">
              {ordersToday.length} zamówień dzisiaj
            </div>
          </div>
          <div className="tile">
            <h3 className="tile-header">Ten tydzień</h3>
            <div className="tile-number">zł {ordersTotal(ordersWeek)}</div>
            <div className="tile-desc">
              {ordersWeek.length} zamówień w tym tygodniu
            </div>
          </div>
          <div className="tile">
            <h3 className="tile-header">Ten miesiąc</h3>
            <div className="tile-number">zł {ordersTotal(ordersMonth)}</div>
            <div className="tile-desc">
              {ordersMonth.length} zamówień w tym miesiącu
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
