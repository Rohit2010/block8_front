export const validEmail = new RegExp(
  "^[a-zA-Z0-9._-]+@[A-Za-z0-9.-]+\.[a-zA-Z0-9.-]+$"
);
export const validPassword = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
);
