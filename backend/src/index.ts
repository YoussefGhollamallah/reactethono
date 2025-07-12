import { Hono } from "hono";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { connectDB } from "./config/db";
import authRoute from "./routes/auth.routes";

dotenv.config();

const app = new Hono();

app.use("*", cors({ origin: "http://localhost:5173" }));

connectDB(),

app.route("/auth/", authRoute);


app.get("/", (c) => {
    return c.text("API Blog fonctionnel");
});


serve(app, (info) => {
    console.log(`Serveur lancé sur le port ${info.port}`);
});