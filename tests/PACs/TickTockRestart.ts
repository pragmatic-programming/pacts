import { ActionFn, Location, LocationFn, PragmaticActionClass } from "../../src/PragmaticActionChart";

export class TickTockRestart extends PragmaticActionClass {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): Location {
        return this.location(
            TickTockRestart.initAction,
            this.transition(this.tock())
        );
    }

    public tock(): Location {
        return this.location(
            TickTockRestart.tockAction,
            this.root()
        );
    }

}
