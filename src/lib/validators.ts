export const isEmail = (v: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const minLen = (v: string, n: number): boolean =>
  (v?.trim()?.length ?? 0) >= n;

export type FieldErrors<T extends string = string> = Partial<Record<T, string>>;

export function validateLogin(
  username: string,
  password: string
): FieldErrors<"username" | "password"> {
  const errors: FieldErrors<"username" | "password"> = {};
  if (!username.trim()) {
    errors.username = "Username is required.";
  } else if (!minLen(username, 3)) {
    errors.username = "Username must be at least 3 characters.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (!minLen(password, 6)) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}