import winax from "winax";

export default class OpenDSSInterface {
    dss: OpenDSSengine.DSS;

    dssBus: OpenDSSengine.DSS["ActiveCircuit"]["ActiveBus"];

    dssCircuit: OpenDSSengine.DSS["ActiveCircuit"];

    dssElem: OpenDSSengine.DSS["ActiveCircuit"]["ActiveCktElement"];

    dssMathLib: OpenDSSengine.DSS["CmathLib"];

    dssSolution: OpenDSSengine.DSS["ActiveCircuit"]["Solution"];

    dssText: OpenDSSengine.DSS["Text"];

    constructor() {
        this.dss = new winax.Object("OpenDSSengine.DSS") as OpenDSSengine.DSS;
        if (!this.dss.Start(0)) {
            throw new Error("Unable to start OpenDSS engine");
        }
        this.dss.AllowForms = false;
        this.dss.ClearAll();
        this.dssMathLib = this.dss.CmathLib;
        this.dssText = this.dss.Text;
        this.dssCircuit = this.dss.ActiveCircuit;
        this.dssSolution = this.dssCircuit.Solution;
        this.dssElem = this.dssCircuit.ActiveCktElement;
        this.dssBus = this.dssCircuit.ActiveBus;
    }

    clear() {
        this.dss.ClearAll();
    }

    createCircuit(name: string) {
        this.dss.NewCircuit(name);
    }

    getActiveCircuit() {
        return this.dssCircuit.Name;
    }

    getBusNames() {
        return this.dssCircuit.AllBusNames;
    }

    getCurrentsPolar(name: string) {
        this.setActiveElement(name);
        const currents = this.dssElem.CurrentsMagAng as number[];
        const phases = this.dssElem.NodeOrder as number[];
        return phases.map((phase, index) => {
            const mag = currents[index * 2];
            const angle = currents[index * 2 + 1];

            if (!mag || !angle) {
                throw Error(`Current can't be found for phase ${phase}`);
            }
            return {
                phase,
                current: mag,
                angle: angle,
            };
        });
    }

    getCurrentsRect(name: string) {
        this.setActiveElement(name);
        const currents = this.dssElem.Currents as number[];
        const phases = this.dssElem.NodeOrder as number[];
        return phases.map((phase, index) => {
            const real = currents[index * 2];
            const imag = currents[index * 2 + 1];

            if (!real || !imag) {
                throw Error(`Current can't be found for phase ${phase}`);
            }

            return {
                phase,
                real,
                imag,
            };
        });
    }

    getElementNames() {
        return this.dssCircuit.AllElementNames;
    }

    getNodeNames() {
        return this.dssCircuit.AllNodeNames;
    }

    getNumCircuits() {
        return this.dss.NumCircuits;
    }

    getNumElements() {
        return this.dssCircuit.NumCktElements;
    }

    getVersion() {
        return this.dss.Version;
    }

    sendArray(commands: string[]) {
        commands.forEach((command) => {
            this.sendString(command);
        });
    }

    sendString(text: string) {
        this.dssText.Command = text;
        console.log(`Sent: ${text}`);
        if (this.dssText.Result) {
            console.log(`Received: ${this.dssText.Result}`);
        }
        if (this.dss.Error.Description || this.dss.Error.Number) {
            throw new Error(
                `Error: ${this.dss.Error.Description} [${this.dss.Error.Number}]`
            );
        }
    }

    setActiveElement(name: string) {
        if (this.dssElem.Name === name) {
            return;
        }
        const result = this.dssCircuit.SetActiveElement(name);

        console.log("result: ", result);
        if (this.dssElem.Name.toLowerCase() !== name.toLowerCase()) {
            console.log(
                `Can't find ${name} in circuit. [Found ${this.dssElem.Name}]`
            );
            throw new Error(
                `Can't find ${name} in circuit. [Found ${this.dssElem.Name}]`
            );
        }
    }

    solve() {
        this.dssSolution.Solve();
        if (this.dss.Error.Description || this.dss.Error.Number) {
            throw new Error(
                `Error solving: ${this.dss.Error.Description} [${this.dss.Error.Number}]`
            );
        }
        if (!this.dssSolution.Converged) {
            throw new Error(`Unknown Error, Solution did not converge.`);
        }
    }
}
