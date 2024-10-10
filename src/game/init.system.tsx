import { createAllEntities } from "~/ecs/utils";

import { useLayoutEffect } from "react";
import { C } from "~/ecs/components";
import { E } from "~/ecs/entities";
import useECS from "~/store/ecs.store";

export function InitSystem() {
    const eAmount = useECS(state => state.entities.length);
    const { addEntity, addComponent, setComponentValue } = useECS();

    useLayoutEffect(() => {
        console.log("InitSystem useLayoutEffect");
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