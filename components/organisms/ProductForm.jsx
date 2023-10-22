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
  const [properties, setProperties] = useState(currentProperties || {});
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
    const data = { name, category, properties, images, description, price };
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

  function setProp(propName, value) {
    setProperties((prev) => {
      const newProps = { ...prev };
      newProps[propName] = value;
      return newProps;
    });
  }

  const propToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
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
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      {propToFill.length > 0 &&
        propToFill.map((p) => (
          <div key={p.name} className="">
            <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
            <div>
              <select
                value={properties[p.name]}
                onChange={(e) => setProductProp(p.name, e.target.value)}
              >
                {p.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
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
      <ButtonPrimary>Zapisz</ButtonPrimary>
    </form>
  );
}
