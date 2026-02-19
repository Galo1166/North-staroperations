export function NorthStarLogo({ className = 'h-32' }: { className?: string }) {
  return (
    <img 
      src="/logo-3.png" 
      alt="North Star Operations Logo" 
      className={className}
      style={{ objectFit: 'contain', width: 'auto' }}
    />
  );
}
