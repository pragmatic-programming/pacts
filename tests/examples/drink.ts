import { DrinkTask } from "../PATs/DrinkTask";
import { env } from "./env";

const drinkTask = new DrinkTask();

drinkTask._tick();
console.log(drinkTask._terminated());
drinkTask._tick();
console.log(drinkTask._status);