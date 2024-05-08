import { ActionFn, LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class TickTockMove extends PragmaticActionChart {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): LocationFn {
        return this._location(
            TickTockMove.initAction,
            () => {   
                return this._defer(this.tock());
            }
        );
    }

    public tock(): LocationFn {
        return this._location(
            TickTockMove.tockAction,
            () => {   
                return this.init();
            }
        );
    }

}
