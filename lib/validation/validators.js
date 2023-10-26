export const validateName = (name) => {
  if (!name.trim()) {
    return "Proszę wpisać nazwę.";
  } else if (name.trim().length > 30) {
    return "Nazwa nie może przekraczać 30 znaków.";
  } else if (/[^a-zA-Z0-9 -]/.test(name)) {
    return "Nazwa może zawierać tylko litery, cyfry, spacje i myślniki.";
  }

  return null;
};

export const validatePrice = (price) => {
  // Jeśli price jest null, undefined lub NaN, traktujemy to jako błąd
  if (price == null || isNaN(price)) {
    return "Proszę wpisać cenę produktu.";
  }

  // Jeśli price jest liczbą, ale nie jest dodatnia
  if (price <= 0) {
    return "Cena musi być dodatnią liczbą.";
  }

  // Jeśli żaden z powyższych warunków nie jest spełniony, cena jest prawidłowa
  return null;
};

export const validateEmail = (email) => {
  // Jeśli email jest pusty lub składa się tylko z białych znaków
  if (!email.trim()) {
    return "Proszę wpisać adres email.";
  }

  // Prosty wzorzec, aby sprawdzić, czy wartość wygląda jak email.
  // Możesz dostosować to wyrażenie regularne, aby spełniało Twoje własne wymogi dotyczące walidacji email.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return "Nieprawidłowy format adresu email.";
  }

  // Jeśli żaden z powyższych warunków nie jest spełniony, adres email jest prawidłowy
  return null;
};
