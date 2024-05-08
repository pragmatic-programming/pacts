import { ActionFn, LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class TickTockWait extends PragmaticActionChart {

    public static _counter = 0;
    public static _initAction: ActionFn = () => { console.log("Tick"); this._counter++; };
    public static _tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): LocationFn {
        return this._location(
            TickTockWait._initAction,
            () => {   
                if (TickTockWait._counter>2) return this.tock();
                return this._self()();
            }
        );
    }

    public tock(): LocationFn {
        return this._location(
            TickTockWait._tockAction,
            this._term()
        );
    }

}
