import { PragmaticActionChart } from "../../src/PragmaticActionChart";

export function env(pac: PragmaticActionChart, callback?: () => void, ticktime: number = 1000) {

    setTimeout(() => { 
        pac._tick(callback);
        if (!pac._terminated) {
            env(pac, callback, ticktime);
        } 
    }, ticktime);

}