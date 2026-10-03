import express from "express";
import path from "path";

import { db } from "./database/db.js";
import foodRouter from "./router/food/food.router.js"
import orderRouter from "./router/order/order.router.js";


import cors from "cors";
import { authRouter } from "./router/auth/auth.js";
const app = express();
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
const port = 8000;
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);

db()
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Unable to connect to MongoDB:", err.message);
        process.exitCode = 1;
    });