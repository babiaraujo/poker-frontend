import { Button } from "@/components/ui/button";

interface GameControlsProps {
  onAction: (type: "call" | "raise" | "fold") => void;
}

export function GameControls({ onAction }: GameControlsProps) {
  return (
    <div className="flex gap-2">
      <Button onClick={() => onAction("call")} variant="secondary">
        Call
      </Button>
      <Button onClick={() => onAction("raise")}>Raise</Button>
      <Button onClick={() => onAction("fold")} variant="destructive">
        Fold
      </Button>
    </div>
  );
}