import { useState } from 'react';
import { FileWarning } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  dark?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Archival Plate Unavailable',
  dark = false,
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center p-8 text-center border ${
          dark
            ? 'bg-[#0B2535] border-[#38BDF8]/25 text-[#91A4B5]'
            : 'bg-[#F5F3E9] border-[#071B27]/20 text-[#071B27]/70'
        } ${className}`}
      >
        <FileWarning className="w-7 h-7 mb-3 opacity-70" aria-hidden="true" />
        <p className="font-mono text-xs uppercase tracking-widest">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
