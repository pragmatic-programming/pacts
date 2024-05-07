import { ActionFn, Location, PragmaticActionChart } from "../../src/PragmaticActionChart";
import { Await } from "./Await";

export class ABRO extends PragmaticActionChart {

    protected _inputA: () => boolean;
    protected _inputB: () => boolean;
    protected _inputR: () => boolean;
    protected _outputO: () => void;

    constructor(inputA: () => boolean, inputB: () => boolean, inputR: () => boolean, outputO: () => void) {
        super();
        this._inputA = inputA;
        this._inputB = inputB;
        this._inputR = inputR;
        this._outputO = outputO;
    }

    public awaitAB(): Location {
        return this._fork(
            this._transition(this.doneAB()),
            new Await(this._inputA, () => { console.log("A"); }),
            new Await(this._inputB, () => { console.log("B"); }),
            // new Await(() => { return this.inputR() }, () => { console.log("R"); this._reset(); console.log("---"); })
        );
    }

    public doneAB(): Location {
        return this._location(
            () => { return this._outputO(); },
            () => { 
                if (this._inputR()) {
                    return this.awaitAB();
                } else {
                    return this._pause()();
                }
            }
        );
    }

}
