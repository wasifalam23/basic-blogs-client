export const VALIDATE_TEXT_REQUIRED = (value) => value.trim().length > 0;
export const VALIDATE_TEXT_REQ_MAX_8 = (value) =>
  value.trim().length >= 3 && value.trim().length <= 8;
export const VALIDATE_EMAIL = (value) => /^\S+@\S+\.\S+$/.test(value);
export const VALIDATE_PASSWORD = (value) => value.trim().length >= 8;
