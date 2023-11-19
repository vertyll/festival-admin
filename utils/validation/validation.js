import {
  validateName,
  validatePrice,
  validateEmail,
  validateProperties,
  validateAttributeValue,
} from "./validators";

export const validateFormValues = (values, fieldsToValidate = []) => {
  const validators = {
    name: validateName,
    price: validatePrice,
    shippingPrice: validatePrice,
    email: validateEmail,
    properties: validateProperties,
    attributeValue: validateAttributeValue,
  };

  return fieldsToValidate.reduce((errors, field) => {
    const validator = validators[field];
    const error = validator ? validator(values[field]) : null;
    if (error) {
      errors[field] = error;
    }
    return errors;
  }, {});
};
