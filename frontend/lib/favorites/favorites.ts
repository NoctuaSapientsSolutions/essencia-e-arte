// Favoritos guardados no navegador por enquanto. Na API real, viram um recurso da conta.
export const FAVORITES_STORAGE_KEY = "ea-favoritos-v1";
export const FAVORITES_CHANGE_EVENT = "ea-favoritos:change";

export function readFavorites(): string[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

export function writeFavorites(ids: string[]): void {
  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Sem armazenamento disponível, o estado vale só nesta sessão.
  }
  window.dispatchEvent(new Event(FAVORITES_CHANGE_EVENT));
}
