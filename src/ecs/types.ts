import type { C } from "./components";
import type { E } from "./entities";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Entity = Map<C, any>;

export type World = {
    entities: Map<E, Entity>;
    addEntity: (entityId: E) => void;
    removeEntity: (entityId: E) => void;
    addComponent: (entityId: E, componentName: C) => void;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    setComponentValue: (entityId: E, componentName: C, componentValue: any) => void;
    removeComponent: (entityId: E, componentName: C) => void;
    hasComponent: (entityId: E, componentName: C) => boolean;
    query: ({include, exclude}: { include?: C[], exclude?: C[]}) => E[];
}
