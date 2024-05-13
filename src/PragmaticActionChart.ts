export type ControlFn = () => LocationFn;
export type ActionFn = () => void;
export type LocationPair = [ActionFn, ControlFn];
export type LocationFn = (() => LocationPair) | null;

export class PragmaticActionChart {

    // Since fields are not listed in the proto object, we can just simply list all member that should be ignored.
    // If someone comes up with an automated way to detect all super fields, we can remove this list.
    protected static _ignoreMember: string[] = ["constructor", "_inferLocations", "_reset", "_tick", 
        "_location", "_defer", "_transition", "_noAction", "_halt", "_self", "_root", "_term", "_if", 
        "_fork", "_forkI"];
    protected static _ignorePrefix: string[] = ["_"];

    public _locations: LocationFn[] = [];
    public _locationNames: string[] = [];
    public _current: LocationFn = null;
    public _initialized: boolean = false;

    public _status: string = "";
    public _tickCallback: (() => void) | undefined = undefined;

    constructor() {
        if (!("_tick" in this)) {
            throw new Error("PragmaticActionClass requires a tick method");
        }
    }

    public _inferLocations(): void {
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
                    let potential: LocationFn = (this[member] as Function)();
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

        this._current = this._location(this._noAction, () => this._locations[0]);
        this._status = "";
        this._initialized = true;
    }

    public _terminated(): boolean {
        return this._status != "";
    }

    public _tick(callback: (() => void) | undefined = undefined): boolean {
        if (!this._initialized) {
            this._reset();
        }

        if (callback) callback();
        if (this._tickCallback) this._tickCallback();
        

        const targetLocation: LocationFn = this._current!()[1]();
        const locationFn: LocationFn = targetLocation;
        if (locationFn === null) {
            return !this._terminated();
        }
        if (this._terminated()) {
            return false;
        }
        
        const locationPair: LocationPair = locationFn();
        const actionFn: ActionFn = locationPair[0];
        actionFn();
        this._current = locationFn;

        return true;
    }

    public _getLocations(): [LocationFn, string][] {
        let locations: [LocationFn, string][] = [];
        for (let i = 0; i < this._locations.length; i++) {
            locations.push([this._locations[i], this._locationNames[i]]);
        }
        return locations;
    }

    public _location(action: ActionFn, control: ControlFn): LocationFn {
        return () => [action, control];
    }

    public _action(action: ActionFn): LocationFn {
        return this._location(action, this._root());
    }

    public _control(location: ControlFn): LocationFn {
        return this._location(this._noAction, location);
    }
    
    public _delegate(location: LocationFn): LocationFn {
        if (location === null) {
            throw new Error("defer requires a valid location!");
        }
        const loc = location();
        if (loc === null) {
            throw new Error("defer requires a valid location!");
        }
        
        let deferControl = loc[1]();
        return deferControl;
    }

    public _defer(location: LocationFn): LocationFn {
        return this._delegate(location);
    }

    public _transition(location: LocationFn): ControlFn {
        return () => location;
    }

    public _noAction(): ActionFn {
        return () => {};
    }

    public _pause(): ControlFn {
        return () => null; 
    }

    public _self(): ControlFn {
        return () => this._current;
    }

    public _root(): ControlFn {
        return () => this._defer(this._locations[0]);
    }

    public _term(exitcode: string = "terminated"): ControlFn {
        return () => {
            this._status = exitcode;
            return null;
        };
    }
    
    public _if(condition: () => boolean, then: ControlFn): ControlFn {
        return condition() ? () => then() : this._pause();
    }

    public _fork(
        control: ControlFn, 
        join: LocationFn, 
        ...locations: PragmaticActionChart[]): LocationFn 
    {
        const action: ActionFn = () => {
            for (let loc of locations) {
                loc._tick();
            }
        };
        const forkControl: ControlFn = () => {
            const superControl: LocationFn = control();
            if (superControl !== null) {
                return superControl;
            }

            var term = true;
            for (let loc of locations) {
                if (!loc._terminated()) {
                    term = false;
                    break;
                }
            }
            return term ? join : this._current;
        }
        return this._location(action, forkControl);
    }

    public _forkI(
        control: () => ControlFn, 
        join: () => ControlFn, 
        ...locations: PragmaticActionChart[]): LocationFn 
    {
        const action: ActionFn = () => {
            for (let loc of locations) {
                loc._tick();
            }
        };
        const forkControl: ControlFn = () => {
            const superControl: LocationFn = control()();
            if (superControl !== null) {
                return superControl;
            }

            action();

            var term = true;
            for (let loc of locations) {
                if (!loc._terminated()) {
                    term = false;
                    break;
                }
            }
            return term ? join()() : null;
        }
        return this._location(action, forkControl);
    }

    public _immediate(location: () => LocationFn): ControlFn {
        const locFn = location()!;
        const loc = locFn();
        loc[0]();
        this._current = locFn;
        return loc[1];
    }
}