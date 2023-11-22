import {
  validateName,
  validatePrice,
  validateEmail,
  validatePropertiesValues,
  validateAttributeValue,
  validateDescription,
  validateAvailability,
  validateCombinationsAvailability,
} from "./validators";

export const validateFormValues = (
  values,
  fieldsToValidate = [],
  hasProperties = false
) => {
  const validators = {
    name: validateName,
    price: validatePrice,
    shippingPrice: validatePrice,
    email: validateEmail,
    propertiesValues: validatePropertiesValues,
    attributeValue: validateAttributeValue,
    description: validateDescription,
    availability: validateAvailability,
    combinationsAvailability: validateCombinationsAvailability,
  };

  if (hasProperties) {
    fieldsToValidate = fieldsToValidate.filter(
      (field) => field !== "availability"
    );
  }

  return fieldsToValidate.reduce((errors, field) => {
    const validator = validators[field];
    const error = validator ? validator(values[field]) : null;
    if (error) {
      errors[field] = error;
    }
    return errors;
  }, {});
};
