import { World } from "miniplex";
import createReactAPI from "miniplex-react";

/* Our entity type */
export type Entity = {
  health?: number;
  target?: boolean;
  damage?: number;
}

/* Create a Miniplex world that holds our entities */
const world = new World<Entity>();

/* Create and export React bindings */
export const ECS = createReactAPI(world);

window.ecs = ECS;

ECS.world.add({ health: 100 });
ECS.world.add({ health: 50 });
ECS.world.add({ health: 10 });