import { Player } from "@/types/player";

interface PlayerSeatProps {
  player: Player;
  isCurrent: boolean;
}

export function PlayerSeat({ player, isCurrent }: PlayerSeatProps) {
  return (
    <div
      className={`p-3 rounded-xl border-2 text-center min-w-[120px] ${
        isCurrent ? "bg-yellow-300 text-black border-yellow-500" : "bg-gray-800 border-gray-600"
      }`}
    >
      <p className="font-bold">{player.name}</p>
      <p className="text-sm">{player.chips} fichas</p>
    </div>
  );
}
