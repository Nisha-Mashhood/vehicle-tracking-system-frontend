export const nameValidation = {
  required: "Name is required",

  minLength: {
    value: 3,
    message: "Name must be at least 3 characters"
  },

  maxLength: {
    value: 50,
    message: "Name cannot exceed 50 characters"
  },

  pattern: {
    value: /^[A-Za-z ]+$/,
    message: "Only alphabets and spaces allowed"
  },

  validate: {
    noMultipleSpaces: (value: string) =>
      !/\s{2,}/.test(value) || "Cannot contain multiple consecutive spaces",

    noExcessiveRepeats: (value: string) =>
      !/(.)\1{3,}/.test(value) || "Character repeated too many times",

    noStartingSpecialChar: (value: string) =>
      !/^[^A-Za-z0-9]/.test(value) || "Cannot start with a special character"
  }
}

export const emailValidation = {
  required: "Email is required",

  maxLength: {
    value: 100,
    message: "Email cannot exceed 100 characters"
  },

  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format"
  },

  validate: {
    noUppercaseEmail: (value: string) =>
      !/[A-Z]/.test(value) || "Email must not contain uppercase letters",

    noMultipleSpaces: (value: string) =>
      !/\s{2,}/.test(value) || "Cannot contain multiple spaces"
  }
}

export const passwordValidation = {
  required: "Password is required",

  minLength: {
    value: 8,
    message: "Password must be at least 8 characters"
  },

  maxLength: {
    value: 20,
    message: "Password cannot exceed 20 characters"
  },

  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
    message: "Must include uppercase, lowercase, number and special char"
  },

  validate: {
    noSequentialRepeatedDigits: (value: string) =>
      !/(\d)\1{2,}/.test(value) || "Repeated digits not allowed",

    noSequentialRepeatedLetters: (value: string) =>
      !/([A-Za-z])\1{2,}/.test(value) || "Repeated letters not allowed"
  }
}