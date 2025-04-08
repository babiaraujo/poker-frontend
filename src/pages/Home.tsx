import { useEffect, useState } from "react";
import { GameControls } from "@/components/GameControls";
import { GameTable } from "@/components/GameTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePokerGame } from "@/hooks/usePokerGame";
import {
  createPlayer,
  getPlayer,
  getRooms,
  joinRoom,
  startGame,
} from "@/services/api";
import { PlayerHistory } from "@/components/PlayerHistory";

export default function Home() {
  const [inputName, setInputName] = useState("");
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [gameId, setGameId] = useState<number | null>(null);

  const {
    player,
    players,
    cards,
    communityCards,
    pot,
    phase,
    handleAction,
    handleEnterGame,
    handleNextPhase,
    handleFinishGame,
  } = usePokerGame(gameId || 0, roomId || 0);

  useEffect(() => {
    if (playerId) {
      getRooms().then(setRooms);
    }
  }, [playerId]);

  const handleCreateOrFetchPlayer = async () => {
    try {
      if (!isNaN(Number(inputName))) {
        const fetched = await getPlayer(Number(inputName));
        setPlayerId(fetched.id);
      } else {
        const created = await createPlayer(inputName);
        setPlayerId(created.id);
      }
    } catch (err) {
      console.error("Erro ao buscar ou criar jogador:", err);
    }
  };

  const handleJoinRoom = async (roomId: number) => {
    if (!playerId) return;
    await joinRoom(roomId, playerId);
    const started = await startGame(roomId);
    setGameId(started.id); 
    setRoomId(roomId);
    handleEnterGame(playerId.toString(), inputName);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {!player ? (
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Entrar no Jogo</h1>
          <div className="flex justify-center gap-2">
            <Input
              placeholder="Nome do jogador"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <Button onClick={handleCreateOrFetchPlayer}>
              Criar / Buscar Jogador
            </Button>
          </div>
          {rooms.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="font-semibold">Salas Disponíveis:</p>
              {rooms.map((room) => (
                <Button
                  key={room.id}
                  variant="outline"
                  onClick={() => handleJoinRoom(room.id)}
                >
                  Entrar na Sala: {room.name || room.id}
                </Button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Poker Game</h1>
          <GameTable
            phase={phase}
            pot={pot}
            communityCards={communityCards}
            players={players}
            currentPlayerId={player.id}
            playerCards={cards}
          />
          <div className="mt-6">
            <GameControls onAction={handleAction} />
          </div>
          {playerId && <PlayerHistory id={playerId} />}
          <div className="mt-4">
            <Button variant="outline" onClick={handleNextPhase}>
              Próxima Fase
            </Button>
          </div>
          <div className="mt-2">
            <Button variant="destructive" onClick={handleFinishGame}>
              Finalizar Jogo
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
