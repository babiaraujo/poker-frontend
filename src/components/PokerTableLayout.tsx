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
  return (
    <div className="relative w-full h-[90vh] bg-green-700 rounded-full border-8 border-green-800">
      {/* Community Cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-white font-bold mb-2">Pote: {pot} fichas</p>
        <div className="flex justify-center gap-2 mb-2">
          {communityCards.map((card) => (
            <CardImage key={card} code={card} />
          ))}
        </div>
        <p className="text-white text-sm">Fase: {phase}</p>
      </div>

      {/* Players around the table */}
      {players.map((player, index) => {
        const positions = [
          "top-10 left-1/2 -translate-x-1/2", // top center
          "bottom-10 left-1/2 -translate-x-1/2", // bottom center
          "top-1/4 left-10", // top-left
          "top-1/4 right-10", // top-right
          "bottom-1/4 left-10", // bottom-left
          "bottom-1/4 right-10", // bottom-right
        ];
        const positionClass = positions[index] || "top-1/2 left-1/2";
        return (
          <div
            key={player.playerId}
            className={`absolute ${positionClass} -translate-y-1/2`}
          >
            <PlayerSeat
              player={player}
              isCurrent={player.playerId === currentPlayerId}
            />
            {player.playerId === currentPlayerId && (
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
