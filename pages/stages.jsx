import Layout from "@/components/templates/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonPrimary from "@/components/atoms/ButtonPrimary";
import ButtonDanger from "@/components/atoms/ButtonDanger";
import Swal from "sweetalert2";
import Label from "@/components/atoms/Label";
import FieldInput from "@/components/molecules/FieldInput";
import Spinner from "@/components/atoms/Spinner";
import { validateFormValues } from "@/utils/validation/validation";

function StagesPage() {
  const [name, setName] = useState("");
  const [stages, setStages] = useState([]);
  const [editedStage, setEditedStage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

  function fetchStages() {
    axios.get("/api/stages").then((response) => {
      setStages(response.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetchStages();
  }, []);

  async function saveStage(e) {
    e.preventDefault();

    const errors = validateFormValues({ name }, ["name"]);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("Błędy walidacji:", errors);
      return;
    }

    const data = { name };
    if (editedStage) {
      data._id = editedStage._id;
      await axios.put("/api/stages", data);
      setEditedStage(null);
      fetchStages();
    } else {
      await axios.post("/api/stages", data);
    }
    setName("");
    fetchStages();
  }

  function editStage(stage) {
    setEditedStage(stage);
    setName(stage.name);
  }

  function deleteStage(stage) {
    Swal.fire({
      title: "Uwaga",
      text: `Czy na pewno chcesz usunąć ${stage.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Nie",
      confirmButtonText: "Tak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = stage;
        await axios.delete("/api/stages?_id=" + _id);
        fetchStages();
        Swal.fire("Usunięto!", `Scena ${stage.name} została usunięta`, "success");
      }
    });
  }

  return (
    <Layout>
      <h1>Sceny</h1>
      <form onSubmit={saveStage}>
        <Label>{editedStage ? `Edytuj scenę: ${editedStage.name}` : "Utwórz scenę"}</Label>
        <div>
          <FieldInput
            labelText={<span>Nazwa</span>}
            type="text"
            placeholder={"Nazwa sceny"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {validationErrors["name"] && <div className="error-message">{validationErrors["name"]}</div>}
        </div>
        <div className="flex gap-1">
          {editedStage && (
            <ButtonDanger
              onClick={() => {
                setEditedStage(null);
                setName("");
              }}
            >
              Anuluj
            </ButtonDanger>
          )}
          <ButtonPrimary>Zapisz</ButtonPrimary>
        </div>
      </form>
      {!editedStage && (
        <table className="primary-table mt-5">
          <thead>
            <tr>
              <th>Nazwa sceny</th>
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
            {stages.length > 0 &&
              stages.map((stage) => (
                <tr key={stage._id}>
                  <td>{stage.name}</td>
                  <td>
                    <ButtonPrimary onClick={() => editStage(stage)} className="mr-2">
                      Edytuj
                    </ButtonPrimary>
                    <ButtonDanger onClick={() => deleteStage(stage)}>Usuń</ButtonDanger>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default StagesPage;
