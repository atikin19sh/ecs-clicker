import { C } from "~/ecs/components";
import useECS from "~/store/ecs.store";
import { Button } from "../ui/button";

type Props = {
    title: string;
    eid: number;
}

function Person({title, eid}: Props) {
    const entity = useECS(state => state.entities.get(eid));

    const addComponent = useECS(state => state.addComponent);
    const removeComponent = useECS(state => state.removeComponent);

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
            HP:{entity.has(C.HEALTH) ? entity.get(C.HEALTH).toFixed(0) : 0}
            <Button onClick={setTarget} disabled={entity.has(C.TARGET)}>Set as target</Button>
            <Button onClick={unsetTarget} disabled={!(entity.has(C.TARGET))}>Unset target</Button>
            {entity.has(C.DAMAGE) && <div> -{entity.get(C.DAMAGE)} HP/s</div>}
        </div>
    </div>
}

export default Person;