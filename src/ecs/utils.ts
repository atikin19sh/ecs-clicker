import { TICK_MS } from "~/game/const";
import type { C } from "./components";
import { E } from "./entities";

export const createAllEntities = (addEntityFn: (entityId: E) => void) => {
    const entitesAmount = Object.keys(E).length / 2;

    for (let i = 0; i < entitesAmount; i++) {
        addEntityFn(i);
    }
}

export function iter(
    queryFn: (queryValues: { include: C[], exclude?: C[]}) => E[],
    queryValues: { include: C[], exclude?: C[]},
    callback: (eid: E) => void
) {
    const queriedEids = queryFn(queryValues);
    
    if (queriedEids) {
        for (const eid of queriedEids) {
            callback(eid);
        }
    }
}

export function perTick(value: number): number {
    return value * TICK_MS / 1000;
}