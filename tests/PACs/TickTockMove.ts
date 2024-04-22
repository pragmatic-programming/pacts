import { ActionFn, Location, PragmaticActionClass } from "../../src/PragmaticActionChart";

export class TickTockMove extends PragmaticActionClass {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): Location {
        return this.location(
            TickTockMove.initAction,
            () => {   
                return this.defer(this.tock());
            }
        );
    }

    public tock(): Location {
        return this.location(
            TickTockMove.tockAction,
            () => {   
                return this.init();
            }
        );
    }

}
