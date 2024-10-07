import { useWorldStore } from "~/store/world.store";

export function TopBar() {
  const day = useWorldStore((state) => state.day);
  const year = useWorldStore((state) => state.year);

  return (
    <div className="flex justify-between bg-slate-800 px-4 py-1">
      <div>Planet</div>
      <div className="flex gap-2">
        <span>Day {day}</span>
        <span>Year {year}</span>
      </div>
    </div>
  );
}
