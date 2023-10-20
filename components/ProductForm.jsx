import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  name: currentName,
  images: currentImages,
  description: currentDescription,
  price: currentPrice,
}) {
  const [name, setName] = useState(currentName || "");
  const [images, setImages] = useState(currentImages || []);
  const [description, setDescription] = useState(currentDescription || "");
  const [price, setPrice] = useState(currentPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function saveProduct(e) {
    e.preventDefault();
    const data = { name, images, description, price };
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

  return (
    <form onSubmit={saveProduct}>
      <label>
        <span>Nazwa</span>
        <input
          type="text"
          placeholder="nazwa produktu"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </label>
      <label htmlFor="upload">
        <span>Zdjęcia</span>
      </label>
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
        <label className="w-32 h-32 cursor-pointer text-center flex flex-col items-center justify-center rounded-lg bg-neutral-300">
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
          <input
            type="file"
            onChange={uploadImages}
            className="hidden"
            id="upload"
          ></input>
        </label>
      </div>
      <label>
        <span>Opis</span>
        <textarea
          placeholder="opis produktu"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>
      <label>
        Cena
        <input
          placeholder="cena produktu"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
      </label>
      <button type="submit" className="btn-primary">
        Zapisz
      </button>
    </form>
  );
}
