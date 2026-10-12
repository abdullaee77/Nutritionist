export function LogoMark({ size = 44, n = "#A8475A" }: { size?: number; n?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <rect x="12" y="34" width="22" height="3" fill={n} />
      <rect x="18" y="34" width="8" height="62" fill={n} />
      <rect x="12" y="93" width="22" height="3" fill={n} />
      <polygon points="18,34 32,34 86,95 72,95" fill={n} />
      <path d="M78 96 C70 60 88 46 108 16 C106 62 94 84 78 96 Z" fill="#A9BFA4" />
      <path d="M78 96 C78 76 84 66 97 55 C97 76 90 88 78 96 Z" fill="#E3B866" />
      <circle cx="72" cy="28" r="7" fill="#E3B866" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="logo">
      <LogoMark n={light ? "#F7F1E6" : "#A8475A"} />
      <span className="logo-text">
        <span className="logo-name" style={{ color: light ? "#F7F1E6" : undefined }}>NAFLAR</span>
        <span className="logo-sub" style={{ color: light ? "#E3B866" : undefined }}>HEALTHCARE</span>
      </span>
    </span>
  );
}