import { TickTock } from './test/TickTock';
import { TickTockMove } from './test/TickTockMove';
import { TickTockStop } from './test/TickTockStop';


const tickTock = new TickTockStop();

function main() {
    if (tickTock.tick()) {
        setTimeout(main, 1000);
    }
}

setTimeout(main, 1000);
