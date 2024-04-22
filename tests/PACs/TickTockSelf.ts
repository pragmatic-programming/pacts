import { ActionFn, Location, PragmaticActionClass } from "../../src/PragmaticActionChart";

export class TickTockSelf extends PragmaticActionClass {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): Location {
        return this._location(
            TickTockSelf.initAction,
            this._transition(this.tock())
        );
    }

    public tock(): Location {
        return this._location(
            TickTockSelf.tockAction,
            () => this.tock() // != this.transition(this.tock())
        );
    }

}