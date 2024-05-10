import exp from "constants";
import { ActionFn } from "../../src/PragmaticActionChart";
import { Await } from "../PACs/Await";
import { ABRO } from "../PACs/ABRO";
import { ABO } from "../PACs/ABO";

test("e02.00.await", () => {
    let clock: number = 0;
    let A: boolean = false;

    const aw = new Await(() => { return clock > 2; }, () => { A = true; });

    expect(clock).toBe(0);
    aw._tick(() => { clock++; });
    expect(A).toBe(false);
    expect(clock).toBe(1);
    aw._tick(() => { clock++; });
    expect(A).toBe(false);
    expect(clock).toBe(2);
    aw._tick(() => { clock++; });
    expect(A).toBe(true);
});

test("e02.01.abo", () => {
    let A: boolean = false;
    let B: boolean = false;
    let O: boolean = false;

    const aw = new ABO(
        () => { return A }, 
        () => { return B },
        () => { O = true; });

    A = false; B = false;
    aw._tick();
    expect(O).toBe(false);
    A = true; B = true; 
    aw._tick();
    expect(O).toBe(true); 
    aw._tick();
    expect(O).toBe(true); 
});
