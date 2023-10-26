import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/templates/Layout";
import Spinner from "@/components/atoms/Spinner";
import FieldInput from "@/components/molecules/FieldInput";

function SettingsPage({ swal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [shippingPrice, setShippingPrice] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchAll().then(() => {
      setIsLoading(false);
    });
  }, []);

  async function fetchAll() {
    await axios.get("/api/settings?name=shippingPrice").then((response) => {
      setShippingPrice(response.data?.value);
    });
  }

  async function saveSettings() {
    setIsLoading(true);
    await axios.put("/api/settings", {
      name: "shippingPrice",
      value: shippingPrice,
    });
    setIsLoading(false);
    await swal.fire({
      title: "Ustawienia zapisane",
      icon: "success",
    });
  }

  return (
    <Layout>
      <h1>Ustawienia</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <FieldInput
            labelText={<span>Cena dostawy:</span>}
            type="number"
            value={shippingPrice}
            onChange={(e) => setShippingPrice(e.target.value)}
          />
          <div>
            <button onClick={saveSettings} className="btn-primary">
              Zapisz
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }) => <SettingsPage swal={swal} />);
