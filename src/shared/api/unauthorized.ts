let handler: (() => void) | null = null;

/** The app layer registers what happens when the API rejects a stored token. */
export function setUnauthorizedHandler(fn: () => void) {
  handler = fn;
}

export function notifyUnauthorized() {
  handler?.();
}
