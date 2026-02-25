import express from "express";
import morgan from "morgan";
import AuthRoutes from "./auth/auth.routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => res.json({ status: "ok" }));

app.use("/auth", AuthRoutes);

app.use((_, res) => res.status(404).json({ message: "Not found" }));

export default app;
