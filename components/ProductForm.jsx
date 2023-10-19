/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
  _id,
  name: currentName,
  description: currentDescription,
  price: currentPrice,
}) {
  const [name, setName] = useState(currentName || "");
  const [description, setDescription] = useState(currentDescription || "");
  const [price, setPrice] = useState(currentPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function saveProduct(e) {
    e.preventDefault();
    const data = { name, description, price };
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
