import { create } from "zustand";

interface SettingsState {
  speed: number;
  paused: boolean;

  setSpeed: (speed: number) => void;
  setPaused: (paused: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  speed: 1,
  paused: false,

  setSpeed: (speed: number) => set({ speed }),
  setPaused: (paused: boolean) => set({ paused }),
}));
