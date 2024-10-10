import { C } from "~/ecs/components";
import useECS from "~/store/ecs.store";
import { Button } from "../ui/button";

type Props = {
    title: string;
    eid: number;
}

function Person({title, eid}: Props) {
    const entity = useECS(state => state.entities[eid]);

    const addComponent = useECS(state => state.addComponent);
    const removeComponent = useECS(state => state.removeComponent);
    
    console.log(entity)

    const setTarget = () => {
        addComponent(eid, C.TARGET);
    }

    const unsetTarget = () => {
        removeComponent(eid, C.TARGET);
    }
    
    if (!entity) return null;

    return <div>
        <div>
            {title}
            {/* HP:{entity[C.HEALTH] && entity[C.HEALTH].value ? entity[C.HEALTH].value : 0} */}
            <Button onClick={setTarget} disabled={C.TARGET in entity}>Set as target</Button>
            <Button onClick={unsetTarget} disabled={!(C.TARGET in entity)}>Unset target</Button>
        </div>
    </div>
}

export default Person;