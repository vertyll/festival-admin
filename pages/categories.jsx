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

function CategoriesPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});

  function fetchCategories() {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function saveCategory(e) {
    e.preventDefault();

    const errors = validateFormValues({ name }, ["name"]);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      console.log("Błędy walidacji:", errors);
      return;
    }

    const data = { name, parentCategory };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
      fetchCategories();
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParentCategory("");
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }

  function deleteCategory(category) {
    Swal.fire({
      title: "Uwaga",
      text: `Czy na pewno chcesz usunąć ${category.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Nie",
      confirmButtonText: "Tak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = category;
        await axios.delete("/api/categories?_id=" + _id);
        fetchCategories();
        Swal.fire("Usunięto!", `Kategoria ${category.name} została usunięta`, "success");
      }
    });
  }

  return (
    <Layout>
      <h1>Kategorie</h1>
      <form onSubmit={saveCategory}>
        <Label>{editedCategory ? `Edytuj kategorię: ${editedCategory.name}` : "Utwórz kategorię"}</Label>
        <div>
          <FieldInput
            labelText={<span>Nazwa</span>}
            type="text"
            placeholder={"Nazwa kategori"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {validationErrors["name"] && <div className="error-message">{validationErrors["name"]}</div>}
          <Label htmlFor="parentCategory">
            <span>Kategoria nadrzędna</span>
          </Label>
          <select onChange={(e) => setParentCategory(e.target.value)} value={parentCategory} id="parentCategory">
            <option value="">Brak nadrzędnej kategori</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <ButtonDanger
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
              }}
            >
              Anuluj
            </ButtonDanger>
          )}
          <ButtonPrimary>Zapisz</ButtonPrimary>
        </div>
      </form>
      {!editedCategory && (
        <table className="primary-table mt-5">
          <thead>
            <tr>
              <th>Nazwa kategori</th>
              <th>Kategoria nadrzędna</th>
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
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <ButtonPrimary onClick={() => editCategory(category)} className="mr-2">
                      Edytuj
                    </ButtonPrimary>
                    <ButtonDanger onClick={() => deleteCategory(category)}>Usuń</ButtonDanger>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default CategoriesPage;
