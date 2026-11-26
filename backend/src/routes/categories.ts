import { Router } from "express";
import { prisma } from "../db.js";
import { serializeCategory } from "../lib/serialize.js";

export const categoriesRouter = Router();

/** GET /categories */
categoriesRouter.get("/", async (_req, res) => {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  res.json(categories.map(serializeCategory));
});
