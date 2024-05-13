import { LocationFn } from "../../src/PragmaticActionChart";
import { PragmaticActionTree } from "../../src/PragmaticActionTree";
import { Failure, Success } from "../../src/UtilityCharts";

export class DrinkTask extends PragmaticActionTree {

    public static output: boolean = true;

    protected root(): LocationFn {
        return this._sequence(
            () => this._pause(), 
            this.Fridge,
            this.Drink);
    }

    protected Fridge = new class extends PragmaticActionTree {
        public fridgeDoorOpen(): LocationFn {
            return this._selector(
                () => this._pause(), 
                new Failure(DrinkTask.output ? "Fridge open?" : ""),
                new Success(DrinkTask.output ? "Open fridge" : ""));
        }
   }
   
   protected Drink = new class extends PragmaticActionTree {
        public doDrink(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                new Success(DrinkTask.output ? "Drink" : ""),
                new Success(DrinkTask.output ? "Close fridge": ""));
        }
   }

}