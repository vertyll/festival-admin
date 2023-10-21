/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/templates/Layout";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  if (!session) return;
  return (
    <Layout>
      <div className="text-black flex justify-between">
        <h2>
          Witaj, <b>{session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 text-black gap-1 p-2 rounded-lg">
          <img
            src={session?.user?.image}
            alt="zdjęcie użytkownika"
            className="w-8 h-8"
          />
          <span className="py-1 px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
