import { useEffect, useState } from "react";
import { usePlayerStore } from "@/store/usePlayer";
import { Player } from "@/types/player";
import { PokerPhase } from "@/types/phase";
import {
  getGameState,
  joinRoom,
  sendAction,
  nextPhase,
  finishGame,
} from "@/services/api";

export function usePokerGame(gameId?: number, roomId?: number) {
  const [cards, setCards] = useState<string[]>([]);
  const [communityCards, setCommunityCards] = useState<string[]>([]);
  const [pot, setPot] = useState(0);
  const [phase, setPhase] = useState<PokerPhase>("pre_flop");
  const [players, setPlayers] = useState<Player[]>([]);

  const player = usePlayerStore((state) => state.player);
  const setPlayer = usePlayerStore((state) => state.setPlayer);

  const fetchGame = async () => {
    if (!gameId || !player) return;

    try {
      const data = await getGameState(gameId, Number(player.id));
      setCards(data.cards);
      setCommunityCards(data.community_cards);
      setPot(data.pot);
      setPhase(data.phase);
      setPlayers(
        data.players.map((p: any) => ({
          id: p.id.toString(), 
          name: p.name,
          chips: p.chips,
        }))
      );
    } catch (err) {
      console.error("Erro ao buscar estado do jogo:", err);
    }
  };

  useEffect(() => {
    if (player && gameId) {
      fetchGame();
    }
  }, [player, gameId]);

  const handleEnterGame = async (playerId: string, name: string) => {
    setPlayer({ id: Number(playerId), name, chips: 1000 }); 

    if (roomId) {
      try {
        await joinRoom(roomId, Number(playerId));
        await fetchGame();
      } catch (err) {
        console.error("Erro ao entrar na sala:", err);
      }
    }
  };

  const handleAction = async (
    type: "call" | "raise" | "fold",
    amount = 0
  ) => {
    if (!player || !gameId) return;

    try {
      await sendAction(gameId, Number(player.id), type, amount);
      await fetchGame();
    } catch (err) {
      console.error("Erro ao enviar ação:", err);
    }
  };

  const handleNextPhase = async () => {
    if (!gameId) return;

    try {
      await nextPhase(gameId);
      await fetchGame();
    } catch (err) {
      console.error("Erro ao avançar fase:", err);
    }
  };

  const handleFinishGame = async () => {
    if (!gameId) return;

    try {
      const result = await finishGame(gameId);
      alert(`Vencedor: ${result.winner.name} com ${result.winner.hand_type}`);
      await fetchGame();
    } catch (err) {
      console.error("Erro ao finalizar o jogo:", err);
    }
  };

  return {
    player,
    players,
    cards,
    communityCards,
    pot,
    phase,
    handleEnterGame,
    handleAction,
    handleNextPhase,
    handleFinishGame,
  };
}

export type { PokerPhase };
