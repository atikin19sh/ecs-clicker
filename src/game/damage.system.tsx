import { C } from "~/ecs/components";
import useECS from "~/store/ecs.store";

export function DamageSystem() {
    const { query, addComponent, setComponentValue, removeComponent } = useECS();
    const targetsWithoutDamage = query({ include: [C.TARGET], exclude: [C.DAMAGE] });
    const damagedWithoutTarget = query({ include: [C.DAMAGE], exclude: [C.TARGET] });

    if (targetsWithoutDamage) {
        for (const target of targetsWithoutDamage) {
            addComponent(target, C.DAMAGE);
            setComponentValue(target, C.DAMAGE, { value: 1 });
        }
    }

    if (damagedWithoutTarget) {
        for (const damaged of damagedWithoutTarget) {
            removeComponent(damaged, C.DAMAGE);
        }
    }
    
    return null;
}
