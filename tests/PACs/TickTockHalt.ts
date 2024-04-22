import { ActionFn, Location, PragmaticActionClass } from "../../src/PragmaticActionChart";

export class TickTockHalt extends PragmaticActionClass {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): Location {
        return this._location(
            TickTockHalt.initAction,
            () => {   
                return this.tock();
            }
        );
    }

    public tock(): Location {
        return this._location(
            TickTockHalt.tockAction,
            this._term()
        );
    }

}
