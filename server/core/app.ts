import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthRoutes from "./auth/auth.routes";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => res.json({ status: "ok" }));

app.use("/auth", AuthRoutes);

app.use((_, res) => res.status(404).json({ message: "Not found" }));

export default app;
