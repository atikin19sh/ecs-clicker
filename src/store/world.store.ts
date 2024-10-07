import { create } from "zustand";
import { DAY_TICKS, YEAR_DAYS } from "~/game/const";

interface WorldState {
  tick: number;
  day: number;
  year: number;

  onTick: () => void;
}

export const useWorldStore = create<WorldState>((set) => ({
  tick: 0,
  day: 1,
  year: 1,

  onTick: () => {
    set((state) => {
      let tick = state.tick + 1;
      let day = state.day;
      let year = state.year;

      if (tick >= DAY_TICKS) {
        tick = 0;
        day += 1;
      }
      if (day > YEAR_DAYS) {
        day = 1;
        year += 1;
      }

      return { tick, day, year };
    });
  },
}));
