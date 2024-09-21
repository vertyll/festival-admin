import { useSession, signIn } from "next-auth/react";
import Sidebar from "@/components/organisms/Sidebar";
import ButtonLogin from "../atoms/ButtonLogin";
import Topbar from "../organisms/Topbar";
import { useState } from "react";
import Logo from "../atoms/Logo";
import CookieBanner from "../organisms/CookieBanner";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-indigo-600 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <ButtonLogin onClick={() => signIn("google")}>
            Logowanie <b>Google</b>
          </ButtonLogin>
        </div>
        <CookieBanner />
      </div>
    );
  }

  return (
    <div className="bg-indigo-600 min-h-screen">
      <div className="md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Sidebar show={showNav} />
        <div className="bg-white flex-grow">
          <Topbar />
          <div className="bg-white p-2 flex-grow min-h-screen">{children}</div>
        </div>
      </div>
    </div>
  );
}