import Layout from "@/components/Layout";
import Link from "next/link";

export default function Products() {
    return (
        <Layout>
            <Link className='bg-green-600 rounded-lg text-white py-2 px-6' href={'/products/new'}>Dodaj nowy produkt</Link>
        </Layout>
    )
}