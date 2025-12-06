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
import { validateFormValues } from "@/utils/validation/validation";

export default function SponsorForm({ _id, name: currentName, images: currentImages, link: currentLink }) {
  const [name, setName] = useState(currentName || "");
  const [images, setImages] = useState(currentImages || []);
  const [link, setLink] = useState(currentLink || "");
  const [goToSponsors, setGoToSponsors] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

  const router = useRouter();

  async function saveSponsor(e) {
    e.preventDefault();

    const errors = validateFormValues({ name, link }, ["name", "link"]);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const data = {
      name,
      images,
      link,
    };
    if (_id) {
      await axios.put("/api/sponsors", { ...data, _id });
    } else {
      await axios.post("/api/sponsors", data);
    }
    setGoToSponsors(true);
  }

  if (goToSponsors) {
    router.push("/sponsors");
  }

  function cancel() {
    router.push("/sponsors");
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
    setImages((prevImages) => prevImages.filter((img, index) => index !== imageIndex));
  }

  return (
    <form onSubmit={saveSponsor}>
      <FieldInput
        labelText={<span>Nazwa</span>}
        type="text"
        placeholder="nazwa sponsora"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {validationErrors["name"] && <div className="error-message">{validationErrors["name"]}</div>}
      <Label htmlFor="upload">
        <span>Zdjęcia</span>
      </Label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable list={images} setList={updateImagesSequence} className="flex flex-wrap gap-2">
          {!!images?.length &&
            images.map((link, index) => (
              <div
                key={`${link}_${index}`} // aby klucz był unikalny nawet gdy obrazek zostanie dodany ponownie
                className="relative shadow-md rounded-md h-32 bg-neutral-100"
                onMouseEnter={() => setHoveredImageIndex(index)}
                onMouseLeave={() => setHoveredImageIndex(null)}
              >
                <img src={link} alt="zdjęcie artysty" className="rounded-md object-cover h-full w-full"></img>
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
          <Input type="file" onChange={uploadImages} className="hidden" id="upload" />
        </Label>
      </div>
      <FieldTextarea
        labelText={<span>Link</span>}
        placeholder="link do sponsora"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      {validationErrors["link"] && <div className="error-message">{validationErrors["link"]}</div>}
      <div className="flex gap-1">
        <ButtonPrimary>Zapisz</ButtonPrimary>
        <ButtonDanger onClick={() => cancel()} type="button">
          Anuluj
        </ButtonDanger>
      </div>
    </form>
  );
}
