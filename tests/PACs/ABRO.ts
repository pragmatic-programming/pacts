import { ActionFn, Location, PragmaticActionChart } from "../../src/PragmaticActionChart";
import { Await } from "./Await";

export class ABRO extends PragmaticActionChart {

    protected inputA: () => boolean;
    protected inputB: () => boolean;
    protected inputR: () => boolean;
    protected outputO: () => void;

    constructor(inputA: () => boolean, inputB: () => boolean, inputR: () => boolean, outputO: () => void) {
        super();
        this.inputA = inputA;
        this.inputB = inputB;
        this.inputR = inputR;
        this.outputO = outputO;
    }

    public awaitAB(): Location {
        return this._fork(
            this._transition(this.doneAB()),
            new Await(() => { return this.inputA() }, () => { console.log("A"); }),
            new Await(() => { return this.inputB() }, () => { console.log("B"); }),
            // new Await(() => { return this.inputR() }, () => { console.log("R"); this._reset(); console.log("---"); })
        );
    }

    public doneAB(): Location {
        return this._location(
            () => { return this.outputO(); },
            () => { 
                if (this.inputR()) {
                    return this.awaitAB();
                } else {
                    return this._pause()();
                }
            }
        );
    }

}
