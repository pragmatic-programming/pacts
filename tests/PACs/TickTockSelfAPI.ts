import { ActionFn, LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class TickTockSelfAPI extends PragmaticActionChart {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): LocationFn {
        return this._location(
            TickTockSelfAPI.initAction,
            this._transition(this.tock())
        );
    }

    public tock(): LocationFn {
        return this._location(
            TickTockSelfAPI.tockAction,
            this._self() 
        );
    }

}
