import { useEffect } from "react";
import { C } from "~/ecs/components";
import { iter } from "~/ecs/utils";
import useECS from "~/store/ecs.store";
import { useWorldStore } from "~/store/world.store";

export function DamageSystem() {
    const removeComponent = useECS(state => state.removeComponent);
    const setComponentValue = useECS(state => state.setComponentValue);
    const addComponent = useECS(state => state.addComponent);
    const query = useECS(state => state.query);
    const entities = useECS(state => state.entities);
    const tick = useWorldStore(state => state.tick);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        iter(query, { include: [C.HEALTH, C.TARGET, C.DAMAGE] }, (damaged) => {
            const e = entities.get(damaged)!;
            setComponentValue(damaged, C.HEALTH, e.get(C.HEALTH) - e.get(C.DAMAGE));
        });

        iter(query, { include: [C.HEALTH, C.TARGET], exclude: [C.DAMAGE] }, (targeted) => {
            addComponent(targeted, C.DAMAGE);
            setComponentValue(targeted, C.DAMAGE, 1);
        })

        iter(query, { include: [C.HEALTH, C.DAMAGE], exclude: [C.TARGET] }, (untargeted) => {
            removeComponent(untargeted, C.DAMAGE);
        })
    }, [tick]);
    
    return null;
}
