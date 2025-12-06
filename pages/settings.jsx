import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Layout from "@/components/templates/Layout";
import Spinner from "@/components/atoms/Spinner";
import FieldInput from "@/components/molecules/FieldInput";
import { validateFormValues } from "@/utils/validation/validation";

function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [shippingPrice, setShippingPrice] = useState("");
  const [availabilityVisible, setAvailabilityVisible] = useState(false);
  const [additionalAvailabilityVisible, setAdditionalAvailabilityVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  async function fetchAll() {
    try {
      const shippingResponse = await axios.get("/api/settings?name=shippingPrice");
      const availabilityResponse = await axios.get("/api/settings?name=availabilityVisible");
      const additionalAvailabilityResponse = await axios.get("/api/settings?name=additionalAvailabilityVisible");

      if (shippingResponse.data) {
        setShippingPrice(shippingResponse.data.value);
      }
      if (availabilityResponse.data) {
        setAvailabilityVisible(availabilityResponse.data.value); // Assuming value is a boolean
      }
      if (additionalAvailabilityResponse.data) {
        setAdditionalAvailabilityVisible(additionalAvailabilityResponse.data.value); // Assuming value is a boolean
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  async function saveSettings() {
    const errors = validateFormValues({ shippingPrice }, ["shippingPrice"]);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.put("/api/settings", {
        name: "shippingPrice",
        value: shippingPrice,
      });
      await axios.put("/api/settings", {
        name: "availabilityVisible",
        value: availabilityVisible,
      });
      await axios.put("/api/settings", {
        name: "additionalAvailabilityVisible",
        value: additionalAvailabilityVisible,
      });
    } catch (error) {
      console.error("Error saving settings:", error);
    }
    setIsLoading(false);

    await Swal.fire({
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
            <div className="error-message">{validationErrors["shippingPrice"]}</div>
          )}
          <div className="w-max">
            <FieldInput
              labelText={<span>Widoczność ogólnych stanów magazynowych:</span>}
              type="checkbox"
              checked={availabilityVisible}
              value={availabilityVisible}
              onChange={(e) => setAvailabilityVisible(e.target.checked)}
            />
            <FieldInput
              labelText={<span>Widoczność stanów magazynowych kombinacji:</span>}
              type="checkbox"
              checked={additionalAvailabilityVisible}
              value={additionalAvailabilityVisible}
              onChange={(e) => setAdditionalAvailabilityVisible(e.target.checked)}
            />
          </div>
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

export default SettingsPage;
