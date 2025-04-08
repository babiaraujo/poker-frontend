import { CardImage } from "@/components/CardImage";
import { PlayerSeat } from "@/components/PlayerSeat";
import { PhaseProgress } from "@/components/PhaseProgress";
import { PotDisplay } from "@/components/PotDisplay";
import { Player } from "@/types/player";
import { PokerPhase } from "@/hooks/usePokerGame";

interface GameTableProps {
  pot: number;
  phase: PokerPhase;
  communityCards: string[];
  players: Player[];
  currentPlayerId: number;
  playerCards: string[];
}

export function GameTable({
  pot,
  phase,
  communityCards,
  players,
  currentPlayerId,
  playerCards,
}: GameTableProps) {
  const currentId = String(currentPlayerId);

  return (
    <div className="relative w-full h-[600px] bg-green-700 rounded-full border-[12px] border-green-800 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <PotDisplay pot={pot} phase={phase} />
        <div className="flex gap-2 my-2">
          {communityCards.map((card) => (
            <CardImage key={card} code={card} />
          ))}
        </div>
        <PhaseProgress currentPhase={phase} />
      </div>

      {players.map((player, index) => {
        const isCurrent = String(player.id) === currentId;

        const positions = [
          "top-4 left-1/2 -translate-x-1/2",
          "bottom-4 left-1/2 -translate-x-1/2", 
          "top-1/4 left-6", 
          "top-1/4 right-6", 
          "bottom-1/4 left-6",
          "bottom-1/4 right-6", 
        ];
        const positionClass = positions[index % positions.length];

        return (
          <div
            key={player.id}
            className={`absolute ${positionClass} flex flex-col items-center`}
          >
            {isCurrent && (
              <div className="flex gap-2 mb-1">
                {playerCards.map((card) => (
                  <CardImage key={card} code={card} />
                ))}
              </div>
            )}
            <PlayerSeat player={player} isCurrent={isCurrent} />
          </div>
        );
      })}
    </div>
  );
}
