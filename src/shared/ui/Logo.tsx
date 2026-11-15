import { ChefHat } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-9 items-center justify-center rounded-r12 bg-accent">
        <ChefHat size={24} className="text-ink-onAccent" aria-hidden />
      </div>
      <span className="text-2xl font-extrabold text-ink">SweetList</span>
      <span className="size-1.5 rounded-full bg-accent" aria-hidden />
    </div>
  );
}
