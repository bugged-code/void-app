import jwt from "jsonwebtoken";
import { UsersStore } from "../memory";
import { Request, Response } from "express";
import { User } from "../types/user";
import { randomUUID } from "node:crypto";

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = UsersStore.findByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES as jwt.SignOptions["expiresIn"] },
  );

  res.json({ token });
};

export const register = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = UsersStore.findByUsername(username);
  if (user) {
    return res.status(401).json({ error: "User already exists" });
  }

  UsersStore.create({
    id: randomUUID(),
    username,
    password,
    role: "user",
  } as User);

  res.sendStatus(201);
};
