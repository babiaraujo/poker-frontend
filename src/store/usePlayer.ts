import { create } from "zustand";

type Player = {
  playerId: string;
  name: string;
  chips: number;
};

type PlayerStore = {
  player: Player | null;
  setPlayer: (player: Player) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  player: null,
  setPlayer: (player) => set({ player }),
}));
