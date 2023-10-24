import Layout from "@/components/templates/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonPrimary from "@/components/atoms/ButtonPrimary";
import ButtonDanger from "@/components/atoms/ButtonDanger";
import { withSwal } from "react-sweetalert2";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import FieldInput from "@/components/molecules/FieldInput";

function CategoriesPage({ swal }) {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [properties, setProperties] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
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
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
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
    setProperties([]);
    fetchCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parentCategory?._id);
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
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
          swal.fire(
            "Usunięto!",
            `Kategoria ${category.name} została usunięta`,
            "success"
          );
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function handlePropertyNameChange(index, property, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }

  function handlePropertyValuesChange(index, property, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }

  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }

  return (
    <Layout>
      <form onSubmit={saveCategory}>
        <Label>
          {editedCategory
            ? `Edytuj kategorię ${editedCategory.name}`
            : "Utwórz kategorię"}
        </Label>
        <div>
          <FieldInput
            labelText={<span>Nazwa</span>}
            type="text"
            placeholder={"Nazwa kategori"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Label htmlFor="parentCategory">
            <span>Kategoria nadrzędna</span>
          </Label>
          <select
            onChange={(e) => setParentCategory(e.target.value)}
            value={parentCategory}
            id="parentCategory"
          >
            <option value="">Brak nadrzędnej kategori</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <ButtonPrimary
            onClick={addProperty}
            type="button"
          >
            Dodaj właściowść
          </ButtonPrimary>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div key={property._id} className="flex gap-2 mb-2">
                <Input
                  type="text"
                  className="mt-2"
                  onChange={(e) =>
                    handlePropertyNameChange(index, property, e.target.value)
                  }
                  value={property.name}
                  placeholder="nazwa właściwości"
                />
                <Input
                  type="text"
                  className="mt-2"
                  onChange={(e) =>
                    handlePropertyValuesChange(index, property, e.target.value)
                  }
                  value={property.values}
                  placeholder="wartości, np. żółty, fioletowy, wartości po ,"
                />
                <ButtonDanger onClick={() => removeProperty(index)} className="mt-2" type="button">
                  Usuń
                </ButtonDanger>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <ButtonDanger
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                setProperties([]);
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
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <ButtonPrimary
                      onClick={() => editCategory(category)}
                      className="mr-2"
                    >
                      Edytuj
                    </ButtonPrimary>
                    <ButtonDanger onClick={() => deleteCategory(category)}>
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

export default withSwal(({ swal }, ref) => <CategoriesPage swal={swal} />);
