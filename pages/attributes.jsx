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
  const [attributes, setAttributes] = useState([]);
  const [editedAttribute, setEditedAttribute] = useState(null);
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
      console.log("Błędy walidacji:", errors);
      return;
    }

    const data = { name };
    if (editedAttribute) {
      data._id = editedAttribute._id;
      await axios.put("/api/attributes", data);
      setEditedAttribute(null);
      fetchAttributes();
    } else {
      await axios.post("/api/attributes", data);
    }
    setName("");
    fetchAttributes();
  }

  function editAttribute(attribute) {
    setEditedAttribute(attribute);
    setName(attribute.name);
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
          const { _id } = attribute;
          await axios.delete("/api/attributes?_id=" + _id);
          fetchAttributes();
          swal.fire(
            "Usunięto!",
            `Atrybut ${attribute.name} został usunięty`,
            "success"
          );
        }
      });
  }

  return (
    <Layout>
      <h1>Atrybuty</h1>
      <form onSubmit={saveAttribute}>
        <Label>
          {editedAttribute ? `Edytuj atrybut ${editedAttribute.name}` : "Utwórz atrybut"}
        </Label>
        <div>
          <FieldInput
            labelText={<span>Nazwa</span>}
            type="text"
            placeholder={"Nazwa atrybutu"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {validationErrors["name"] && (
            <div className="error-message">{validationErrors["name"]}</div>
          )}
        </div>
        <div className="flex gap-1">
          {editedAttribute && (
            <ButtonDanger
              onClick={() => {
                setEditedAttribute(null);
                setName("");
              }}
            >
              Anuluj
            </ButtonDanger>
          )}
          <ButtonPrimary>Zapisz</ButtonPrimary>
        </div>
      </form>
      {!editedAttribute && (
        <table className="primary-table mt-5">
          <thead>
            <tr>
              <th>Nazwa atrybutu</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={3}>
                  <Spinner />
                </td>
              </tr>
            )}
            {attributes.length > 0 &&
              attributes.map((attribute) => (
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
