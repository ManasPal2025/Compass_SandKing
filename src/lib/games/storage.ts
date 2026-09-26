/**
 * Safe localStorage wrapper with try/catch fallback.
 * Allows games to operate smoothly even if localStorage is disabled or throws.
 */

export const STORAGE_KEYS = {
  SADDLEBAG: "compass.saddlebag.v1",
  CHAI: "compass.chai.v1",
} as const;

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Gracefully handle storage errors (e.g., quota exceeded or blocked)
  }
}
