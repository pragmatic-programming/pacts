import exp from "constants";
import { ControlFn, LocationFn, PragmaticActionChart } from "../../src/PragmaticActionChart";
import { PragmaticActionTree } from "../../src/PragmaticActionTree";


class TestSuccess extends PragmaticActionChart {

    public root(): LocationFn {
        return this._control(this._term(PragmaticActionTree.SUCCESS));
    }

}

class TestFailure extends PragmaticActionChart {

    public root(): LocationFn {
        return this._control(this._term(PragmaticActionTree.FAILURE));
    }
    
}

test("e04.00.patselector.00.true", () => {
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._selector(
                () => this._pause(), 
                new TestSuccess());
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.SUCCESS);
});

test("e04.00.patselector.01.2True", () => {
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._selector(
                () => this._pause(), 
                new TestSuccess(),
                new TestSuccess());
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.SUCCESS);
});

test("e04.00.patselector.02.false", () => {
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._selector(
                () => this._pause(), 
                new TestFailure());
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.FAILURE);
});

test("e04.00.patselector.03.2FTrue", () => {
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._selector(
                () => this._pause(), 
                new TestFailure(),
                new TestSuccess());
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.SUCCESS);
});

test("e04.00.patselector.04.4FTrue", () => {
    const TF0 = new TestFailure();
    const TF1 = new TestFailure();
    const TF2 = new TestFailure();
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._selector(
                () => this._pause(), 
                TF0, TF1,
                new TestSuccess(),
                TF2);
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.SUCCESS);
    expect(TF0._status).toBe(PragmaticActionTree.FAILURE);
    expect(TF1._status).toBe(PragmaticActionTree.FAILURE);
    expect(TF2._terminated()).toBe(false);
});






test("e04.01.patsequence.00.true", () => {
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                new TestSuccess());
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.SUCCESS);
});

test("e04.01.patsequence.01.2True", () => {
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                new TestSuccess(),
                new TestSuccess());
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.SUCCESS);
});

test("e04.01.patsequence.02.false", () => {
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                new TestFailure());
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.FAILURE);
});

test("e04.01.patsequence.03.2FTrue", () => {
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                new TestFailure(),
                new TestSuccess());
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.FAILURE);
});

test("e04.01.patsequence.04.4FTrue", () => {
    const TS0 = new TestSuccess();
    const TS1 = new TestSuccess();
    const TS2 = new TestSuccess();
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                TS0, TS1,
                new TestFailure(),
                TS2);
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.FAILURE);
    expect(TS0._status).toBe(PragmaticActionTree.SUCCESS);
    expect(TS1._status).toBe(PragmaticActionTree.SUCCESS);
    expect(TS2._terminated()).toBe(false);
});




test("e04.02.pat.00.true", () => {
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                this.select());
        }

        public select(): PragmaticActionTree {
            return new class extends PragmaticActionTree {
                public select(): LocationFn {
                    return this._selector(
                        () => this._pause(), 
                        new TestSuccess());
                }
            }
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.SUCCESS);
});

test("e04.02.pat.01.false", () => {
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                this.select());
        }

        public select(): PragmaticActionTree {
            return new class extends PragmaticActionTree {
                public select(): LocationFn {
                    return this._selector(
                        () => this._pause(), 
                        new TestFailure());
                }
            }
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.FAILURE);
});

test("e04.02.pat.02.tfTrue", () => {
    const TF1 = new TestFailure();
    const TS1 = new TestSuccess();

    // TF1._tickCallback = () => {
    //     console.log("TF1._tickCallback");
    // }
    // TS1._tickCallback = () => { 
    //     console.log("TS1._tickCallback");
    // }

    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                this.select());
        }

        public select(): PragmaticActionTree {
            return new class extends PragmaticActionTree {
                public select(): LocationFn {
                    return this._selector(
                        () => this._pause(), 
                        TS1,
                        TF1);
                }
            }
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.SUCCESS);
});

test("e04.02.pat.03.ftTrue", () => {
    const TF1 = new TestFailure();
    const TS1 = new TestSuccess();

    // TF1._tickCallback = () => {
    //     console.log("TF1._tickCallback");
    // }
    // TS1._tickCallback = () => { 
    //     console.log("TS1._tickCallback");
    // }

    const pat = new class extends PragmaticActionTree {

        public root(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                this.select());
        }

        public select(): PragmaticActionTree {
            return new class extends PragmaticActionTree {
                public select(): LocationFn {
                    return this._selector(
                        () => this._pause(), 
                        TF1,
                        TS1);
                }
            }
        }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.SUCCESS);
});

test("e04.02.pat.03.2SelectTrue", () => {
    const pat = new class extends PragmaticActionTree {
        public root(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                this.selectOne(),
                this.selectTwo());
        }

        public selectOne(): PragmaticActionTree {
            return new class extends PragmaticActionTree {
                public select(): LocationFn {
                    return this._selector(
                        () => this._pause(), 
                        new TestFailure(),
                        new TestSuccess());
                }
            }
        }

        public selectTwo(): PragmaticActionTree {
            return new class extends PragmaticActionTree {
                public select(): LocationFn {
                    return this._selector(
                        () => this._pause(), 
                        new TestFailure(),
                        new TestSuccess());
                }
            }
        }

    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.SUCCESS);
});

test("e04.02.pat.02.2SelectFalse", () => {
    const TF1 = new TestFailure();
    const TF2 = new TestFailure();
    const TF3 = new TestFailure();

    // TF1._tickCallback = () => {
    //     console.log("TF1._tickCallback");
    // }
    // TF2._tickCallback = () => {
    //     console.log("TF2._tickCallback");
    // }
    // TF3._tickCallback = () => {
    //     console.log("TF3._tickCallback");
    // }

    const pat = new class extends PragmaticActionTree {

        public root(): LocationFn {
            return this._sequence(
                () => this._pause(), 
                this.selectOne,
                this.selectTwo);
        }

        protected selectOne = new class extends PragmaticActionTree {
            public selectOne(): LocationFn {
                return this._selector(
                    () => this._pause(), 
                    TF1,
                    new TestSuccess());
            }
       }
       protected selectTwo = new class extends PragmaticActionTree {
            public selectTwo(): LocationFn {
                return this._selector(
                    () => this._pause(), 
                    TF2,
                    TF3);
            }
       }
    }

    pat._tick();
    expect(pat._terminated()).toBe(false);
    pat._tick();
    expect(pat._terminated()).toBe(true);
    expect(pat._status).toBe(PragmaticActionTree.FAILURE);
});