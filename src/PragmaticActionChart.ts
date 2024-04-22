export type Control = () => Location;
export type Action = () => void;
export type Location = [Action, () => Location] | null;

export class PragmaticActionClass {

    protected locations: Location[] = [];
    protected current: Location | null = null;

    constructor() {
        if (!("tick" in this)) {
            throw new Error("PragmaticActionClass requires a tick method");
        }

        this.inferLocations();

        if (this.locations.length < 1) {
            throw new Error("PragmaticActionClass requires at least one location (method)");
        }

        this.reset();
    }

    protected inferLocations(): void {
        let proto = Object.getPrototypeOf(this);
        let protoParent = Object.getPrototypeOf(proto);
        while (!("tick" in protoParent)) {
            protoParent = Object.getPrototypeOf(protoParent);
        }

        for (let member in this) {
            console.log(`member ${member} ${typeof this[member]}`);
            if (typeof this[member] === "function") {
                if (!(member in protoParent)) {
                    console.log(`found member ${member} ${typeof this[member]}`);
                    let location: Location = (this[member] as Function)();
                    // console.log(`location type ${location}`);
                    this.locations.push(location);
                }
            }
        }
    }

    public reset() {
        this.current = [() => {}, () => this.locations[0]];
    }

    public tick(): boolean {
        console.log("DEBUG: tick");
        let control = this.current![1];
        let location = control();
        if (location === null) {
            return false;
        }

        let action = location[0];
        action();
        this.current = location;

        return true;
    }

    protected location(action: Action, control: Control): Location {
        return [action, control];
    }

    public defer(location: Location): Location {
        if (location === null) {
            throw new Error("defer requires a valid location!");
        }
        
        let deferControl = location[1]();
        return deferControl;
    }

    public halt(): Location {
        return null;
    }
}