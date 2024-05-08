import { ActionFn, LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";
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

    public awaitAB(): LocationFn {
        // return this._fork(
        //     this._if( this._inputR, this.awaitAB()),
        //     this._transition(this.doneAB()),
        //     new Await(this._inputA, () => { console.log("A"); }),
        //     new Await(this._inputB, () => { console.log("B"); }),
        // );
        return this._control(this._pause());
    }

    public doneAB(): LocationFn {
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
