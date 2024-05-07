export type ControlFn = () => Location;
export type ActionFn = () => void;
export type Location = [ActionFn, ControlFn] | null;
export type LocationFn = () => Location;

export class PragmaticActionChart {

    // Since fields are not listed in the proto object, we can just simply list all member that should be ignored.
    // If someone comes up with an automated way to detect all super fields, we can remove this list.
    protected static _ignoreMember: string[] = ["constructor", "_inferLocations", "_reset", "_tick", 
        "_location", "_defer", "_transition", "_noAction", "_halt", "_self", "_root", "_term"];
    protected static _ignorePrefix: string[] = ["_"];

    protected _locations: Location[] = [];
    protected _locationNames: string[] = [];
    protected _current: Location | null = null;
    protected _initialized: boolean = false;
    
    public _terminated: boolean = false;

    constructor() {
        if (!("_tick" in this)) {
            throw new Error("PragmaticActionClass requires a tick method");
        }

        // This will only prepare static locations. 
        // Works fine as long as only static code is used. 
        // If you want to use instance code, call reset() after the constructor.
        // this._reset();
    }

    protected _inferLocations(): void {
        this._locations = [];
        let proto = Object.getPrototypeOf(this);
        let protoParent = Object.getPrototypeOf(proto);
        while (!("_tick" in protoParent)) {
            protoParent = Object.getPrototypeOf(protoParent);
        }

        for (let member in this) {
            if (typeof this[member] === "function") {
                if (!PragmaticActionChart._ignoreMember.includes(member)) {
                    if (PragmaticActionChart._ignorePrefix.some(prefix => member.startsWith(prefix))) {
                        continue;
                    }
                    if (member in protoParent) {
                        throw new Error("Method " + member + " is defined in the proto class. This cannot be a location.");
                    }
                    let potential: Location = (this[member] as Function)();
                    this._locations.push(potential);
                    this._locationNames.push(member);
                }
            }
        }
    }

    /** 
     * Infer Locations does only fill in actions of static code if called from the constructor. 
     * If you want to use instance code in your state machine, you have to call reset() after initialization of the instance.
     */
    public _reset() {
        this._inferLocations();
        if (this._locations.length < 1) {
            throw new Error("PragmaticActionClass requires at least one location (method)");
        }

        this._current = [() => {}, () => this._locations[0]];
        this._terminated = false;
        this._initialized = true;
    }

    public _tick(callback?: () => void): boolean {
        if (!this._initialized) {
            this._reset();
        }

        let control = this._current![1];
        let location = control();
        if (this._terminated) {
            return false;
        }
        if (location === null) {
            if (callback) {
                callback();
            }
            return true;
        }

        let action = location[0];
        action();
        this._current = location;

        if (callback) {
            callback();
        }

        return true;
    }

    public _getLocations(): [Location, string][] {
        let locations: [Location, string][] = [];
        for (let i = 0; i < this._locations.length; i++) {
            locations.push([this._locations[i], this._locationNames[i]]);
        }
        return locations;
    }

    protected _location(action: ActionFn, control: ControlFn): Location {
        return [action, control];
    }

    protected _action(action: ActionFn): Location {
        return this._location(action, this._root());
    }

    protected _control(location: ControlFn): Location {
        return this._location(this._noAction, location);
    }
    
    protected _delegate(location: Location): Location {
        if (location === null) {
            throw new Error("defer requires a valid location!");
        }
        
        let deferControl = location[1]();
        return deferControl;
    }

    protected _defer(location: Location): Location {
        return this._delegate(location);
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

    protected _fork(join: LocationFn, ...locations: PragmaticActionChart[]): Location {
        const action: ActionFn = () => {
            for (let loc of locations) {
                loc._tick();
            }
        };
        const control: ControlFn = () => {
            // action();
            let term = true;
            for (let loc of locations) {
                if (!loc._terminated) {
                    term = false;
                    break;
                }
            }
            return term ? join() : this._self()();
        }
        return this._location(action, control);
    }

}