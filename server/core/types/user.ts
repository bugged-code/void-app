export type Role = "admin" | "user";

export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
}
