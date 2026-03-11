export function NorthStarLogo({ className = 'h-32' }: { className?: string }) {
  return (
    <img
      src="/ns.jpeg"
      alt="North Star Operations Logo"
      className={className}
      style={{ objectFit: 'contain', width: 'auto' }}
    />
  );
}
