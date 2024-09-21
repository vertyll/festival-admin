import React, { useState, useEffect } from "react";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookies_accepted");
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookies_accepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-700 mb-2 sm:mb-0">
          Ta strona używa plików cookie, aby poprawić Twoje doświadczenie.
          Korzystając z naszej strony, zgadzasz się na wykorzystanie plików
          cookie.
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
