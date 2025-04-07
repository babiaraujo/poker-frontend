import { PokerPhase } from "@/hooks/usePokerGame";

interface PotDisplayProps {
  pot: number;
  phase: PokerPhase;
}

export function PotDisplay({ pot, phase }: PotDisplayProps) {
  return (
    <div className="text-center mt-2">
      <p className="text-lg font-bold">Pote: {pot} fichas</p>
      <p className="text-sm text-gray-300">Fase: {phase}</p>
    </div>
  );
}
