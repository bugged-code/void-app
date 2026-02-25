import { User } from "../types/user";

const users: User[] = [];

export const UsersStore = {
  all: () => users,

  findByUsername: (username: string) =>
    users.find((u) => u.username === username),

  findById: (id: string) => users.find((u) => u.id === id),

  create: (user: User) => {
    users.push(user);
    return user;
  },
};
