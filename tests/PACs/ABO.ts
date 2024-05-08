import { ActionFn, Location, PragmaticActionChart } from "../../src/PragmaticActionChart";
import { Await } from "./Await";

export class ABO extends PragmaticActionChart {

    protected _inputA: () => boolean;
    protected _inputB: () => boolean;
    protected _outputO: () => void;

    constructor(inputA: () => boolean, inputB: () => boolean, outputO: () => void) {
        super();
        this._inputA = inputA;
        this._inputB = inputB;
        this._outputO = outputO;
    }

    public awaitAB(): Location {
        return this._fork(
            this._pause(),
            this._transition(this.doneAB()),
            new Await(this._inputA, () => { console.log("A"); }),
            new Await(this._inputB, () => { console.log("B"); }),
        );
    }

    public doneAB(): Location {
        return this._location(
            () => { return this._outputO(); },
            () => { return this._pause()(); }
        );
    }

}
