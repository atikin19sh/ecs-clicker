import type { AnyCompValue } from "./types";

export enum C {
    HEALTH = "HEALTH",
    TARGET = "TARGET",
    DAMAGE = "DAMAGE"
}

export const baseComponents: Record<C, AnyCompValue> = {
    [C.HEALTH]: { value: 0 },
    [C.TARGET]: {},
    [C.DAMAGE]: { value: 0 }
}
