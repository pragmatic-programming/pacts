import { LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";
import { Await } from "./Await";

export class ABRO extends PragmaticActionChart {

    constructor(readonly _inputA: () => boolean, 
                readonly _inputB: () => boolean, 
                readonly _inputR: () => boolean, 
                readonly _outputO: () => void) {
        super();
    }

    public awaitAB(): LocationFn {
        return this._forkI(
            () => this._if(this._inputR, () => this.awaitAB()),
            () => this.doneAB(),
            new Await(this._inputA),
            new Await(this._inputB),
        );
    }

    public doneAB(): LocationFn {
        return this._location(
            () => { return this._outputO(); },
            this._if(this._inputR, () => this.awaitAB())
        );
    }
}
