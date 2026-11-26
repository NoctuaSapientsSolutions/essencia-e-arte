import "express-async-errors";
import cors from "cors";
import express from "express";
import { env } from "./env.js";
import { errorHandler } from "./middleware/error.js";
import { categoriesRouter } from "./routes/categories.js";
import { productsRouter } from "./routes/products.js";
import { cartRouter } from "./routes/cart.js";
import { shippingRouter } from "./routes/shipping.js";
import { ordersRouter } from "./routes/orders.js";
import { contactRouter } from "./routes/contact.js";
import { authRouter } from "./routes/auth.js";

export const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/shipping", shippingRouter);
app.use("/orders", ordersRouter);
app.use("/contact", contactRouter);
app.use("/auth", authRouter);

app.use(errorHandler);
