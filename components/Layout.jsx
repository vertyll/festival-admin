import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-indigo-600 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            className="bg-white p-5 rounded-3xl px-4"
            onClick={() => signIn("google")}
          >
            Zaloguj się za pomocą <b>Google</b>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-600 min-h-screen flex">
      <Sidebar />
      <div className="bg-white p-2 flex-grow">{children}</div>
    </div>
  );
}
