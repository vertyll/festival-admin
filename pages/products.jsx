import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";

export default function Products() {
    useEffect(() => {
        axios.get('/api/products').then(response => {
            console.log(response.data);
        });
    });
    return (
        <Layout>
            <Link className='bg-green-600 rounded-lg text-white py-2 px-6' href={'/products/new'}>Dodaj nowy produkt</Link>
        </Layout>
    )
}