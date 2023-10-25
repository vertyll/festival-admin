/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Spinner from "@/components/atoms/Spinner";
import { ReactSortable } from "react-sortablejs";
import ButtonPrimary from "../atoms/ButtonPrimary";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import FieldInput from "../molecules/FieldInput";
import FieldTextarea from "../molecules/FieldTextarea";
import ButtonDanger from "../atoms/ButtonDanger";

export default function ProductForm({
  _id,
  name: currentName,
  category: currentCategory,
  properties: currentProperties,
  images: currentImages,
  description: currentDescription,
  price: currentPrice,
}) {
  const [name, setName] = useState(currentName || "");
  const [category, setCategory] = useState(currentCategory || "");
  const [properties, setProperties] = useState(currentProperties || []);
  const [images, setImages] = useState(currentImages || []);
  const [description, setDescription] = useState(currentDescription || "");
  const [price, setPrice] = useState(currentPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  async function saveProduct(e) {
    e.preventDefault();
    const data = {
      name,
      category,
      properties,
      images,
      description,
      price,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values,
      })),
    };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }

  if (goToProducts) {
    router.push("/products");
  }

  function cancel() {
    router.push("/products");
  }

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesSequence(images) {
    setImages(images);
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
    <form onSubmit={saveProduct}>
      <FieldInput
        labelText={<span>Nazwa</span>}
        type="text"
        placeholder="nazwa produktu"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Label>
        <span>Kategoria</span>
      </Label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Bez kategori</option>
        {categories.length > 0 &&
          categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
      </select>
      <div className="mb-2">
        <Label>
          <span>Właściwości</span>
        </Label>
        <ButtonPrimary onClick={addProperty} type="button">
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
              <ButtonDanger
                onClick={() => removeProperty(index)}
                className="mt-2"
                type="button"
              >
                Usuń
              </ButtonDanger>
            </div>
          ))}
      </div>
      <Label htmlFor="upload">
        <span>Zdjęcia</span>
      </Label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          list={images}
          setList={updateImagesSequence}
          className="flex flex-wrap gap-2"
        >
          {!!images?.length &&
            images.map((link) => (
              <div key={link} className="h-32">
                <img
                  src={link}
                  alt="zdjęcie produktu"
                  className="rounded-lg"
                ></img>
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-32 p-1 flex items-center">
            <Spinner />
          </div>
        )}
        <Label className="w-32 h-32 cursor-pointer text-center flex flex-col items-center justify-center rounded-lg bg-neutral-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Prześlij</div>
          <Input
            type="file"
            onChange={uploadImages}
            className="hidden"
            id="upload"
          />
        </Label>
      </div>
      <FieldTextarea
        labelText={<span>Opis</span>}
        placeholder="opis produktu"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FieldInput
        labelText={<span>Cena</span>}
        placeholder="cena produktu"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <div className="flex gap-1">
        <ButtonPrimary>Zapisz</ButtonPrimary>
        <ButtonDanger onClick={() => cancel()} type="button">
          Anuluj
        </ButtonDanger>
      </div>
    </form>
  );
}
