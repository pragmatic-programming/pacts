import { ActionFn, Location, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class Await extends PragmaticActionChart {

    protected unlessFnc: () => boolean;
    protected doneAction: ActionFn;

    constructor(unless: () => boolean, doneAction: ActionFn = () => {}) {
        super();
        this.unlessFnc = unless;
        this.doneAction = doneAction;
    }

    public await(): Location {
        return this._control(
            () => {   
                if (this.unlessFnc()) {
                    return this.done();
                }
                return this._pause()();
            }
        );
    }

    public done(): Location {
        return this._location(this.doneAction, this._term());
    }

}
