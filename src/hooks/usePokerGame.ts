import { useState } from "react";
import { usePokerSocket } from "./usePokerSocket";
import { usePlayerStore } from "@/store/usePlayer";
import { PokerPhase } from "@/types/phase";
import { Player } from "@/types/player";
import cable from "@/lib/cable";

export function usePokerGame() {
  const [cards, setCards] = useState<string[]>([]);
  const [communityCards, setCommunityCards] = useState<string[]>([]);
  const [pot, setPot] = useState(0);
  const [phase, setPhase] = useState<PokerPhase>("pre_flop");
  const [players, setPlayers] = useState<Player[]>([]);

  const player = usePlayerStore((state) => state.player);
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  // Inicia o socket apenas se o jogador existir
  if (player?.name) {
    usePokerSocket({
      onStateUpdate: (data) => {
        setCards(data.cards);
        setCommunityCards(data.communityCards);
        setPot(data.pot);
        setPhase(data.phase);
        setPlayers(data.players);
      },
      playerId: player.playerId,
      name: player.name,
    });
  }

  const handleEnterGame = (id: string, name: string) => {
    if (id && name) {
      setPlayer({ playerId: id, name, chips: 1000 });
    }
  };

  const handleAction = (type: "call" | "raise" | "fold") => {
    const subscription = cable.subscriptions.subscriptions[0];
    subscription.send({
      type: "player_action",
      action: type,
      playerId: player?.playerId,
    });
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

export type { PokerPhase };

