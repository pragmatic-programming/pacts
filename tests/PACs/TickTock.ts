import { Action, Location, PragmaticActionClass } from "../../src/PragmaticActionChart";

export class TickTock extends PragmaticActionClass {

    public static initAction: Action = () => { console.log("Tick"); };
    public static tockAction: Action = () => { console.log("Tock"); };

    public init(): Location {
        return this.location(
            TickTock.initAction,
            () => {   
                return this.tock();
            }
        );
    }

    public tock(): Location {
        return this.location(
            TickTock.tockAction,
            () => {   
                return this.init();
            }
        );
    }

}
