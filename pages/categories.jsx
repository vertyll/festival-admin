import Layout from "@/components/templates/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonPrimary from "@/components/atoms/button/ButtonPrimary";
import ButtonDanger from "@/components/atoms/button/ButtonDanger";
import FieldInput from "@/components/molecules/field/FieldInput";
import Spinner from "@/components/atoms/spinner/Spinner";
import { withSwal } from "react-sweetalert2";

function CategoriesPage({ swal }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }

  async function saveCategory(e) {
    e.preventDefault();
    const data = { name, parentCategory };
    if (editedCategory) {
      setIsUpdating(true);
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
      setIsUpdating(false);
      fetchCategories();
    } else {
      await axios.post("/api/categories", data);
      setName("");
    }
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parentCategory?._id);
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Uwaga",
        text: `Czy na pewno chcesz usunąć ${category.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Nie",
        confirmButtonText: "Tak",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategories();
          swal.fire("Usunięto!", `Kategoria ${category.name} została usunięta`, "success");
        }
      });
  }

  return (
    <Layout>
      <form onSubmit={saveCategory} className="flex gap-2 flex-col">
        <FieldInput
          labelText={
            <span>
              {editedCategory
                ? `Edytuj kategorię ${editedCategory.name}`
                : "Utwórz nową kategorię"}
            </span>
          }
          type="text"
          placeholder="nazwa kategori"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value="dasdasd">Brak nadrzędnej kategori</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <ButtonPrimary className="w-max">Zapisz</ButtonPrimary>
      </form>
      <table className="primary-table mt-5">
        <thead>
          <tr>
            <td>Nazwa kategori</td>
            <td>Kategoria nadrzędna</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category?.parentCategory?.name}</td>
              <td>
                <div className="flex gap-2">
                  <ButtonPrimary onClick={() => editCategory(category)}>
                    Edytuj
                  </ButtonPrimary>
                  <ButtonDanger onClick={() => deleteCategory(category)}>
                    Usuń
                  </ButtonDanger>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => <CategoriesPage swal={swal} />);
