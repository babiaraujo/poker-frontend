import { PokerPhase } from "@/types/phase";
import { Player } from "@/types/player";

export type GameState = {
  cards: string[];
  communityCards: string[];
  pot: number;
  phase: PokerPhase;
  players: Player[];
};