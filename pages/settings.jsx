import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/templates/Layout";
import Spinner from "@/components/atoms/Spinner";
import FieldInput from "@/components/molecules/FieldInput";
import { validateFormValues } from "@/utils/validation/validation";

function SettingsPage({ swal }) {
  const [isLoading, setIsLoading] = useState(false);
  const [shippingPrice, setShippingPrice] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

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
    const errors = validateFormValues({ shippingPrice }, ["shippingPrice"]);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

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
          {validationErrors["shippingPrice"] && (
            <div className="error-message">
              {validationErrors["shippingPrice"]}
            </div>
          )}
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
