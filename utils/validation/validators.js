export const validateName = (name) => {
  if (!name.trim()) {
    return "Proszę wpisać nazwę.";
  } else if (name.trim().length > 50) {
    return "Nazwa nie może przekraczać 50 znaków.";
  } else if (/[^a-zA-Z0-9 łżńąśźęóćŁŻŃĄŚŹĘÓĆ -]/.test(name)) {
    return "Nazwa może zawierać tylko litery, cyfry, spacje i myślniki.";
  }

  return null;
};

export const validatePrice = (price) => {
  if (price == null || isNaN(price)) {
    return "Proszę wpisać cenę produktu.";
  }

  if (price <= 0) {
    return "Cena musi być liczbą dodatnią";
  }

  return null;
};

export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Proszę wpisać adres email.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return "Nieprawidłowy format adresu email.";
  }

  return null;
};
