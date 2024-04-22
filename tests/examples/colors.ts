import { ColorPAC } from "../PACs/ColorPAC";
import { env } from "./env";

const colors = new ColorPAC();
colors._reset();
colors._tick();

env(colors, () => { console.log(colors.currentColor); }, 100);

