import { LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";
import { Await } from "./Await";

export class ABO extends PragmaticActionChart {

    constructor(readonly _inputA: () => boolean, 
                readonly _inputB: () => boolean, 
                readonly _outputO: () => void) {
        super();
    }

    public awaitAB(): LocationFn {
        return this._forkI(
            () => this._pause(),
            () => this.doneAB(),
            new Await(this._inputA),
            new Await(this._inputB),
        );
    }

    public doneAB(): LocationFn {
        return this._action(
            () => { return this._outputO(); }
        );
    }
}