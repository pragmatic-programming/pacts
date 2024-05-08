import { ActionFn, LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class TickTock extends PragmaticActionChart {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): LocationFn {
        return this._location(
            TickTock.initAction,
            () => {   
                return this.tock();
            }
        );
    }

    public tock(): LocationFn {
        return this._location(
            TickTock.tockAction,
            () => {   
                return this.init();
            }
        );
    }

}
