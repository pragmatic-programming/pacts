import { LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";
import { Await } from "./Await";

export class ABRO extends PragmaticActionChart {

    constructor(readonly _inputA: () => boolean, 
                readonly _inputB: () => boolean, 
                readonly _inputR: () => boolean, 
                readonly _outputO1: () => void,
                readonly _outputO2: () => void) {
        super();
    }

    public awaitAB1(): LocationFn {
        return this._forkI(
            () => this._if(this._inputR, () => this.awaitAB1()),
            () => () => this.doneAB1(),
            new Await(this._inputA),
            new Await(this._inputB),
        );
    }

    public doneAB1(): LocationFn {
        return this._location(
            () => { return this._outputO1(); },
            () => {
                if (this._inputR()) return this.awaitAB1();
                return this.awaitAB2();
            }
        );
    }

    public awaitAB2(): LocationFn {
        return this._forkI(
            () => this._if(this._inputR, () => this.awaitAB1()),
            () => () => this.doneAB1(),
            new Await(this._inputA),
            new Await(this._inputB),
        );
    }

    public doneAB2(): LocationFn {
        return this._location(
            () => { return this._outputO2(); },
            this._if(this._inputR, () => this.awaitAB1())
        );
    }    
}
