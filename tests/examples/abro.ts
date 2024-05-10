import { ABRO } from "../PACs/ABRO";
import { env } from "./env";

function inputA(): boolean {
    return Math.random() < 0.5;
}

function inputB(): boolean {
    return Math.random() < 0.5;
}

function inputR(): boolean {
    return Math.random() < 0.5;
}

const abro = new ABRO(inputA, inputB, inputR, () => { console.log("O"); } );

env(abro, () => { console.log("Tick") }, 100);