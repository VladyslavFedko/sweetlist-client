import { assetUrl } from '@/shared/config/env';

interface AvatarProps {
  name: string;
  src?: string | null;
  size?: number;
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({ name, src, size = 44 }: AvatarProps) {
  const url = assetUrl(src);
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-tint text-base font-extrabold text-ink"
      style={{ width: size, height: size }}
    >
      {url ? <img src={url} alt="" className="h-full w-full object-cover" /> : initials(name)}
    </div>
  );
}
