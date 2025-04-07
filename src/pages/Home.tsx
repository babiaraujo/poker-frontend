import { useEffect, useState } from "react";
import { GameControls } from "@/components/GameControls";
import { GameTable } from "@/components/GameTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/usePlayer";
import { Player } from "@/types/player";

export default function Home() {
  const [cards, setCards] = useState<string[]>([]);
  const [communityCards, setCommunityCards] = useState<string[]>([]);
  const [pot, setPot] = useState(0);
  const [phase, setPhase] = useState("pre_flop");

  const [players, setPlayers] = useState<Player[]>([
    {
        playerId: "123", name: "Babi", chips: 1000
    },
    {
        playerId: "456", name: "Nat", chips: 800
    },
  ]);
  

  const player = usePlayerStore((state) => state.player);
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  const [inputName, setInputName] = useState("");
  const [inputId, setInputId] = useState("");

  useEffect(() => {
    if (player) {
      setCards(["AH", "KH"]);
      setCommunityCards(["QH", "JH", "KS"]);
      setPot(200);
      setPhase("flop");
    }
  }, [player]);

  const handleEnterGame = () => {
    if (inputId && inputName) {
      setPlayer({ playerId: inputId, name: inputName, chips: 1000 });
    }
  };

  const handleAction = (type: "call" | "raise" | "fold") => {
    console.log("Ação enviada:", type);
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
            <Input
              placeholder="ID do jogador"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            <Button onClick={handleEnterGame}>Entrar na Sala</Button>
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
