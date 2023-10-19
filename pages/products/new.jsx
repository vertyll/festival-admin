import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function createProduct(e) {
    e.preventDefault();
    const data = {name, description, price};
    await axios.post('/api/products', data);
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products');
  }
  return (
    <Layout>
      <form onSubmit={createProduct}>
      <h1>Nowy produkt</h1>
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
      <button type='submit' className="btn-primary">Dodaj</button>
      </form>
    </Layout>
  );
}
