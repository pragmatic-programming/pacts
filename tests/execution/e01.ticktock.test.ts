import exp from "constants";
import { ActionFn } from "../../src/PragmaticActionChart";
import { TickTock } from "../PACs/TickTock";
import { TickTockMove } from "../PACs/TickTockMove";
import { TickTockHalt } from "../PACs/TickTockHalt";
import { TickTockStop } from "../PACs/TickTockStop";
import { TickTockSelf } from "../PACs/TickTockSelf";
import { TickTockSelfAPI } from "../PACs/TickTockSelfAPI";
import { TickTockWait } from "../PACs/TickTockWait";
import { TickTockWaitInstance } from "../PACs/TickTockWaitInstance";

test("e01.00.ticktock", () => {
    let clock: number = 0;
    let tick: ActionFn = () => { clock++; };
    let tock: ActionFn = () => { clock--; };
    TickTock.initAction = tick;
    TickTock.tockAction = tock;

    const tickTock = new TickTock();

    tickTock._tick();
    expect(clock).toBe(1);
    tickTock._tick();
    expect(clock).toBe(0);
    tickTock._tick();
    expect(clock).toBe(1);
    tickTock._tick();
    expect(clock).toBe(0);
});

test("e01.01.ticktockmove", () => {
    let clock: number = 0;
    let tick: ActionFn = () => { clock++; };
    let tock: ActionFn = () => { clock--; };
    TickTockMove.initAction = tick;
    TickTockMove.tockAction = tock;

    const tickTock = new TickTockMove();

    tickTock._tick();
    expect(clock).toBe(1);
    tickTock._tick();
    expect(clock).toBe(2);
    tickTock._tick();
    expect(clock).toBe(3);
    tickTock._tick();
    expect(clock).toBe(4);
});

test("e01.02.ticktockhalt", () => {
    let clock: number = 0;
    let tick: ActionFn = () => { clock++; };
    let tock: ActionFn = () => { clock--; };
    TickTockHalt.initAction = tick;
    TickTockHalt.tockAction = tock;

    const tickTock = new TickTockHalt();

    tickTock._tick();
    expect(clock).toBe(1);
    tickTock._tick();
    expect(clock).toBe(0);
    tickTock._tick();
    expect(clock).toBe(0);
    tickTock._tick();
    expect(clock).toBe(0);
    
    expect(tickTock._tick()).toBe(false);
});

test("e01.03.ticktockstop", () => {
    let clock: number = 0;
    let tick: ActionFn = () => { clock++; };
    let tock: ActionFn = () => { clock--; };
    TickTockStop.initAction = tick;
    TickTockStop.tockAction = tock;

    const tickTock = new TickTockStop();

    tickTock._tick();
    expect(clock).toBe(1);
    tickTock._tick();
    expect(clock).toBe(0);
    tickTock._tick();
    expect(clock).toBe(0);
    tickTock._tick();
    expect(clock).toBe(0);
    
    expect(tickTock._tick()).toBe(true);
});

test("e01.04.ticktockself", () => {
    let clock: number = 0;
    let tick: ActionFn = () => { clock++; };
    let tock: ActionFn = () => { clock--; };
    TickTockSelf.initAction = tick;
    TickTockSelf.tockAction = tock;

    const tickTock = new TickTockSelf();

    tickTock._tick();
    expect(clock).toBe(1);
    tickTock._tick();
    expect(clock).toBe(0);
    tickTock._tick();
    expect(clock).toBe(-1);
    tickTock._tick();
    expect(clock).toBe(-2);
});

test("e01.05.ticktockselfapi", () => {
    let clock: number = 0;
    let tick: ActionFn = () => { clock++; };
    let tock: ActionFn = () => { clock--; };
    TickTockSelfAPI.initAction = tick;
    TickTockSelfAPI.tockAction = tock;

    const tickTock = new TickTockSelfAPI();

    tickTock._tick();
    expect(clock).toBe(1);
    tickTock._tick();
    expect(clock).toBe(0);
    tickTock._tick();
    expect(clock).toBe(-1);
    tickTock._tick();
    expect(clock).toBe(-2);
});

test("e01.06.ticktockwait", () => {
    let tick: ActionFn = () => { TickTockWait._counter++;  };
    let tock: ActionFn = () => { TickTockWait._counter--; };
    TickTockWait._initAction = tick;
    TickTockWait._tockAction = tock;

    const tickTock = new TickTockWait();

    tickTock._tick();
    expect(TickTockWait._counter).toBe(1);
    tickTock._tick();
    expect(TickTockWait._counter).toBe(2);
    tickTock._tick();
    expect(TickTockWait._counter).toBe(3);
    tickTock._tick();
    expect(TickTockWait._counter).toBe(2);
    tickTock._tick();

    expect(tickTock._terminated).toBe(true);
});

test("e01.07.ticktockwaitinstance", () => {
    const tickTock = new TickTockWaitInstance();
    
    let tick: ActionFn = () => { tickTock._counter++;  };
    let tock: ActionFn = () => { tickTock._counter--; };
    tickTock._initAction = tick;
    tickTock._tockAction = tock;

    tickTock._reset();
    
    tickTock._tick();
    expect(tickTock._counter).toBe(1);
    tickTock._tick();
    expect(tickTock._counter).toBe(2);
    tickTock._tick();
    expect(tickTock._counter).toBe(3);
    tickTock._tick();
    expect(tickTock._counter).toBe(2);
    tickTock._tick();

    expect(tickTock._terminated).toBe(true);
});