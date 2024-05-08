import { ActionFn, LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class Await extends PragmaticActionChart {

    protected _unlessFnc: () => boolean;
    protected _doneAction: ActionFn;

    constructor(unless: () => boolean, doneAction: ActionFn = () => {}) {
        super();
        this._unlessFnc = unless;
        this._doneAction = doneAction;
    }

    public await(): LocationFn {
        return this._control(
            () => {   
                if (this._unlessFnc()) {
                    return this.done();
                }
                return this._pause()();
            }
        );
    }

    public done(): LocationFn {
        return this._location(this._doneAction, this._term());
    }

}
