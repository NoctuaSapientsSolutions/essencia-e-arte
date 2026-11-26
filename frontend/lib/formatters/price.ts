const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata centavos como moeda brasileira. Ex.: 2990 -> "R$ 29,90" */
export function formatPrice(cents: number): string {
  return brl.format(cents / 100).replace(/ /g, " ");
}

/** Parcelamento sem juros de 3x, usado nos cards. Ex.: 2990 -> "3x de R$ 9,97" */
export function formatInstallments(cents: number, times = 3): string {
  return `${times}x de ${formatPrice(Math.ceil(cents / times))}`;
}
