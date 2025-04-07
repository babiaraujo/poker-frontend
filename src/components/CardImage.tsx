import { cn } from "@/lib/utils";

interface CardImageProps {
  code: string;
  className?: string;
}

export function CardImage({ code, className }: CardImageProps) {
  const src = `/cards/${code}.svg`;
  return <img src={src} alt={code} className={cn("h-16", className)} />;
}