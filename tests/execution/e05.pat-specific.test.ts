import exp from "constants";
import { ControlFn, LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";
import { PragmaticActionTree } from "../../src/PragmaticActionTree";
import { DrinkTask } from "../PATs/DrinkTask";
import { ABRDrinkTask } from "../PATs/ABRDrinkTask";


test("e05.00.drinkTask.00.true.success", () => {
    DrinkTask.output = false;
    const pat = new DrinkTask();

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.SUCCESS);
});


test("e05.01.ABRDrinkTask.00", () => {
    var A: boolean = false;
    var B: boolean = false;
    var R: boolean = false;

    var testFridgeOpen: boolean = false;
    var testOpenFridge: boolean = false;
    var testDrink: boolean = false;
    var testCloseFridge: boolean = false;

    ABRDrinkTask.CloseFridgeCallback = () => { testCloseFridge = true; console.log("CloseFridgeCallback")};
    ABRDrinkTask.DrinkCallback = () => { testDrink = true };
    ABRDrinkTask.OpenFridgeCallback = () => { testOpenFridge = true };
    ABRDrinkTask.FridgeOpenCallback = () => { testFridgeOpen = true };
    
    const pat = new ABRDrinkTask(
        () => { return A }, 
        () => { return B },
        () => { return R }
    );

    pat._tick();
    expect(pat._terminated()).toBe(false);
    A = true; B = true; R = true;
    pat._tick(); 
    expect(testCloseFridge).toBe(false);
    R = false;
    pat._tick();
    expect(testCloseFridge).toBe(true);
    // expect(pat._terminated()).toBe(true);
    // testCloseFridge = false;
    pat._tick();
    // expect(testCloseFridge).toBe(true);
});
