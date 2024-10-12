import { E } from "./entities";

export const createAllEntities = (addEntityFn: (entityId: E) => void) => {
    const entitesAmount = Object.keys(E).length / 2;

    for (let i = 0; i < entitesAmount; i++) {
        addEntityFn(i);
    }
}
