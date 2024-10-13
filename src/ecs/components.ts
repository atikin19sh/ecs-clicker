export enum C {
    HEALTH = "HEALTH",
    TARGET = "TARGET",
    DAMAGE = "DAMAGE"
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const comps = new Map<C, any>([
    [C.HEALTH, 0],
    [C.TARGET, 0],
    [C.DAMAGE, 0]
])
