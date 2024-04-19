import { Action, Location, PragmaticActionClass } from "../../src/PragmaticActionChart";

export class TickTockStop extends PragmaticActionClass {

    public static initAction: Action = () => { console.log("Tick"); };
    public static tockAction: Action = () => { console.log("Tock"); };

    public init(): Location {
        return this.location(
            TickTockStop.initAction,
            () => {   
                return this.tock();
            }
        );
    }

    public tock(): Location {
        return this.location(
            TickTockStop.tockAction,
            () => {   
                return this.halt();
            }
        );
    }

}
