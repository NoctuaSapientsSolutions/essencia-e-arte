"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { SkeletonBlock } from "@/components/ui/SkeletonLoader";
import { ApiError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";

type Mode = "login" | "register";

export function AccountView() {
  const { user, ready, login, register, logout } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!ready) {
    return (
      <div aria-busy="true" className="mx-auto mt-10 max-w-md space-y-4">
        <SkeletonBlock className="h-11 w-full" />
        <SkeletonBlock className="h-11 w-full" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="mx-auto mt-10 max-w-md text-center">
        <p className="font-display text-3xl text-forest">Olá, {user.name.split(" ")[0]}</p>
        <p className="mt-2 text-sm text-muted">{user.email}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/favoritos"
            className="inline-flex h-11 items-center justify-center rounded-md bg-forest px-6 text-sm font-medium text-cream hover:bg-forest-700"
          >
            Ver meus favoritos
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex h-11 items-center justify-center rounded-md border border-forest px-6 text-sm font-medium text-forest hover:bg-cream"
          >
            Sair da conta
          </button>
        </div>
      </div>
    );
  }

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      if (mode === "login") {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Não foi possível concluir. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <div className="flex gap-2 rounded-md border border-border p-1 text-sm">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded-md py-2 font-medium ${mode === "login" ? "bg-forest text-cream" : "text-forest"}`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 rounded-md py-2 font-medium ${mode === "register" ? "bg-forest text-cream" : "text-forest"}`}
        >
          Criar conta
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        {mode === "register" && (
          <FormField
            id="conta-nome"
            label="Nome completo"
            autoComplete="name"
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        )}
        <FormField
          id="conta-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        <FormField
          id="conta-senha"
          label="Senha"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          minLength={6}
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
        />

        {error && (
          <p role="alert" className="text-sm text-stock-out">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex h-12 w-full items-center justify-center rounded-md bg-forest text-sm font-medium text-cream hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Enviando…" : mode === "login" ? "Entrar" : "Criar conta"}
        </button>
      </form>
    </div>
  );
}
