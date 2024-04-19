import { Location, PragmaticActionClass } from "../src/PragmaticActionChart";

export class TickTock extends PragmaticActionClass {

    public init(): Location {
        return this.location(
            () => {
                console.log("Tick");
            },
            () => {   
                return this.tock();
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

