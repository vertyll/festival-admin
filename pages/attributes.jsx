import Layout from "@/components/templates/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonPrimary from "@/components/atoms/ButtonPrimary";
import ButtonDanger from "@/components/atoms/ButtonDanger";
import { withSwal } from "react-sweetalert2";
import Label from "@/components/atoms/Label";
import FieldInput from "@/components/molecules/FieldInput";
import Spinner from "@/components/atoms/Spinner";
import { validateFormValues } from "@/utils/validation/validation";

function AttributesPage({ swal }) {
  const [name, setName] = useState("");
  const [attributeValue, setAttributeValue] = useState("");
  const [attributeValues, setAttributeValues] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [editedAttribute, setEditedAttribute] = useState(null);
  const [editingAttributeValueIndex, setEditingAttributeValueIndex] =
    useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchAttributes();
  }, []);

  function fetchAttributes() {
    setIsLoading(true);
    axios.get("/api/attributes").then((response) => {
      setAttributes(response.data);
      setIsLoading(false);
    });
  }

  async function saveAttribute(e) {
    e.preventDefault();

    const errors = validateFormValues({ name }, ["name"]);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const data = { name, values: attributeValues };

    if (editedAttribute) {
      data._id = editedAttribute._id;
      await axios.put("/api/attributes", data);
    } else {
      await axios.post("/api/attributes", data);
    }
    resetForm();
    fetchAttributes();
  }

  function resetForm() {
    setName("");
    setAttributeValue("");
    setAttributeValues([]);
    setEditedAttribute(null);
    setEditingAttributeValueIndex(null);
  }

  function editAttribute(attribute) {
    setName(attribute.name);
    setEditedAttribute(attribute);
    setAttributeValues(attribute.values || []);
    setEditingAttributeValueIndex(null);
  }

  function deleteAttribute(attribute) {
    swal
      .fire({
        title: "Uwaga",
        text: `Czy na pewno chcesz usunąć ${attribute.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Nie",
        confirmButtonText: "Tak",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/api/attributes?_id=${attribute._id}`);
          fetchAttributes();
          swal.fire(
            "Usunięto!",
            `Atrybut ${attribute.name} został usunięty.`,
            "success"
          );
        }
      });
  }

  function addOrUpdateAttributeValue() {
    const errors = validateFormValues({ attributeValue }, ["attributeValue"]);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const updatedValues = [...attributeValues];
    if (editingAttributeValueIndex !== null) {
      updatedValues[editingAttributeValueIndex] = attributeValue;
    } else {
      updatedValues.push(attributeValue);
    }
    setAttributeValues(updatedValues);
    setAttributeValue("");
    setEditingAttributeValueIndex(null);
  }

  function editAttributeValue(index) {
    setAttributeValue(attributeValues[index]);
    setEditingAttributeValueIndex(index);
  }

  function deleteAttributeValue(index) {
    setAttributeValues(attributeValues.filter((_, i) => i !== index));
  }

  return (
    <Layout>
      <h1>Atrybuty</h1>
      <form onSubmit={saveAttribute}>
        <Label>
          {editedAttribute
            ? `Edytuj atrybut ${editedAttribute.name}`
            : "Utwórz atrybut"}
        </Label>
        <FieldInput
          labelText={<span>Nazwa</span>}
          type="text"
          placeholder="Nazwa atrybutu"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        {validationErrors["name"] && (
          <div className="error-message">{validationErrors["name"]}</div>
        )}
        <FieldInput
          labelText={<span>Wartość atrybutu</span>}
          type="text"
          placeholder="Wprowadź wartość atrybutu"
          onChange={(e) => setAttributeValue(e.target.value)}
          value={attributeValue}
        />
        {validationErrors["attributeValue"] && (
          <div className="error-message">
            {validationErrors["attributeValue"]}
          </div>
        )}
        <ButtonPrimary onClick={addOrUpdateAttributeValue} type="button">
          {editingAttributeValueIndex !== null
            ? "Aktualizuj wartość"
            : "Dodaj wartość"}
        </ButtonPrimary>

        {attributeValues.length > 0 && (
          <table className="primary-table mt-3">
            <thead>
              <tr>
                <th>Wartość</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {attributeValues.map((value, index) => (
                <tr key={index}>
                  <td>{value}</td>
                  <td>
                    <ButtonPrimary
                      onClick={() => editAttributeValue(index)}
                      className="mr-2"
                      type="button"
                    >
                      Edytuj
                    </ButtonPrimary>
                    <ButtonDanger
                      onClick={() => deleteAttributeValue(index)}
                      type="button"
                    >
                      Usuń
                    </ButtonDanger>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex gap-1 mt-3">
          <ButtonDanger onClick={resetForm} type="button">
            Anuluj
          </ButtonDanger>
          <ButtonPrimary type="submit">Zapisz</ButtonPrimary>
        </div>
      </form>

      {isLoading ? (
        <Spinner />
      ) : (
        <table className="primary-table mt-5">
          <thead>
            <tr>
              <th>Nazwa atrybutu</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attribute) => (
              <tr key={attribute._id}>
                <td>{attribute.name}</td>
                <td>
                  <ButtonPrimary
                    onClick={() => editAttribute(attribute)}
                    className="mr-2"
                  >
                    Edytuj
                  </ButtonPrimary>
                  <ButtonDanger onClick={() => deleteAttribute(attribute)}>
                    Usuń
                  </ButtonDanger>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <AttributesPage swal={swal} />);
