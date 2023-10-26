import { validateName, validatePrice, validateEmail } from "./validators";

export const validateFormValues = (values, fieldsToValidate = []) => {
  let errors = {};

  if (fieldsToValidate.includes("name")) {
    const nameError = validateName(values.name);
    if (nameError) errors.name = nameError;
  }

  if (fieldsToValidate.includes("price")) {
    const priceError = validatePrice(values.price);
    if (priceError) errors.price = priceError;
  }

  if (fieldsToValidate.includes("shippingPrice")) {
    const priceError = validatePrice(values.shippingPrice);
    if (priceError) errors.shippingPrice = priceError;
  }

  if (fieldsToValidate.includes("email")) {
    const emailError = validateEmail(values.email);
    if (emailError) errors.email = emailError;
  }

  return errors;
};
