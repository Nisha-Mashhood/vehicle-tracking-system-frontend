export const nameValidation = {
  required: "Name is required",
  minLength: {
    value: 2,
    message: "Name must be at least 2 characters"
  },
  pattern: {
    value: /^[A-Za-z ]+$/,
    message: "Name can only contain letters"
  }
};

export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format"
  }
};

export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 6,
    message: "Password must be at least 6 characters"
  }
};