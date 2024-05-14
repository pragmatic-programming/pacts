import { LocationFn } from "../../src/PragmaticActionChart";
import { PragmaticActionTree } from "../../src/PragmaticActionTree";
import { Callback, Failure, Success } from "../../src/UtilityCharts";
import { Await } from "../PACs/Await";

export class ABRDrinkTask extends PragmaticActionTree {

    public static FridgeOpenCallback = () => { console.log("Fridge open?"); }
    public static OpenFridgeCallback = () => { console.log("Open fridge"); }
    public static DrinkCallback = () => { console.log("Drink"); }
    public static CloseFridgeCallback = () => { console.log("Close fridge"); }

    constructor(readonly _inputA: () => boolean, 
                readonly _inputB: () => boolean, 
                readonly _inputR: () => boolean) {
        super();
    }

    public awaitAB(): LocationFn {
        return this._forkI(
            () => this._if(this._inputR, () => this.awaitAB()),
            () => this._immediate(() => this.doneAB()),
            new Await(this._inputA),
            new Await(this._inputB),
        );
    }

    public doneAB(): LocationFn {
        return this._sequenceControl(
            () => this._if(this._inputR, () => this.awaitAB()), 
            () => this._pause(),
            () => this._term(),
            this.Fridge(),
            this.Drink());
    }

    protected Fridge(): PragmaticActionTree {
        return new class extends PragmaticActionTree {
            public fridgeDoorOpen(): LocationFn {
                return this._selector(
                    () => this._pause(), 
                    new Callback(ABRDrinkTask.FridgeOpenCallback, "failure"),
                    new Callback(ABRDrinkTask.OpenFridgeCallback, "success"));
            }
        }
   }
   
   protected Drink(): PragmaticActionTree {
        return new class extends PragmaticActionTree {
            public doDrink(): LocationFn {
                return this._sequence(
                    () => this._pause(), 
                    new Callback(ABRDrinkTask.DrinkCallback, "success"),
                    new Callback(ABRDrinkTask.CloseFridgeCallback, "success"));
            }
        }
   }

}