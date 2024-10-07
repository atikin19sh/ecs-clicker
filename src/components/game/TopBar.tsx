import { PauseIcon, PlayIcon } from "@heroicons/react/16/solid";
import { useSettingsStore } from "~/store/settings.store";
import { useWorldStore } from "~/store/world.store";
import { Toggle } from "../ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export function TopBar() {
  const day = useWorldStore((state) => state.day);
  const year = useWorldStore((state) => state.year);

  const paused = useSettingsStore((state) => state.paused);
  const setPaused = useSettingsStore((state) => state.setPaused);
  const speed = useSettingsStore((state) => state.speed);
  const setSpeed = useSettingsStore((state) => state.setSpeed);

  return (
    <div className="flex justify-between bg-slate-900 px-4 py-1">
      <div>Planet</div>
      <div className="flex gap-3">
        <span>Day {day}</span>
        <span>Year {year}</span>
        <Toggle className="size-6 p-1" pressed={paused} onPressedChange={setPaused}>
          {paused ? <PauseIcon /> : <PlayIcon />}
        </Toggle>
        <ToggleGroup type="single" value={speed.toString()} onValueChange={(v) => setSpeed(Number(v))}>
          {[1, 2, 4].map((speed) => (
            <ToggleGroupItem key={speed} value={speed.toString()} size="sm" className="size-6 p-1 data-[state=off]:opacity-75">
              x{speed}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}
