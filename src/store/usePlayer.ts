import { create } from "zustand";
import { Player } from "@/types/player";

interface PlayerStore {
  player: Player | null;
  setPlayer: (player: Player) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  player: null,
  setPlayer: (player) => set({ player }),
}));
