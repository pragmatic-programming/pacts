import exp from "constants";
import { Action } from "../../src/PragmaticActionChart";
import { TickTock } from "../PACs/TickTock";
import { TickTockMove } from "../PACs/TickTockMove";
import { TickTockStop } from "../PACs/TickTockStop";

test("e01ticktock", () => {
    let clock: number = 0;
    let tick: Action = () => { clock++; };
    let tock: Action = () => { clock--; };
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
    let tick: Action = () => { clock++; };
    let tock: Action = () => { clock--; };
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

test("e03ticktockstop", () => {
    let clock: number = 0;
    let tick: Action = () => { clock++; };
    let tock: Action = () => { clock--; };
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