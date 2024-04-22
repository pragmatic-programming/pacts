import { ActionFn, Location, PragmaticActionChart } from "../../src/PragmaticActionChart";

export class ColorPAC extends PragmaticActionChart {

    public currentColor: string = "unknown";

    public select(): Location {
        return this._control(
            () => {   
                const r = Math.random();
                return r < 0.33 ? this.red() : r < 0.66 ? this.green() : this.blue();
            }
        );
    }

    public red(): Location {
        return this._action(
            () => { this.currentColor="red" },
        );
    }

    public green(): Location {
        return this._action(
            () => { this.currentColor="green" },
        );
    }

    public blue(): Location {
        return this._action(
            () => { this.currentColor="blue" },
        );
    }

}
