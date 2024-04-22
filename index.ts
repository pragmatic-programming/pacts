import { TickTock } from './tests/PACs/TickTock';
import { TickTockMove } from './tests/PACs/TickTockMove';
import { TickTockStop } from './tests/PACs/TickTockStop';
import { TickTockRestart } from './tests/PACs/TickTockRestart';
import { TickTockWait } from './tests/PACs/TickTockWait';
import { TickTockWaitInstance } from './tests/PACs/TickTockWaitInstance';


const tickTock = new TickTockWaitInstance();
tickTock._reset();

function main() {
    if (tickTock._tick()) {
        setTimeout(main, 1000);
    }
}

setTimeout(main, 1000);
