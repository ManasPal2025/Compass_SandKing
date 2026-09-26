/**
 * Safe localStorage wrapper with try/catch fallback and useSyncExternalStore support.
 * Allows games to operate smoothly even if localStorage is disabled or throws.
 */

export const STORAGE_KEYS = {
  SADDLEBAG: "compass.saddlebag.v1",
  CHAI: "compass.chai.v1",
} as const;

const cache = new Map<string, { raw: string | null; parsed: unknown }>();

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    const entry = cache.get(key);
    if (entry && entry.raw === raw) {
      return entry.parsed as T;
    }
    const parsed = JSON.parse(raw) as T;
    cache.set(key, { raw, parsed });
    return parsed;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const raw = JSON.stringify(value);
    cache.set(key, { raw, parsed: value });
    window.localStorage.setItem(key, raw);
    window.dispatchEvent(new Event("compass-storage-update"));
  } catch {
    // Gracefully handle storage errors (e.g., quota exceeded or blocked)
  }
}

export function subscribeStorage(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("compass-storage-update", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("compass-storage-update", callback);
  };
}
