import { useEffect } from "react";
import { C } from "~/ecs/components";
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
        const damaged = query({ include: [C.HEALTH, C.TARGET, C.DAMAGE] });
        if (damaged) {
            for (const eid of damaged) {
                const e = entities[eid];
                setComponentValue(eid, C.HEALTH, { value: e[C.HEALTH].value - e[C.DAMAGE].value })
            }
        }

        const targetsWithoutDamage = query({ include: [C.HEALTH, C.TARGET], exclude: [C.DAMAGE] });
        if (targetsWithoutDamage) {
            for (const target of targetsWithoutDamage) {
                addComponent(target, C.DAMAGE);
                setComponentValue(target, C.DAMAGE, { value: 1 });
            }
        }

        const damagedWithoutTarget = query({ include: [C.HEALTH, C.DAMAGE], exclude: [C.TARGET] });
        if (damagedWithoutTarget) {
            for (const damaged of damagedWithoutTarget) {
                removeComponent(damaged, C.DAMAGE);
            }
        }
    }, [tick]);
    
    return null;
}
