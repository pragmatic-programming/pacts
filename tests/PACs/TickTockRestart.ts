import { ActionFn, Location, LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class TickTockRestart extends PragmaticActionChart {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): Location {
        return this._location(
            TickTockRestart.initAction,
            this._transition(this.tock())
        );
    }

    public tock(): Location {
        return this._location(
            TickTockRestart.tockAction,
            this._root()
        );
    }

}
