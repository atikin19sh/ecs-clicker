import { type C, baseComponents } from "./components";
import { E } from "./entities";

export const createAllEntities = (addEntityFn: (entityId: number) => void) => {
    const entitesAmount = Object.keys(E).length / 2;

    for (let i = 0; i < entitesAmount; i++) {
        addEntityFn(i);
    }
}

export const buildComponent = (name: C) => {
    return {...baseComponents[name]};
}