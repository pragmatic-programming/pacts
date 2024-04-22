export type ControlFn = () => Location;
export type ActionFn = () => void;
export type Location = [ActionFn, ControlFn] | null;
export type LocationFn = () => Location;

export class PragmaticActionClass {

    // Since fields are not listed in the proto object, we can just simply list all member that should be ignored.
    // If someone comes up with an automated way to detect all super fields, we can remove this list.
    protected static _ignoreMember: string[] = ["constructor", "_inferLocations", "_reset", "_tick", 
        "_location", "_defer", "_transition", "_noAction", "_halt", "_self", "_root", "_term"];
    protected static _ignorePrefix: string[] = ["_"];

    protected _locations: Location[] = [];
    protected _current: Location | null = null;
    public _terminated: boolean = false;

    constructor() {
        if (!("_tick" in this)) {
            throw new Error("PragmaticActionClass requires a tick method");
        }

        this._inferLocations();

        if (this._locations.length < 1) {
            throw new Error("PragmaticActionClass requires at least one location (method)");
        }

        this._reset();
    }

    protected _inferLocations(): void {
        let proto = Object.getPrototypeOf(this);
        let protoParent = Object.getPrototypeOf(proto);
        while (!("_tick" in protoParent)) {
            protoParent = Object.getPrototypeOf(protoParent);
        }

        for (let member in this) {
            if (typeof this[member] === "function") {
                if (!PragmaticActionClass._ignoreMember.includes(member)) {
                    if (PragmaticActionClass._ignorePrefix.some(prefix => member.startsWith(prefix))) {
                        continue;
                    }
                    if (member in protoParent) {
                        throw new Error("Method " + member + " is defined in the proto class. This cannot be a location.");
                    }
                    let potential: Location = (this[member] as Function)();
                    this._locations.push(potential);
                }
            }
        }
    }

    public _reset() {
        this._current = [() => {}, () => this._locations[0]];
        this._terminated = false;
    }

    public _tick(): boolean {
        let control = this._current![1];
        let location = control();
        if (this._terminated) {
            return false;
        }
        if (location === null) {
            return true;
        }

        let action = location[0];
        action();
        this._current = location;

        return true;
    }

    protected _location(action: ActionFn, control: ControlFn): Location {
        return [action, control];
    }

    
    protected _defer(location: Location): Location {
        if (location === null) {
            throw new Error("defer requires a valid location!");
        }
        
        let deferControl = location[1]();
        return deferControl;
    }

    protected _transition(location: Location): LocationFn {
        return () => location;
    }

    protected _noAction(): ActionFn {
        return () => {};
    }

    protected _pause(): ControlFn {
        return () => null; 
    }

    protected _self(): ControlFn {
        return () => this._current;
    }

    protected _root(): ControlFn {
        return () => this._defer(this._locations[0]);
    }

    protected _term(): ControlFn {
        return () => {
            this._terminated = true;
            return null;
        };
    }
}