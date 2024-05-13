import { LocationFn, PragmaticActionChart } from "./PragmaticActionChart";
import { PragmaticActionTree } from "./PragmaticActionTree";

export class Success extends PragmaticActionChart {

    constructor(readonly _message: string = "") {
        super();
    }

    public root(): LocationFn {
        return this._location(
            this._noAction,
            () => {
                if (this._message !== "") { console.log(this._message); }
                return this._term(PragmaticActionTree.SUCCESS)()
            }
        );
    }

}

export class Failure extends PragmaticActionChart {

    constructor(readonly _message: string = "") {
        super();
    }

    public root(): LocationFn {
        return this._location(
            this._noAction,
            () => {
                if (this._message !== "") { console.log(this._message); }
                return this._term(PragmaticActionTree.FAILURE)()
            }
        );
    }
    
}

export class Print extends PragmaticActionChart {

    constructor(readonly _message: string) {
        super();
    }

    public root(): LocationFn {
        return this._location(
            this._noAction,
            () => { 
                console.log(this._message);
                return this._term()(); 
            }
        );
    }
    
}

export class Callback extends PragmaticActionChart {

    constructor(readonly _callback: () => void, readonly exitcode: string = "") {
        super();
    }

    public root(): LocationFn {
        return this._location(
            this._noAction,
            () => { 
                this._callback();
                return this._term(this.exitcode)(); 
            }
        );
    }
    
}