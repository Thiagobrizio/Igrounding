import { z } from "zod";

import { baseElementSchema, baseOpenDSSElementSchema } from "./baseElement";
import { busSchema } from "./bus";
import { connSchema } from "./enums";

export const reactorSchema = baseElementSchema.extend({
    /** Name of bus to which the main terminal (1) is connected.
     *
     * Bus1=busname.
     * Bus1=busname.1.2.3.
     * The VSOURCE object is a two-terminal voltage source (thevenin equivalent). Bus2 defaults to Bus1 with all phases connected to ground (node 0) unless previously specified. This is a Yg connection. If you want something different, define the Bus2 property ezplicitly. */
    bus1: busSchema.optional(),
    /** Name of 2nd bus. Defaults to all phases connected to first bus, node 0, (Shunt Wye Connection) except when Bus2 is specifically defined.
     * Not necessary to specify for delta (LL) connection */
    bus2: busSchema.optional(),
    /** Number of phases. */
    phases: z.number().optional(),
    /** Total kvar, all phases.  Evenly divided among phases. Only determines X. Specify R separately */
    kvar: z.number().optional(),
    /** For 2, 3-phase, kV phase-phase. Otherwise specify actual coil rating. */
    kv: z.number().optional(),
    /** ={wye | delta |LN |LL}  Default is wye, which is equivalent to LN. If Delta, then only one terminal. */
    conn: connSchema.optional(),
    /** Resistance matrix, lower triangle, ohms at base frequency. Order of the matrix is the number of phases. Mutually exclusive to specifying parameters by kvar or X. */
    rMatrix: z.number().array().optional(),
    /** Reactance matrix, lower triangle, ohms at base frequency. Order of the matrix is the number of phases. Mutually exclusive to specifying parameters by kvar or X. */
    xMatrix: z.number().array().optional(),
    /** {Yes | No}  Default=No. Indicates whether Rmatrix and Xmatrix are to be considered in parallel. Default is series. For other models, specify R and Rp. */
    parallel: z.boolean().optional(),
    /** Resistance (in series with reactance), each phase, ohms. This property applies to REACTOR specified by either kvar or X. See also help on Z.
     *
     * Redundant with Z */
    r: z.number().optional(),
    /** Reactance, each phase, ohms at base frequency. See also help on Z and LmH properties.
     *
     * Redundant with Z */
    x: z.number().optional(),
    /** Resistance in parallel with R and X (the entire branch). Assumed infinite if not specified. */
    rp: z.number().optional(),
    /** Positive-sequence impedance, ohms, as a 2-element array representing a complex number. Example:
     *
     * Z1=[1, 2]  ! Represents 1 + j2.
     *
     * If defined, Z1, Z2, and Z0 are used to define the impedance matrix of the REACTOR. Z1 MUST BE DEFINED TO USE THIS OPTION FOR DEFINING THE MATRIX.
     *
     * Side Effect: Sets Z2 and Z0 to same values unless they were previously defined. */
    z1: z.number().array().optional(),
    /** Negative-sequence impedance, ohms, as a 2-element array representing a complex number. Example:
     *
     * Z2=[1, 2]  ! Represents 1 + j2.
     *
     * Used to define the impedance matrix of the REACTOR if Z1 is also specified.
     *
     * Note: Z2 defaults to Z1 if it is not specifically defined. If Z2 is not equal to Z1, the impedance matrix is asymmetrical. */
    z2: z.number().array().optional(),
    /** Zero-sequence impedance, ohms, as a 2-element array representing a complex number. Example:
     *
     * Z0=[3, 4]  ! Represents 3 + j4.
     *
     * Used to define the impedance matrix of the REACTOR if Z1 is also specified.
     *
     * Note: Z0 defaults to Z1 if it is not specifically defined. */
    z0: z.number().array().optional(),
    /** Alternative way of defining R and X properties. Enter a 2-element array representing R +jX in ohms. Example:
     *
     * Z=[5  10]   ! Equivalent to R=5  X=10 */
    z: z.number().array().optional(),
    /** Name of XYCurve object, previously defined, describing per-unit variation of phase resistance, R, vs. Frequency. Applies to resistance specified by R or Z property. If actual values are not known, R often increases by approximately the square root of frequency. */
    rCurve: z.string().optional(),
    /** Name of XYCurve object, previously defined, describing per-unit variation of phase inductance, L=X/w, vs. Frequency. Applies to reactance specified by X, LmH, Z, or kvar property.L generally decreases somewhat with frequency above the base frequency, approaching a limit at a few kHz. */
    lCurve: z.string().optional(),
    /** Inductance, mH. Alternate way to define the reactance, X, property.
     *
     * Redundant with X */
    lmH: z.number().optional(),
    /** Normal rated current. */
    normAmps: z.number().optional(),
    /** Maximum or emerg current. */
    emergAmps: z.number().optional(),
    /** Failure rate per year. */
    faultRate: z.number().optional(),
    /** Percent of failures that become permanent. */
    pctperm: z.number().optional(),
    /** Hours to repair. */
    repair: z.number().optional(),
    /** Base Frequency for ratings. */
    baseFreq: z.number().optional(),
    /** {Yes|No or True|False} Indicates whether this element is enabled. */
    enabled: z.boolean().optional(),
});

export type ReactorParameters = z.infer<typeof reactorSchema>;

export const opendssReactorSchema = baseOpenDSSElementSchema.extend({
    bus1: z.string().optional(),
    bus2: z.string().optional(),
    phases: z.string().optional(),
    kvar: z.string().optional(),
    kv: z.string().optional(),
    conn: connSchema.optional(),
    rMatrix: z.string().optional(),
    xMatrix: z.string().optional(),
    parallel: z.string().optional(),
    r: z.string().optional(),
    x: z.string().optional(),
    rp: z.string().optional(),
    z1: z.string().optional(),
    z2: z.string().optional(),
    z0: z.string().optional(),
    z: z.string().optional(),
    rCurve: z.string().optional(),
    lCurve: z.string().optional(),
    lmH: z.string().optional(),
    normAmps: z.string().optional(),
    emergAmps: z.string().optional(),
    faultRate: z.string().optional(),
    pctperm: z.string().optional(),
    repair: z.string().optional(),
    baseFreq: z.string().optional(),
    enabled: z.string().optional(),
});

export type OpenDSSReactorParameters = z.infer<typeof opendssReactorSchema>;
