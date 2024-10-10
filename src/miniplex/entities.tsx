import { ECS } from "./state";

const Player = () => (
    <ECS.Entity>
      <ECS.Component name="health" data={100} />
    </ECS.Entity>
);

const Enemy = () => (
    <ECS.Entity>
      <ECS.Component name="health" data={10} />
    </ECS.Entity>
);

export { Player, Enemy };