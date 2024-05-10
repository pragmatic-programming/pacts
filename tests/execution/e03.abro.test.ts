import exp from "constants";
import { ActionFn, PragmaticActionChart } from "../../src/PragmaticActionChart";
import { ABRO } from "../PACs/ABRO";

function createABRO(): [PragmaticActionChart, 
                        (a:boolean) => void, 
                        (b:boolean) => void, 
                        (r:boolean) => void, 
                        () => boolean,
                        () => number]{

    var clock: number = 0;
    var A: boolean = false;
    var B: boolean = false;
    var R: boolean = false;
    var O: boolean = false;

    const abro = new ABRO(
        () => { return A }, 
        () => { return B },
        () => { return R },  
        () => { O = true; })
    abro._tickCallback = () => { clock++; }

    return [abro, 
    (a:boolean) => A = a,
    (b:boolean) => B = b,
    (r:boolean) => R = r,
    () => O,
    () => { return clock; }
]
}

test("e03.00.abro.00.ABtrue", () => {
    let [abro, setA, setB, setR, getO, getClock] = createABRO();

    abro._tick();
    expect(getO()).toBe(false);

    setA(true); setB(true); 
    abro._tick();
    expect(getO()).toBe(true); 
});

test("e03.00.abro.01.A_Btrue", () => {
    let [abro, setA, setB, setR, getO, getClock] = createABRO();

    abro._tick();
    expect(getO()).toBe(false);

    setA(true); 
    abro._tick();
    expect(getO()).toBe(false); 

    setB(true); 
    abro._tick();
    expect(getO()).toBe(true); 
});

test("e03.00.abro.02.ABRfalse", () => {
    let [abro, setA, setB, setR, getO, getClock] = createABRO();

    abro._tick();
    expect(getO()).toBe(false);

    setA(true); setB(true); setR(true);
    abro._tick();
    expect(getO()).toBe(false); 

    setA(true); setB(true); setR(false);
    abro._tick();
    expect(getO()).toBe(true); 
});

test("e03.00.abro.02.AR_Bfalse_Atrue", () => {
    let [abro, setA, setB, setR, getO, getClock] = createABRO();

    abro._tick();
    expect(getO()).toBe(false);

    setA(true); setB(false); setR(true);
    abro._tick();
    expect(getO()).toBe(false); 

    setA(false); setB(true); setR(false);
    abro._tick();
    expect(getO()).toBe(false); 

    setA(true); setB(false); setR(false);
    abro._tick();
    expect(getO()).toBe(true); 
});