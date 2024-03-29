/* eslint-disable @next/next/no-img-element */
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Topbar({ show }) {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  async function logout() {
    await router.push("/");
    await signOut();
  }

  if (!session) return;
  return (
    <div
      className={
        (show ? "left-0" : "-left-full") +
        " text-black md:flex justify-end p-2 bg-indigo-300 hidden"
      }
    >
      <div
        className="relative"
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
      >
        <div className="flex items-center text-white cursor-pointer gap-2 p-2 rounded-md uppercase text-sm">
          <img
            src={session?.user?.image}
            alt=""
            className="w-10 h-10 rounded-full border-2 "
          />
          <span className="py-1 px-2">
            <b>{session?.user?.name}</b>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        {showMenu && (
          <div className="flex cursor-pointer absolute right-0 py-2 w-48 bg-white rounded-md shadow-xl z-10">
            <a
              className="flex gap-2 items-center p-2 w-full text-sm capitalize rounded-md text-gray-700 hover:bg-indigo-300 hover:text-white transition duration-300"
              onClick={logout}
            >
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Wyloguj
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
