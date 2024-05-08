import { ActionFn, LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class ColorPAC extends PragmaticActionChart {

    public currentColor: string = "unknown";

    public select(): LocationFn {
        return this._control(
            () => {   
                const r = Math.random();
                return r < 0.33 ? this.red() : r < 0.66 ? this.green() : this.blue();
            }
        );
    }

    public red(): LocationFn {
        return this._action(
            () => { this.currentColor="red" },
        );
    }

    public green(): LocationFn {
        return this._action(
            () => { this.currentColor="green" },
        );
    }

    public blue(): LocationFn {
        return this._action(
            () => { this.currentColor="blue" },
        );
    }

}
