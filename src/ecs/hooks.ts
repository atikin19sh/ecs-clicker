import useECS from "~/store/ecs.store";
import type { C } from "./components";
import { E } from "./entities";
import type { CompValue } from "./types";

export const useEntityComponent = (entityId: number, componentName: C): [CompValue | null, (value: CompValue) => void] => {
    const entity = useECS((state) => state.entities[entityId]);

    if (!entity) {
        console.warn(`Entity ${E[entityId]} must be initialized before using this hook`);
        return [null, () => {}];
    };

    const compValue = entity[componentName];

    if (!compValue) {
        throw new Error(`Component ${componentName} not found for entity ${E[entityId]}`);
    };

    const { setComponentValue } = useECS();

    const setCompValue = (value: CompValue) => {
        setComponentValue(entityId, componentName, value);
    }

    return [compValue, setCompValue];
}