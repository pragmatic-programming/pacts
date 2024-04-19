import { TickTock } from './tests/PACs/TickTock';
import { TickTockMove } from './tests/PACs/TickTockMove';
import { TickTockStop } from './tests/PACs/TickTockStop';


const tickTock = new TickTockStop();

function main() {
    if (tickTock.tick()) {
        setTimeout(main, 1000);
    }
}

setTimeout(main, 1000);
