import type { C } from "./components";

export type World = {
    entities: Array<Record<C, AnyCompValue> | Record<string, never>>;
    addEntity: (entityId: number) => void;
    removeEntity: (entityId: number) => void;
    addComponent: (entityId: number, componentName: C) => void;
    setComponentValue: (entityId: number, componentName: C, componentValue: CompValue) => void;
    removeComponent: (entityId: number, componentName: C) => void;
    hasComponent: (entityId: number, componentName: C) => boolean;
    query: ({include, exclude}: { include?: C[], exclude?: C[]}) => number[];
}

export type CompMarker = Record<string, never>;
export type CompValue = Record<string, number>;
export type AnyCompValue = CompMarker | CompValue;