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

  res
    .cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    })
    .json({ message: "Login ok" });
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

  res.status(201).json({ message: "Register ok" });
};

export const logout = (_: Request, res: Response) => {
  res.clearCookie("auth_token").json({ message: "Logout ok" });
};
