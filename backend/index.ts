import { Hono } from "hono";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { serve } from "@hono/node-server";

dotenv.config();

const app = new Hono();

mongoose.connect(process.env.MONGODB_URI!)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

app.get("/", (c) => {
    return c.text("API Blog fonctionnel");
});


serve(app, (info) => {
    console.log(`Serveur lancé sur le port ${info.port}`);
});