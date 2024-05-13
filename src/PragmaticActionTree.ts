import { ActionFn, ControlFn, LocationFn, PragmaticActionChart } from "./PragmaticActionChart";

export class PragmaticActionTree extends PragmaticActionChart {

    public static SUCCESS: string = "success";
    public static FAILURE: string = "failure";

    public _selector(
        control: () => ControlFn, 
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

            for (let loc of locations) {
                loc._tick();
                const term = loc._status;
                if (!term) {
                    return null;
                } else if (term === PragmaticActionTree.SUCCESS) {
                    return this._term(PragmaticActionTree.SUCCESS)();
                }
            }
            return this._term(PragmaticActionTree.FAILURE)();
        }
        return this._location(action, forkControl);
    }

    public _sequence(
        control: () => ControlFn, 
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

            for (let loc of locations) {
                loc._tick();
                const term = loc._status;
                if (!term) {
                    return null;
                } else if (term === PragmaticActionTree.FAILURE) {
                    return this._term(PragmaticActionTree.FAILURE)();
                }
            }
            return this._term(PragmaticActionTree.SUCCESS)();
        }
        return this._location(action, forkControl);
    }

    public _sequenceControl(
        control: () => ControlFn, 
        success: () => ControlFn,
        failure: () => ControlFn,
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

            for (let loc of locations) {
                loc._tick();
                const term = loc._status;
                if (!term) {
                    return null;
                } else if (term === PragmaticActionTree.FAILURE) {
                    return failure()();
                }
            }
            return success()();
        }
        return this._location(action, forkControl);
    }

}