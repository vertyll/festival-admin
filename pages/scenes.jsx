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

function ScenesPage({ swal }) {
  const [name, setName] = useState("");
  const [scenes, setScenes] = useState([]);
  const [editedScene, setEditedScene] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchScenes();
  }, []);

  function fetchScenes() {
    setIsLoading(true);
    axios.get("/api/scenes").then((response) => {
      setScenes(response.data);
      setIsLoading(false);
    });
  }

  async function saveScene(e) {
    e.preventDefault();

    const errors = validateFormValues({ name }, ["name"]);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("Błędy walidacji:", errors);
      return;
    }

    const data = { name };
    if (editedScene) {
      data._id = editedScene._id;
      await axios.put("/api/scenes", data);
      setEditedScene(null);
      fetchScenes();
    } else {
      await axios.post("/api/scenes", data);
    }
    setName("");
    fetchScenes();
  }

  function editScene(scene) {
    setEditedScene(scene);
    setName(scene.name);
  }

  function deleteScene(scene) {
    swal
      .fire({
        title: "Uwaga",
        text: `Czy na pewno chcesz usunąć ${scene.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Nie",
        confirmButtonText: "Tak",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = scene;
          await axios.delete("/api/scenes?_id=" + _id);
          fetchScenes();
          swal.fire(
            "Usunięto!",
            `Scena ${scene.name} została usunięta`,
            "success"
          );
        }
      });
  }

  return (
    <Layout>
      <h1>Sceny</h1>
      <form onSubmit={saveScene}>
        <Label>
          {editedScene ? `Edytuj scenę: ${editedScene.name}` : "Utwórz scenę"}
        </Label>
        <div>
          <FieldInput
            labelText={<span>Nazwa</span>}
            type="text"
            placeholder={"Nazwa sceny"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {validationErrors["name"] && (
            <div className="error-message">{validationErrors["name"]}</div>
          )}
        </div>
        <div className="flex gap-1">
          {editedScene && (
            <ButtonDanger
              onClick={() => {
                setEditedScene(null);
                setName("");
              }}
            >
              Anuluj
            </ButtonDanger>
          )}
          <ButtonPrimary>Zapisz</ButtonPrimary>
        </div>
      </form>
      {!editedScene && (
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
            {scenes.length > 0 &&
              scenes.map((scene) => (
                <tr key={scene._id}>
                  <td>{scene.name}</td>
                  <td>
                    <ButtonPrimary
                      onClick={() => editScene(scene)}
                      className="mr-2"
                    >
                      Edytuj
                    </ButtonPrimary>
                    <ButtonDanger onClick={() => deleteScene(scene)}>
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

export default withSwal(({ swal }) => <ScenesPage swal={swal} />);
