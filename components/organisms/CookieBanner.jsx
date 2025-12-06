import { getCookie, setCookie } from "@/utils/cookies";
import React, { useState } from "react";

const CookieBanner = () => {
  const [accepted, setAccepted] = useState(false);

  const acceptCookies = () => {
    setCookie("cookies_accepted", "true", 365);
    setAccepted(true);
  };

  if (accepted || getCookie("cookies_accepted")) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-700 mb-2 sm:mb-0">
          Ta strona używa plików cookie, aby poprawić Twoje doświadczenie. Korzystając z naszej strony, zgadzasz się na
          wykorzystanie plików cookie.
        </p>
        <div className="flex items-center">
          <button
            onClick={acceptCookies}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
