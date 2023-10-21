import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Sidebar from "@/components/organisms/sidebar/Sidebar";
import ButtonLogin from "../atoms/button/ButtonLogin";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-indigo-600 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <ButtonLogin onClick={() => signIn("google")}>
            Zaloguj się za pomocą <b>Google</b>
          </ButtonLogin>
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
