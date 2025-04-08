import { Player } from "@/types/player";
import { PlayerSeat } from "@/components/PlayerSeat";
import { CardImage } from "@/components/CardImage";

interface PokerTableLayoutProps {
  players: Player[];
  communityCards: string[];
  pot: number;
  phase: string;
  currentPlayerId: string;
  playerCards: string[];
}

export function PokerTableLayout({
  players,
  communityCards,
  pot,
  phase,
  currentPlayerId,
  playerCards,
}: PokerTableLayoutProps) {
  const currentId = Number(currentPlayerId);

  return (
    <div className="relative w-full h-[90vh] bg-green-700 rounded-full border-8 border-green-800">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-white font-bold mb-2">Pote: {pot} fichas</p>
        <div className="flex justify-center gap-2 mb-2">
          {communityCards.map((card) => (
            <CardImage key={card} code={card} />
          ))}
        </div>
        <p className="text-white text-sm">Fase: {phase}</p>
      </div>

      {players.map((player, index) => {
        const positions = [
          "top-10 left-1/2 -translate-x-1/2",
          "bottom-10 left-1/2 -translate-x-1/2",
          "top-1/4 left-10",
          "top-1/4 right-10", 
          "bottom-1/4 left-10", 
          "bottom-1/4 right-10", 
        ];
        const positionClass = positions[index] || "top-1/2 left-1/2";

        const isCurrent = player.id === currentId;

        return (
          <div
            key={player.id}
            className={`absolute ${positionClass} -translate-y-1/2`}
          >
            <PlayerSeat player={player} isCurrent={isCurrent} />
            {isCurrent && (
              <div className="mt-2 flex gap-2 justify-center">
                {playerCards.map((card) => (
                  <CardImage key={card} code={card} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
