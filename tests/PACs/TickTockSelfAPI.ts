import { ActionFn, Location, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class TickTockSelfAPI extends PragmaticActionChart {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): Location {
        return this._location(
            TickTockSelfAPI.initAction,
            this._transition(this.tock())
        );
    }

    public tock(): Location {
        return this._location(
            TickTockSelfAPI.tockAction,
            this._self() 
        );
    }

}
