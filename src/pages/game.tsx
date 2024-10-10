import Person from "~/components/game/Person";
import { ECS } from "~/miniplex/state";
import GameLayout from "./_layout";

const livingCreatures = ECS.world.with("health");

const LivingCreatures = () => (
  <ECS.Entities in={livingCreatures}>
    {(entity) => {
      return <ECS.Entity entity={entity}>
        <Person />
      </ECS.Entity>
    }}
  </ECS.Entities>
)

export default function GamePage() {
  return <GameLayout>
    <LivingCreatures />
  </GameLayout>;
}
