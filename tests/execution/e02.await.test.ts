import exp from "constants";
import { ActionFn } from "../../src/PragmaticActionChart";
import { Await } from "../PACs/Await";
import { ABRO } from "../PACs/ABRO";

test("e02await", () => {
    let clock: number = 1;
    let A: boolean = false;

    const aw = new Await(() => { return clock > 2; }, () => { console.log("A"); A = true; });

    expect(clock).toBe(1);
    aw._tick(() => { clock++; });
    expect(A).toBe(false);
    expect(clock).toBe(2);
    aw._tick(() => { clock++; });
    expect(A).toBe(false);
    expect(clock).toBe(3);
    aw._tick(() => { clock++; });
    expect(A).toBe(true);
});

test("e02abro", () => {
    let clock: number = 1;
    let A: boolean = false;
    let B: boolean = false;
    let R: boolean = false;
    let O: boolean = false;

    const aw = new ABRO(
        () => { return A }, 
        () => { return B },
        () => { return R },  
        () => { O = true; });

    expect(clock).toBe(1);
    A = false; B = false; R = false;
    aw._tick(() => { clock++; });
    expect(O).toBe(false);
    expect(clock).toBe(2);
    A = true; B = true; 
    aw._tick(() => { clock++; });
    expect(O).toBe(false); 
});

