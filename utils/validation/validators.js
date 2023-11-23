const MAX_NAME_LENGTH = 50;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ATTRIBUTE_VALUE_LENGTH = 25;
const ATTRIBUTE_VALUE_PATTERN = /[^a-zA-Z0-9 łżńąśźęóćŁŻŃĄŚŹĘÓĆ -]/;
const MIN_AVAILABILITY_VALUE = 1;
const CONCERT_TIME_PATTERN = /^[0-9]{2}:[0-9]{2}$/;

export const validateName = (name) => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Proszę wpisać nazwę.";
  }
  if (trimmedName.length > MAX_NAME_LENGTH) {
    return `Nazwa nie może przekraczać ${MAX_NAME_LENGTH} znaków.`;
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

export const validateAvailability = (availability, hasProperties) => {
  if (hasProperties) {
    return null;
  }

  if (availability == null || isNaN(availability) || availability <= 0) {
    return "Stan magazynowy musi być liczbą dodatnią";
  }

  return null;
};

export const validateCombinationsAvailability = (combinationsAvailability) => {
  for (let i = 0; i < combinationsAvailability.length; i++) {
    const combinationAvailability = combinationsAvailability[i];
    if (
      combinationAvailability == null ||
      isNaN(combinationAvailability) ||
      combinationAvailability < MIN_AVAILABILITY_VALUE
    ) {
      return `Stan magazynowy kombinacji ${
        i + 1
      } musi być liczbą większą lub równą ${MIN_AVAILABILITY_VALUE}`;
    }
  }
  return null;
};

export const validateConcertTime = (concertTime) => {
  //możę być puste, jeśli nie jest puste to musi być w formacie 20:00 czyli 2 cyfry dwukropek 2 cyfry
  if (concertTime == null || concertTime == "") {
    return null;
  }
  const trimmedConcertTime = concertTime.trim();
  if (!CONCERT_TIME_PATTERN.test(trimmedConcertTime)) {
    return "Nieprawidłowy format godziny koncertu. Wprowadź w formacie XX:XX";
  }
  return null;
};

export const validateLink = (link) => {
  const trimmedLink = link.trim();
  if (!trimmedLink) {
    return "Proszę wpisać link.";
  }
};
