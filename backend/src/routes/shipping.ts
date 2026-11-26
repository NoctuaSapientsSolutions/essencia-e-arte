import { Router } from "express";
import { z } from "zod";
import { HttpError } from "../middleware/error.js";
import { isValidCep, quoteShipping } from "../lib/shippingQuote.js";

export const shippingRouter = Router();

const bodySchema = z.object({ cep: z.string() });

/** POST /shipping/quote */
shippingRouter.post("/quote", (req, res) => {
  const { cep } = bodySchema.parse(req.body);
  if (!isValidCep(cep)) throw new HttpError(400, "CEP inválido");

  const options = quoteShipping(cep);
  res.json({ options });
});
