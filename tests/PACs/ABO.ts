import { LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";
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

    public awaitAB(): LocationFn {
        return this._forkI(
            () => this._pause(),
            () => this.doneAB(),
            new Await(this._inputA, () => { }),
            new Await(this._inputB, () => { }),
        );
        return this._control(this._pause());
    }

    public doneAB(): LocationFn {
        return this._location(
            () => { return this._outputO(); },
            () => { return this._pause()(); }
        );
    }

}
