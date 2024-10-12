import { DamageSystem } from "./damage.system";
import { InitSystem } from "./init.system";
import { TimeSystem } from "./time.system";

export function GameSystem() {
  return (
    <>
      <TimeSystem />
      <InitSystem />
      <DamageSystem />
    </>
  );
}
