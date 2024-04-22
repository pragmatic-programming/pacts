import exp from "constants";
import { ActionFn } from "../../src/PragmaticActionChart";
import { TickTock } from "../PACs/TickTock";
import { TickTockMove } from "../PACs/TickTockMove";
import { TickTockHalt } from "../PACs/TickTockHalt";
import { TickTockStop } from "../PACs/TickTockStop";
import { TickTockSelf } from "../PACs/TickTockSelf";

test("e01ticktock", () => {
    let clock: number = 0;
    let tick: ActionFn = () => { clock++; };
    let tock: ActionFn = () => { clock--; };
    TickTock.initAction = tick;
    TickTock.tockAction = tock;

    const tickTock = new TickTock();

    tickTock.tick();
    expect(clock).toBe(1);
    tickTock.tick();
    expect(clock).toBe(0);
    tickTock.tick();
    expect(clock).toBe(1);
    tickTock.tick();
    expect(clock).toBe(0);
});

test("e02ticktockmove", () => {
    let clock: number = 0;
    let tick: ActionFn = () => { clock++; };
    let tock: ActionFn = () => { clock--; };
    TickTockMove.initAction = tick;
    TickTockMove.tockAction = tock;

    const tickTock = new TickTockMove();

    tickTock.tick();
    expect(clock).toBe(1);
    tickTock.tick();
    expect(clock).toBe(2);
    tickTock.tick();
    expect(clock).toBe(3);
    tickTock.tick();
    expect(clock).toBe(4);
});

test("e03ticktockhalt", () => {
    let clock: number = 0;
    let tick: ActionFn = () => { clock++; };
    let tock: ActionFn = () => { clock--; };
    TickTockHalt.initAction = tick;
    TickTockHalt.tockAction = tock;

    const tickTock = new TickTockHalt();

    tickTock.tick();
    expect(clock).toBe(1);
    tickTock.tick();
    expect(clock).toBe(0);
    tickTock.tick();
    expect(clock).toBe(0);
    tickTock.tick();
    expect(clock).toBe(0);
    
    expect(tickTock.tick()).toBe(false);
});

test("e04ticktockstop", () => {
    let clock: number = 0;
    let tick: ActionFn = () => { clock++; };
    let tock: ActionFn = () => { clock--; };
    TickTockStop.initAction = tick;
    TickTockStop.tockAction = tock;

    const tickTock = new TickTockStop();

    tickTock.tick();
    expect(clock).toBe(1);
    tickTock.tick();
    expect(clock).toBe(0);
    tickTock.tick();
    expect(clock).toBe(0);
    tickTock.tick();
    expect(clock).toBe(0);
    
    expect(tickTock.tick()).toBe(false);
});

test("e05ticktockself", () => {
    let clock: number = 0;
    let tick: ActionFn = () => { clock++; };
    let tock: ActionFn = () => { clock--; };
    TickTockSelf.initAction = tick;
    TickTockSelf.tockAction = tock;

    const tickTock = new TickTockSelf();

    tickTock.tick();
    expect(clock).toBe(1);
    tickTock.tick();
    expect(clock).toBe(0);
    tickTock.tick();
    expect(clock).toBe(-1);
    tickTock.tick();
    expect(clock).toBe(-2);
});