import { createAllEntities } from "~/ecs/utils";

import { useLayoutEffect } from "react";
import { C } from "~/ecs/components";
import { E } from "~/ecs/entities";
import useECS from "~/store/ecs.store";

export function InitSystem() {
    const eAmount = useECS(state => state.entities.length);
    const addEntity = useECS(state => state.addEntity);
    const setComponentValue = useECS(state => state.setComponentValue);
    const addComponent = useECS(state => state.addComponent);

    useLayoutEffect(() => {
        if (!eAmount) {
            createAllEntities(addEntity);

            addComponent(E.PLAYER, C.HEALTH);
            setComponentValue(E.PLAYER, C.HEALTH, { value: 100 });

            addComponent(E.ENEMY, C.HEALTH);
            setComponentValue(E.ENEMY, C.HEALTH, { value: 100 });
        }
    }, [eAmount, addEntity, addComponent, setComponentValue]);

    return null;
}