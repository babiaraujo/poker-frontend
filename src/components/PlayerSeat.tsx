import { Player } from "@/types/player";
import { cn } from "@/lib/utils";

interface PlayerSeatProps {
  player: Player;
  isCurrent: boolean;
}

export function PlayerSeat({ player, isCurrent }: PlayerSeatProps) {
  return (
    <div
      className={cn(
        "bg-white text-black px-4 py-2 rounded-xl shadow-lg text-center border-2",
        isCurrent ? "border-yellow-400 font-bold" : "border-gray-300"
      )}
    >
      <p className="text-sm">{player.name}</p>
      <p className="text-xs text-gray-700">{player.chips} fichas</p>
      {isCurrent && <p className="text-xs text-yellow-600 mt-1">Você</p>}
    </div>
  );
}
