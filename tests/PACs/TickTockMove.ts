import { ActionFn, Location, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class TickTockMove extends PragmaticActionChart {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): Location {
        return this._location(
            TickTockMove.initAction,
            () => {   
                return this._defer(this.tock());
            }
        );
    }

    public tock(): Location {
        return this._location(
            TickTockMove.tockAction,
            () => {   
                return this.init();
            }
        );
    }

}
