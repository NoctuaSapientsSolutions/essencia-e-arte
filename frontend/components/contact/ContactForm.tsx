"use client";

import { useState, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { sendContactMessage } from "@/lib/api/contact";

type FormState = { name: string; email: string; message: string };
const INITIAL_FORM: FormState = { name: "", email: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = "Informe seu nome.";
    if (!/.+@.+\..+/.test(form.email)) nextErrors.email = "Informe um e-mail válido.";
    if (!form.message.trim()) nextErrors.message = "Escreva sua mensagem.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || sending) return;

    setSending(true);
    setSendError(null);
    try {
      await sendContactMessage(form);
      setSent(true);
    } catch {
      setSendError("Não foi possível enviar sua mensagem agora. Tente novamente em instantes ou fale pelo WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-lg border border-border bg-cream p-6 text-center">
        <p className="font-display text-xl text-forest">Mensagem enviada!</p>
        <p className="mt-2 text-sm text-brown">
          Obrigado por escrever, {form.name.split(" ")[0]}. Nosso time responde em até 1 dia útil pelo e-mail informado.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormField
        id="contato-nome"
        label="Nome"
        autoComplete="name"
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
      />
      <FormField
        id="contato-email"
        label="E-mail"
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={(e) => updateField("email", e.target.value)}
        error={errors.email}
      />
      <div>
        <label htmlFor="contato-mensagem" className="text-sm font-medium text-charcoal">Mensagem</label>
        <textarea
          id="contato-mensagem"
          rows={5}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contato-mensagem-erro" : undefined}
          className={`mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm ${
            errors.message ? "border-stock-out" : "border-border"
          }`}
        />
        {errors.message && (
          <p id="contato-mensagem-erro" role="alert" className="mt-1 text-xs text-stock-out">
            {errors.message}
          </p>
        )}
      </div>

      {sendError && (
        <p role="alert" className="text-sm text-stock-out">
          {sendError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="h-12 w-full rounded-md bg-forest text-sm font-medium text-cream hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-8"
      >
        {sending ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}
