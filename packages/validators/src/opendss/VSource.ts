import { z } from "zod";

import { baseElementSchema, baseOpenDSSElementSchema } from "./baseElement";
import { busSchema } from "./bus";
import { modelSchema, scanTypeSchema, sequenceSchema } from "./enums";

export const vSourceSchema = baseElementSchema.extend({
    circuit: z.boolean().optional(),
    /** Name of bus to which the main terminal (1) is connected.
     *
     * Bus1=busname.
     *
     * Bus1=busname.1.2.3.
     *
     * The VSOURCE object is a two-terminal voltage source (thevenin equivalent). Bus2 defaults to Bus1 with all phases connected to ground (node 0) unless previously specified. This is a Yg connection. If you want something different, define the Bus2 property explicitly. */
    bus1: busSchema.optional(),
    /** Base Source kV, usually phase-phase (L-L) unless you are making a positive-sequence model or 1-phase model in which case, it will be phase-neutral (L-N) kV. */
    basekv: z.number().optional(),
    /** Per unit of the base voltage that the source is actually operating at.
     *
     * "pu=1.05" */
    pu: z.number().optional(),
    /** Phase angle in degrees of first phase: e.g.,Angle=10.3 */
    angle: z.number().optional(),
    /** Source frequency.  Defaults to system default base frequency. */
    frequency: z.number().optional(),
    /** Number of phases.  Defaults to 3. */
    phases: z.number().optional(),
    /** MVA Short circuit, 3-phase fault. Default = 2000. Z1 is determined by squaring the base kv and dividing by this value. For single-phase source, this value is not used. */
    MVAsc3: z.number().optional(),
    /** MVA Short Circuit, 1-phase fault. Default = 2100. The "single-phase impedance", Zs, is determined by squaring the base kV and dividing by this value. Then Z0 is determined by Z0 = 3Zs - 2Z1.  For 1-phase sources, Zs is used directly. Use X0R0 to define X/R ratio for 1-phase source. */
    MVAsc1: z.number().optional(),
    /** Positive-sequence  X/R ratio. Default = 4. */
    x1r1: z.number().optional(),
    /** Zero-sequence X/R ratio.Default = 3. */
    x0r0: z.number().optional(),
    /** Alternate method of defining the source impedance.
     *
     * 3-phase short circuit current, amps.  Default is 10000. */
    isc3: z.number().optional(),
    /** Alternate method of defining the source impedance.
     *
     * Single-phase short circuit current, amps.  Default is 10500. */
    isc1: z.number().optional(),
    /** Alternate method of defining the source impedance.
     *
     * Positive-sequence resistance, ohms.  Default is 1.65.
     *
     * Redundant with Z1 */
    r1: z.number().optional(),
    /** Alternate method of defining the source impedance.
     *
     * Positive-sequence reactance, ohms.  Default is 6.6.
     *
     * Redundant with Z1 */
    x1: z.number().optional(),
    /** Alternate method of defining the source impedance.
     *
     * Zero-sequence resistance, ohms.  Default is 1.9.
     *
     * Redundant with Z0 */
    r0: z.number().optional(),
    /** Alternate method of defining the source impedance.
     *
     * Zero-sequence reactance, ohms.  Default is 5.7.
     *
     * Redundant with Z0 */
    x0: z.number().optional(),
    /** {pos*| zero | none} Maintain specified sequence for harmonic solution. Default is positive sequence. Otherwise, angle between phases rotates with harmonic. */
    scanType: scanTypeSchema.optional(),
    /** {pos*| neg | zero} Set the phase angles for the specified symmetrical component sequence for non-harmonic solution modes. Default is positive sequence. */
    sequence: sequenceSchema.optional(),
    /** Name of bus to which 2nd terminal is connected.
     *
     * Bus2=busname.
     *
     * Bus2=busname.1.2.3.
     *
     * Default is Bus1.0.0.0 (grounded wye connection) */
    bus2: busSchema.optional(),
    /** Positive-sequence equivalent source impedance, ohms, as a 2-element array representing a complex number. Example:
     *
     * Z1=[1, 2]  ! Represents 1 + j2.
     *
     * If defined, Z1, Z2, and Z0 are used to define the impedance matrix of the VSOURCE. Z1 MUST BE DEFINED TO USE THIS OPTION FOR DEFINING THE MATRIX.
     *
     * Side Effect: Sets Z2 and Z0 to same values unless they were previously defined. */
    z1: z.number().array().optional(),
    /** Zero-sequence equivalent source impedance, ohms, as a 2-element array representing a complex number. Example:
     *
     * Z0=[3, 4]  ! Represents 3 + j4.
     *
     * Used to define the impedance matrix of the VSOURCE if Z1 is also specified.
     *
     * Note: Z0 defaults to Z1 if it is not specifically defined. */
    z0: z.number().array().optional(),
    /** Negative-sequence equivalent source impedance, ohms, as a 2-element array representing a complex number. Example:
     *
     * Z2=[1, 2]  ! Represents 1 + j2.
     *
     * Used to define the impedance matrix of the VSOURCE if Z1 is also specified.
     *
     * Note: Z2 defaults to Z1 if it is not specifically defined. If Z2 is not equal to Z1, the impedance matrix is asymmetrical. */
    z2: z.number().array().optional(),
    /** 2-element array: e.g., [1  2]. An alternate way to specify Z1. See Z1 property. Per-unit positive-sequence impedance on base of Vsource BasekV and BaseMVA. */
    puZ1: z.number().array().optional(),
    /** 2-element array: e.g., [1  2]. An alternate way to specify Z0. See Z0 property. Per-unit zero-sequence impedance on base of Vsource BasekV and BaseMVA. */
    puZ0: z.number().array().optional(),
    /** 2-element array: e.g., [1  2]. An alternate way to specify Z2. See Z2 property. Per-unit negative-sequence impedance on base of Vsource BasekV and BaseMVA. */
    puZ2: z.number().array().optional(),
    /** Default value is 100. Base used to convert values specifiied with puZ1, puZ0, and puZ2 properties to ohms on kV base specified by BasekV property. */
    baseMVA: z.number().optional(),
    /** LOADSHAPE object to use for the per-unit voltage for YEARLY-mode simulations. Set the Mult property of the LOADSHAPE to the pu curve. Qmult is not used. If UseActual=Yes then the Mult curve should be actual L-N kV.
     *
     * Must be previously defined as a LOADSHAPE object.
     *
     * Is set to the Daily load shape when Daily is defined.  The daily load shape is repeated in this case. Set to NONE to reset to no loadahape for Yearly mode. The default is no variation. */
    yearly: z.string().optional(),
    /** LOADSHAPE object to use for the per-unit voltage for DAILY-mode simulations. Set the Mult property of the LOADSHAPE to the pu curve. Qmult is not used. If UseActual=Yes then the Mult curve should be actual L-N kV.
     *
     * Must be previously defined as a LOADSHAPE object.
     *
     * Sets Yearly curve if it is not already defined.   Set to NONE to reset to no loadahape for Yearly mode. The default is no variation. */
    daily: z.string().optional(),
    /** LOADSHAPE object to use for the per-unit voltage for DUTYCYCLE-mode simulations. Set the Mult property of the LOADSHAPE to the pu curve. Qmult is not used. If UseActual=Yes then the Mult curve should be actual L-N kV.
     *
     * Must be previously defined as a LOADSHAPE object.
     *
     * Defaults to Daily load shape when Daily is defined.   Set to NONE to reset to no loadahape for Yearly mode. The default is no variation. */
    duty: z.string().optional(),
    /** {Thevenin* | Ideal}  Specifies whether the Vsource is to be considered a Thevenin short circuit model or a quasi-ideal voltage source. If Thevenin, the Vsource uses the impedances defined for all calculations. If "Ideal", the model uses a small impedance on the diagonal of the impedance matrix for the fundamental base frequency power flow only. Then switches to actual Thevenin model for other frequencies. */
    model: modelSchema.optional(),
    /** 2-element array: e.g., [1  2]. The pu impedance to use for the quasi-ideal voltage source model. Should be a very small impedances. Default is [1e-6, 0.001]. Per-unit impedance on base of Vsource BasekV and BaseMVA. If too small, solution may not work. Be sure to check the voltage values and powers. */
    puZideal: z.number().array().optional(),
    /** Name of harmonic spectrum for this source.  Default is "defaultvsource", which is defined when the DSS starts. */
    spectrum: z.string().optional(),
    /** Base Frequency for ratings. */
    baseFreq: z.number().optional(),
    /** Indicates whether this element is enabled. */
    enabled: z.boolean().optional(),
});

