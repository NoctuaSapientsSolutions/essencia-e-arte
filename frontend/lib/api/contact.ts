import { apiFetch } from "@/lib/api/client";

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

/** POST /contact */
export async function sendContactMessage(input: ContactInput): Promise<void> {
  await apiFetch<{ id: string; createdAt: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
