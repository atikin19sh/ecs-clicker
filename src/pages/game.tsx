import Person from "~/components/game/Person";
import { E } from "~/ecs/entities";
import GameLayout from "./_layout";

export default function GamePage() {
  return <GameLayout>
    <Person title="Player" eid={E.PLAYER}/>
    <Person title="Enemy" eid={E.ENEMY}/>
  </GameLayout>;
}
