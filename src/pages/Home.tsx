import { useState } from "react";
import { GameControls } from "@/components/GameControls";
import { GameTable } from "@/components/GameTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePokerGame } from "@/hooks/usePokerGame";

export default function Home() {
  const {
    player,
    players,
    cards,
    communityCards,
    pot,
    phase,
    handleAction,
    handleEnterGame,
  } = usePokerGame();

  const [inputName, setInputName] = useState("");
  const [inputId, setInputId] = useState("");

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
            <Input
              placeholder="ID do jogador"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            <Button onClick={() => handleEnterGame(inputId, inputName)}>
              Entrar na Sala
            </Button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Poker Game</h1>
          <GameTable
            phase={phase}
            pot={pot}
            communityCards={communityCards}
            players={players}
            currentPlayerId={player.playerId}
            playerCards={cards}
          />
          <div className="mt-6">
            <GameControls onAction={handleAction} />
          </div>
        </>
      )}
    </div>
  );
}
