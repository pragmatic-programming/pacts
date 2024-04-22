import { ActionFn, Location, PragmaticActionClass } from "../../src/PragmaticActionChart";

export class TickTockWaitInstance extends PragmaticActionClass {

    public _counter = 0;
    public _initAction: ActionFn = () => { console.log("Tick"); this._counter++; };
    public _tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): Location {
        return this._location(
            this._initAction,
            () => {   
                if (this._counter>2) return this.tock();
                return this._self()();
            }
        );
    }

    public tock(): Location {
        return this._location(
            this._tockAction,
            this._term()
        );
    }

}
