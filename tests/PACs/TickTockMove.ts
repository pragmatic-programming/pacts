import { Location, PragmaticActionClass } from "../../src/PragmaticActionChart";

export class TickTockMove extends PragmaticActionClass {

    public init(): Location {
        return this.location(
            () => {
                console.log("Tick");
            },
            () => {   
                return this.defer(this.tock());
            }
        );
    }

    public tock(): Location {
        return this.location(
            () => {
                console.log("Tock");
            },
            () => {   
                return this.init();
            }
        );
    }

}

