import { ActionFn, Location, PragmaticActionClass } from "../../src/PragmaticActionChart";

export class TickTockSelfAPI extends PragmaticActionClass {

    public static initAction: ActionFn = () => { console.log("Tick"); };
    public static tockAction: ActionFn = () => { console.log("Tock"); };

    public init(): Location {
        return this.location(
            TickTockSelfAPI.initAction,
            this.transition(this.tock())
        );
    }

    public tock(): Location {
        return this.location(
            TickTockSelfAPI.tockAction,
            this.self() 
        );
    }

}
