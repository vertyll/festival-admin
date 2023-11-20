const MAX_NAME_LENGTH = 50;
const NAME_PATTERN = /[^a-zA-Z0-9 łżńąśźęóćŁŻŃĄŚŹĘÓĆ -]/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PROPERTY_VALUE_LENGTH = 100;
const PROPERTY_VALUE_PATTERN = /[^a-zA-Z0-9 łżńąśźęóćŁŻŃĄŚŹĘÓĆ ,.-]/;
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

export const validatePropertiesValues = (propertiesValues) => {
  if (!Array.isArray(propertiesValues)) {
    return "Właściwości powinny być w formacie tablicy.";
  }

  const errors = propertiesValues.flatMap((values, index) => {
    const trimmedValues = values.trim();
    let errorMessages = [];

    if (!trimmedValues) {
      errorMessages.push(
        `Właściwość ${index + 1}: Proszę wpisać wartości właściwości.`
      );
    }
    if (trimmedValues.length > MAX_PROPERTY_VALUE_LENGTH) {
      errorMessages.push(
        `Właściwość ${
          index + 1
        }: Wartości właściwości nie mogą przekraczać ${MAX_PROPERTY_VALUE_LENGTH} znaków.`
      );
    }
    if (PROPERTY_VALUE_PATTERN.test(trimmedValues)) {
      errorMessages.push(
        `Właściwość ${
          index + 1
        }: Wartości właściwości mogą zawierać tylko litery, cyfry, spacje, przecinki i myślniki.`
      );
    }
    return errorMessages;
  });

  // Filter out any null errors and return a combined error string or null
  const combinedErrors = errors.filter((error) => error.length > 0);
  return combinedErrors.length > 0 ? combinedErrors.join(", ") : null;
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
