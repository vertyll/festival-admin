import Layout from "@/components/Layout";

export default function NewProduct() {
  return (
    <Layout>
      <h1>Nowy produkt</h1>
      <label>
        <span>
          Nazwa
        </span>
        <input type="text" placeholder="nazwa produktu"></input>
      </label>
      <label>
        <span>
          Opis
        </span>
        <textarea placeholder="opis produktu"></textarea>
      </label>
      <label>
          Cena
        <input placeholder="cena produktu"></input>
      </label>
      <button className="btn-primary">Dodaj</button>
    </Layout>
  );
}
