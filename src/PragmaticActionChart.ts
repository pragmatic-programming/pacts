export type ControlFn = () => Location;
export type ActionFn = () => void;
export type Location = [ActionFn, ControlFn] | null;
export type LocationFn = () => Location;

export class PragmaticActionClass {

    // Since fields are not listed in the proto object, we can just simply list all member that should be ignored.
    // If someone comes up with an automated way to detect all super fields, we can remove this list.
    protected static ignoreMember: string[] = ["constructor", "inferLocations", "reset", "tick", "location", "defer", "transition", "noAction", "halt"];

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
            console.log(`${member} in ${this.constructor.name}:${typeof this[member]}`)
            
            if (typeof this[member] === "function") {
                if (!PragmaticActionClass.ignoreMember.includes(member)) {
                    if (member in protoParent) {
                        throw new Error("Method " + member + " is defined in the proto class. This cannot be a location.");
                    }
                    let potential: Location = (this[member] as Function)();
                    this.locations.push(potential);
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

    protected location(action: ActionFn, control: ControlFn): Location {
        return [action, control];
    }

    
    protected defer(location: Location): Location {
        if (location === null) {
            throw new Error("defer requires a valid location!");
        }
        
        let deferControl = location[1]();
        return deferControl;
    }

    protected transition(location: Location): LocationFn {
        return () => location;
    }

    protected noAction(): ActionFn {
        return () => {};
    }

    protected halt(): ControlFn {
        return () => null; 
    }
}