import { useEffect, useState } from "react";
import { ECS } from "~/miniplex/state";
import { Button } from "../ui/button";

function Person() {
    console.log("Person")
    const entity = ECS.useCurrentEntity();
    const [_, forceUpdate] = useState(0);
    // const [hp, setHp] = useState(entity.health ?? 0);
    console.log("Entity:", entity);

    const decreaseHP = () => {
        // if (entity.health) ECS.world.update(entity, "health", entity.health - 1)
        if (entity.health) entity.health--
    }

    useEffect(() => {
        forceUpdate(1);
    }, [entity.health])

    return <div>
        <div>1
            Player HP: {entity.health ?? 0}
            <Button onClick={decreaseHP}> -1 HP </Button>
            {/* <Button onClick={setTarget} disabled={C.TARGET in entity}>Set as target</Button>
            <Button onClick={unsetTarget} disabled={!(C.TARGET in entity)}>Unset target</Button>
            {entity[C.DAMAGE] && <div> -{entity[C.DAMAGE].value} HP/s</div>} */}
        </div>
    </div>
}

export default Person;