/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "@/components/atoms/Spinner";
import { ReactSortable } from "react-sortablejs";
import ButtonPrimary from "../atoms/ButtonPrimary";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import FieldInput from "../molecules/FieldInput";
import FieldTextarea from "../molecules/FieldTextarea";
import ButtonDanger from "../atoms/ButtonDanger";
import { validateFormValues } from "@/utils/validation/validation";

export default function NewsForm({
  _id,
  name: currentName,
  images: currentImages,
  description: currentDescription,
}) {
  const [name, setName] = useState(currentName || "");
  const [images, setImages] = useState(currentImages || []);
  const [description, setDescription] = useState(currentDescription || "");
  const [goToNews, setGoToNews] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  const router = useRouter();

  async function saveNews(e) {
    e.preventDefault();

    const errors = validateFormValues({ name, description }, ["name", "description"]);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const data = {
      name,
      images,
      description,
    };
    if (_id) {
      await axios.put("/api/news", { ...data, _id });
    } else {
      await axios.post("/api/news", data);
    }
    setGoToNews(true);
  }

  if (goToNews) {
    router.push("/news");
  }

  function cancel() {
    router.push("/news");
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

  function handleRemoveImage(imageIndex) {
    setImages((prevImages) =>
      prevImages.filter((img, index) => index !== imageIndex)
    );
  }

  return (
    <form onSubmit={saveNews}>
      <FieldInput
        labelText={<span>Nazwa</span>}
        type="text"
        placeholder="nazwa newsa"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {validationErrors["name"] && (
        <div className="error-message">{validationErrors["name"]}</div>
      )}
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
            images.map((link, index) => (
              <div
                key={`${link}_${index}`} // aby klucz był unikalny nawet gdy obrazek zostanie dodany ponownie
                className="relative shadow-md rounded-md h-32 bg-neutral-100"
                onMouseEnter={() => setHoveredImageIndex(index)}
                onMouseLeave={() => setHoveredImageIndex(null)}
              >
                <img
                  src={link}
                  alt="zdjęcie newsa"
                  className="rounded-md object-cover h-full w-full"
                ></img>
                {hoveredImageIndex === index && (
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute inset-0 w-full h-full flex items-center justify-center rounded-md bg-black bg-opacity-40 text-white uppercase transition duration-300"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    <b>Usuń</b>
                  </button>
                )}
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-32 p-1 flex items-center">
            <Spinner />
          </div>
        )}
        <Label className="shadow-md w-32 h-32 cursor-pointer text-center flex flex-col items-center justify-center rounded-md bg-neutral-100 border-2 border-neutral-300 hover:bg-neutral-300">
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
        placeholder="opis newsa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {validationErrors["description"] && (
        <div className="error-message">{validationErrors["description"]}</div>
      )}
      <div className="flex gap-1">
        <ButtonPrimary>Zapisz</ButtonPrimary>
        <ButtonDanger onClick={() => cancel()} type="button">
          Anuluj
        </ButtonDanger>
      </div>
    </form>
  );
}
