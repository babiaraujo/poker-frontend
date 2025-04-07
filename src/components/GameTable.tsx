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
    currentPlayerId: string;
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
    return (
        <div className="relative w-full h-[600px] bg-green-700 rounded-full border-8 border-green-800 flex items-center justify-center">
            {/* Jogadores (superior) */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-4">
                {players
                    .filter((p) => p.playerId !== currentPlayerId)
                    .map((player) => (
                        <PlayerSeat key={player.playerId} player={player} isCurrent={false} />
                    ))}
            </div>

            {/* Centro da mesa */}
            <div className="flex flex-col items-center">
                <PotDisplay pot={pot} phase={phase} />
                <div className="flex gap-2 my-2">
                    {communityCards.map((card) => (
                        <CardImage key={card} code={card} />
                    ))}
                </div>
                <PhaseProgress currentPhase={phase} />
            </div>

            {/* Jogador atual (inferior) */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
                <div className="flex gap-2">
                    {playerCards.map((card) => (
                        <CardImage key={card} code={card} />
                    ))}
                </div>
                {players.find((p) => p.playerId === currentPlayerId) ? (
                    <PlayerSeat
                        player={players.find((p) => p.playerId === currentPlayerId)!}
                        isCurrent={true}
                    />
                ) : (
                    <div className="text-white">Jogador não encontrado</div>
                )}

            </div>
        </div>
    );
}
