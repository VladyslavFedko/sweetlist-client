export function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-warm" role="status" aria-live="polite">
      <div className="size-10 animate-spin rounded-full border-4 border-accent-tint border-t-accent" />
    </div>
  );
}
