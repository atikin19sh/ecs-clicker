import type { C } from "./components";
import type { E } from "./entities";

export type World = {
    entities: Map<E, Entity>;
    addEntity: (entityId: E) => void;
    removeEntity: (entityId: E) => void;
    addComponent: (entityId: E, componentName: C) => void;
    setComponentValue: (entityId: E, componentName: C, componentValue: Entity[C]) => void;
    removeComponent: (entityId: E, componentName: C) => void;
    hasComponent: (entityId: E, componentName: C) => boolean;
    query: ({include, exclude}: { include?: C[], exclude?: C[]}) => number[];
}

export type Entity = {
    [C.HEALTH]?: number;
    [C.TARGET]?: boolean;
    [C.DAMAGE]?: number;
}
