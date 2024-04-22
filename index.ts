import { TickTock } from './tests/PACs/TickTock';
import { TickTockMove } from './tests/PACs/TickTockMove';
import { TickTockStop } from './tests/PACs/TickTockStop';
import { TickTockRestart } from './tests/PACs/TickTockRestart';


const tickTock = new TickTockRestart();

function main() {
    if (tickTock._tick()) {
        setTimeout(main, 1000);
    }
}

setTimeout(main, 1000);
