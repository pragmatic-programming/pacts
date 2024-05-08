import { ActionFn, LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class TickTockSelf extends PragmaticActionChart {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): LocationFn {
        return this._location(
            TickTockSelf.initAction,
            this._transition(this.tock())
        );
    }

    public tock(): LocationFn {
        return this._location(
            TickTockSelf.tockAction,
            () => this.tock() // != this.transition(this.tock())
        );
    }

}
