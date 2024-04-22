import { ActionFn, Location, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class TickTockStop extends PragmaticActionChart {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): Location {
        return this._location(
            TickTockStop.initAction,
            () => {   
                return this.tock();
            }
        );
    }

    public tock(): Location {
        return this._location(
            TickTockStop.tockAction,
            this._pause()
        );
    }

}
