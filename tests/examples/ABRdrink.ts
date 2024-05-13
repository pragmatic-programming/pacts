import { ABRDrinkTask } from "../PATs/ABRDrinkTask";


var A: boolean = false;
var B: boolean = false;
var R: boolean = false;

const dtABRO = new ABRDrinkTask(
    () => { return A }, 
    () => { return B },
    () => { return R }
);

dtABRO._tick(() => console.log(`A: ${A}, B: ${B}, R: ${R}`));
A = true;
dtABRO._tick(() => console.log(`A: ${A}, B: ${B}, R: ${R}`));
B = true;
dtABRO._tick(() => console.log(`A: ${A}, B: ${B}, R: ${R}`));
R = true; A = false;
dtABRO._tick(() => console.log(`A: ${A}, B: ${B}, R: ${R}`));
dtABRO._tick(() => console.log(`A: ${A}, B: ${B}, R: ${R}`));
// console.log(`A: ${A}, B: ${B}, R: ${R}`);