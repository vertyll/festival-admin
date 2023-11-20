const MAX_NAME_LENGTH = 50;
const NAME_PATTERN = /[^a-zA-Z0-9 łżńąśźęóćŁŻŃĄŚŹĘÓĆ -]/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PROPERTIES_LENGTH = 100;
const PROPERTIES_PATTERN = /[^[a-zA-Z0-9ąćęłńóśżź,]+$]/;
const MAX_ATTRIBUTE_VALUE_LENGTH = 25;
const ATTRIBUTE_VALUE_PATTERN = /[^a-zA-Z0-9 łżńąśźęóćŁŻŃĄŚŹĘÓĆ -]/;

export const validateName = (name) => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Proszę wpisać nazwę.";
  }
  if (trimmedName.length > MAX_NAME_LENGTH) {
    return `Nazwa nie może przekraczać ${MAX_NAME_LENGTH} znaków.`;
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

export const validateProperties = (properties) => {
  return null;
};

export const validateAttributeValue = (attributeValue) => {
  const trimmedAttributeValue = attributeValue.trim();

  if (!trimmedAttributeValue) {
    return "Proszę wpisać wartości atrybutów.";
  }
  if (trimmedAttributeValue.length > MAX_ATTRIBUTE_VALUE_LENGTH) {
    return `Wartość atrybutu nie może przekraczać ${MAX_ATTRIBUTE_VALUE_LENGTH} znaków.`;
  }
  if (ATTRIBUTE_VALUE_PATTERN.test(trimmedAttributeValue)) {
    return "Wartość atrybytu może zawierać tylko litery, cyfry, spacje i myślniki.";
  }

  return null;
};

export const validateDescription = (description) => {
  const trimmedDescription = description.trim();

  if (!trimmedDescription) {
    return "Proszę wpisać opis.";
  }

  return null;
};
