const MAX_NAME_LENGTH = 50;
const NAME_PATTERN = /[^a-zA-Z0-9 łżńąśźęóćŁŻŃĄŚŹĘÓĆ -]/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateName = (name) => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Proszę wpisać nazwę.";
  }
  if (trimmedName.length > MAX_NAME_LENGTH) {
    return "Nazwa nie może przekraczać 50 znaków.";
  }
  if (NAME_PATTERN.test(trimmedName)) {
    return "Nazwa może zawierać tylko litery, cyfry, spacje i myślniki.";
  }

  return null;
};

export const validatePrice = (price) => {
  if (price == null || isNaN(price) || price <= 0) {
    return "Cena musi być liczbą dodatnią";
  }

  return null;
};

export const validateEmail = (email) => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "Proszę wpisać adres email.";
  }
  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return "Nieprawidłowy format adresu email.";
  }

  return null;
};
