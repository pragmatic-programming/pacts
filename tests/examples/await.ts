import { Await } from "../PACs/Await";
import { env } from "./env";

var ticks = 0;

function inputA(): boolean {
    return ticks > 5;
}

const aw = new Await(() => { return ticks > 5; }, () => { console.log("A"); });

env(aw, () => { console.log("Tick"); ticks++; }, 100);