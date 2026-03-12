import { nameValidation, emailValidation, passwordValidation } from "./common-validations";

export const registerValidation = {
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  password: passwordValidation
};