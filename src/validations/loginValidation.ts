import { emailValidation, passwordValidation } from "./common-validations";

export const loginValidation = {
  email: emailValidation,
  password: passwordValidation
};