import { PokerPhase } from "@/hooks/usePokerGame";

interface PhaseProgressProps {
  currentPhase: PokerPhase;
}

const phases: PokerPhase[] = ["pre_flop", "flop", "turn", "river"];

const phaseLabels: Record<PokerPhase, string> = {
  pre_flop: "Pré-Flop",
  flop: "Flop",
  turn: "Turn",
  river: "River",
};

export function PhaseProgress({ currentPhase }: PhaseProgressProps) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      {phases.map((phase) => (
        <div
          key={phase}
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            phase === currentPhase
              ? "bg-yellow-500 text-black"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {phaseLabels[phase]}
        </div>
      ))}
    </div>
  );
}
