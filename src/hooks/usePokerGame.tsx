import { useEffect, useState } from "react";
import { usePlayerStore } from "@/store/usePlayer";
import { Player } from "@/types/player";

export type PokerPhase = "pre_flop" | "flop" | "turn" | "river";

export function usePokerGame() {
  const [cards, setCards] = useState<string[]>([]);
  const [communityCards, setCommunityCards] = useState<string[]>([]);
  const [pot, setPot] = useState(0);
  const [phase, setPhase] = useState<PokerPhase>("pre_flop");

  const player = usePlayerStore((state) => state.player);
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  const players: Player[] = player
    ? [
        { playerId: player.playerId, name: player.name, chips: player.chips },
        { playerId: "456", name: "Sr Batatinha", chips: 800 },
      ]
    : [];

  useEffect(() => {
    if (player) {
      setCards(["AH", "KH"]);
      setCommunityCards(["QH", "JH", "KS"]);
      setPot(200);
      setPhase("flop");
    }
  }, [player]);

  const handleEnterGame = (id: string, name: string) => {
    if (id && name) {
      setPlayer({ playerId: id, name, chips: 1000 });
    }
  };

  const handleAction = (type: "call" | "raise" | "fold") => {
    console.log("Ação enviada:", type);
  };

  return {
    player,
    players,
    cards,
    communityCards,
    pot,
    phase,
    handleAction,
    handleEnterGame,
  };
}

