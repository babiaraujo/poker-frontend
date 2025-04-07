import { CardImage } from "@/components/CardImage";
import { Player } from "@/types/player";
import { PlayerSeat } from "@/components/PlayerSeat";

interface GameTableProps {
  communityCards: string[];
  pot: number;
  phase: string;
  players: Player[];
  currentPlayerId: string;
  playerCards: string[];
}

export function GameTable({
  communityCards,
  pot,
  phase,
  players,
  currentPlayerId,
  playerCards,
}: GameTableProps) {
  return (
    <div className="relative w-full h-[600px] bg-green-700 rounded-full shadow-inner p-10 flex items-center justify-center">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-white font-bold mb-2">Pote: {pot} fichas</div>
        <div className="flex gap-2 justify-center">
          {communityCards.map((card) => (
            <CardImage key={card} code={card} />
          ))}
        </div>
        <p className="text-white text-sm mt-2">Fase: {phase}</p>
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <PlayerSeat
          player={players[0]}
          isCurrent={players[0]?.playerId === currentPlayerId}
        />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <PlayerSeat
          player={players[1]}
          isCurrent={players[1]?.playerId === currentPlayerId}
        />
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mt-8 flex gap-2">
        {playerCards.map((card) => (
          <CardImage key={card} code={card} />
        ))}
      </div>
    </div>
  );
}