export type VSourceParameters = z.infer<typeof vSourceSchema>;

export const opendssVSourceSchema = baseOpenDSSElementSchema.extend({
    name: z.string(),
    bus1: z.string().optional(),
    basekv: z.string().optional(),
    pu: z.string().optional(),
    angle: z.string().optional(),
    frequency: z.string().optional(),
    phases: z.string().optional(),
    MVAsc3: z.string().optional(),
    MVAsc1: z.string().optional(),
    x1r1: z.string().optional(),
    x0r0: z.string().optional(),
    isc3: z.string().optional(),
    isc1: z.string().optional(),
    r1: z.string().optional(),
    x1: z.string().optional(),
    r0: z.string().optional(),
    x0: z.string().optional(),
    scanType: scanTypeSchema.optional(),
    sequence: sequenceSchema.optional(),
    bus2: z.string().optional(),
    z1: z.string().optional(),
    z0: z.string().optional(),
    z2: z.string().optional(),
    puZ1: z.string().optional(),
    puZ0: z.string().optional(),
    puZ2: z.string().optional(),
    baseMVA: z.string().optional(),
    yearly: z.string().optional(),
    daily: z.string().optional(),
    duty: z.string().optional(),
    model: modelSchema.optional(),
    puZideal: z.string().optional(),
    spectrum: z.string().optional(),
    baseFreq: z.string().optional(),
    enabled: z.string().optional(),
});

export type OpenDSSVSourceParameters = z.output<typeof opendssVSourceSchema>;
