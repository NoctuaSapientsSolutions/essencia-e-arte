import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";

export const contactRouter = Router();

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

/** POST /contact */
contactRouter.post("/", async (req, res) => {
  const data = bodySchema.parse(req.body);
  const message = await prisma.contactMessage.create({ data });
  res.status(201).json({ id: message.id, createdAt: message.createdAt.toISOString() });
});
