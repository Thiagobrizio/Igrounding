import { z } from "zod";

import { baseElementSchema, baseOpenDSSElementSchema } from "./baseElement";
import { busSchema } from "./bus";
import { earthModelSchema, unitsSchema } from "./enums";

export const lineSchema = baseElementSchema.extend({
    /** Name of bus to which first terminal is connected.
     *
     * Example:
     *
     * bus1=busname   (assumes all terminals connected in normal phase order).
     *
     * Bus1=busname.3.1.2.0 (specify terminal to node connections explicitly) */
    bus1: busSchema.optional(),

    /** Name of bus to which 2nd terminal is connected. */
    bus2: busSchema.optional(),

    /** Name of linecode object describing line impedances.
     *
     * If you use a line code, you do not need to specify the impedances here. The line code must have been PREVIOUSLY defined. The values specified last will prevail over those specified earlier (left-to-right sequence of properties).  You can subsequently change the number of phases if symmetrical component quantities are specified.If no line code or impedance data are specified, the line object defaults to 336 MCM ACSR on 4 ft spacing. */
    lineCode: z.string().optional(),

    /** Length of line. Default is 1.0. If units do not match the impedance data, specify "units" property. */
    length: z.number().optional(),

    /** Number of phases, this line. */
    phases: z.number().optional(),

    /** Positive-sequence Resistance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. See also Rmatrix. */
    r1: z.number().optional(),

    /** Positive-sequence Reactance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition.  See also Xmatrix */
    x1: z.number().optional(),

    /** Zero-sequence Resistance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. */
    r0: z.number().optional(),

    /** Zero-sequence Reactance, ohms per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. */
    x0: z.number().optional(),

    /** Positive-sequence capacitance, nf per unit length.  Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition. See also Cmatrix and B1. */
    c1: z.number().optional(),

    /** Zero-sequence capacitance, nf per unit length. Setting any of R1, R0, X1, X0, C1, C0 forces the program to use the symmetrical component line definition.See also B0. */
    c0: z.number().optional(),

    /** Resistance matrix, lower triangle, ohms per unit length. Order of the matrix is the number of phases. May be used to specify the impedance of any line configuration. Using any of Rmatrix, Xmatrix, Cmatrix forces program to use the matrix values for line impedance definition. For balanced line models, you may use the standard symmetrical component data definition instead. */
    rMatrix: z.number().array().optional(),

    /** Reactance matrix, lower triangle, ohms per unit length. Order of the matrix is the number of phases. May be used to specify the impedance of any line configuration. Using any of Rmatrix, Xmatrix, Cmatrix forces program to use the matrix values for line impedance definition.  For balanced line models, you may use the standard symmetrical component data definition instead. */
    xMatrix: z.number().array().optional(),

    /** Nodal Capacitance matrix, lower triangle, nf per unit length.Order of the matrix is the number of phases. May be used to specify the shunt capacitance of any line configuration. Using any of Rmatrix, Xmatrix, Cmatrix forces program to use the matrix values for line impedance definition.  For balanced line models, you may use the standard symmetrical component data definition instead. */
    cMatrix: z.number().array().optional(),

    /** {y/n | T/F}  Default= no/false.  Designates this line as a switch for graphics and algorithmic purposes.
     *
     * SIDE EFFECT: Sets r1 = 1.0, x1 = 1.0, r0 = 1.0, x0 = 1.0, c1 = 1.1 , c0 = 1.0,  length = 0.001, You must reset if you want something different. */
    switch: z.boolean().optional(),

    /** Carson earth return resistance per unit length used to compute impedance values at base frequency. Default is 0.01805 = 60 Hz value in ohms per kft (matches default line impedances). This value is required for harmonic solutions if you wish to adjust the earth return impedances for frequency. If not, set both Rg and Xg = 0. */
    rg: z.number().optional(),

    /** Carson earth return reactance per unit length used to compute impedance values at base frequency.  For making better frequency adjustments. Default is 0.155081 = 60 Hz value in ohms per kft (matches default line impedances). This value is required for harmonic solutions if you wish to adjust the earth return impedances for frequency. If not, set both Rg and Xg = 0. */
    xg: z.number().optional(),

    /** Default=100 meter ohms.  Earth resitivity used to compute earth correction factor. Overrides Line geometry definition if specified. */
    rho: z.number().optional(),

    /** Geometry code for LineGeometry Object. Supercedes any previous definition of line impedance. Line constants are computed for each frequency change or rho change. CAUTION: may alter number of phases. You cannot subsequently change the number of phases unless you change how the line impedance is defined. */
    geometry: z.string().optional(),

    /** Length Units = {none | mi|kft|km|m|Ft|in|cm } Default is None - assumes length units match impedance units. */
    units: unitsSchema.optional(),

    /** Reference to a LineSpacing for use in a line constants calculation.
     *
     * Must be used in conjunction with the Wires property.
     *
     * Specify this before the wires property. */
    spacing: z.string().optional(),

    /** Array of WireData names for use in an overhead line constants calculation.
     *
     * Must be used in conjunction with the Spacing property.
     *
     * Specify the Spacing first, and "ncond" wires.
     *
     * May also be used to specify bare neutrals with cables, using "ncond-nphase" wires. */
    wires: z.string().array().optional(),

    /** One of {Carson | FullCarson | Deri}. Default is the global value established with the Set EarthModel command. See the Options Help on EarthModel option. This is used to override the global value for this line. This option applies only when the "geometry" property is used. */
    earthModel: earthModelSchema.optional(),

    /** Array of CNData names for use in a cable constants calculation.
     *
     * Must be used in conjunction with the Spacing property.
     *
     * Specify the Spacing first, using "nphases" cncables.
     *
     * You may later specify "nconds-nphases" wires for separate neutrals.
     *
     * Redundant with wires */
    cnCables: z.string().array().optional(),

    /** Array of TSData names for use in a cable constants calculation.
     *
     * Must be used in conjunction with the Spacing property.
     *
     * Specify the Spacing first, using "nphases" tscables.
     *
     * You may later specify "nconds-nphases" wires for separate neutrals.
     *
     * Redundant with wires */
    tsCables: z.string().array().optional(),

    /** Alternate way to specify C1. MicroS per unit length.
     *
     * Redundant with C1 */
    b1: z.number().optional(),

    /** Alternate way to specify C0. MicroS per unit length.
     *
     * Redundant with C0 */
    b0: z.number().optional(),

    /** Defines the number of ratings to be defined for the wire, to be used only when defining seasonal ratings using the "Ratings" property. */
    seasons: z.number().optional(),

    /** An array of ratings to be used when the seasonal ratings flag is True. It can be used to insert.
     *
     * Multiple ratings to change during a QSTS simulation to evaluate different ratings in lines. */
    ratings: z.number().array().optional(),

    /** Code designating the type of line.
     *
     * One of: OH, UG, UG_TS, UG_CN, SWT_LDBRK, SWT_FUSE, SWT_SECT, SWT_REC, SWT_DISC, SWT_BRK, SWT_ELBOW.
     *
     * OpenDSS currently does not use this internally. For whatever purpose the user defines. Default is OH. */
    lineType: z.string().optional(),

    /** Normal rated current. */
    normAmps: z.number().optional(),

    /** Maximum or emerg current. */
    emergAmps: z.number().optional(),

    /** Failure rate PER UNIT LENGTH per year. Length must be same units as LENGTH property. Default is 0.1 fault per unit length per year. */
    faultRate: z.number().optional(),

    /** Percent of failures that become permanent. Default is 20. */
    pctperm: z.number().optional(),

    /** Hours to repair. Default is 3 hr. */
    repair: z.number().optional(),

    /** Base Frequency for ratings. */
    baseFreq: z.number().optional(),

    /** {Yes|No or True|False} Indicates whether this element is enabled. */
    enabled: z.boolean().optional(),
});

export type LineParameters = z.infer<typeof lineSchema>;

export const opendssLineSchema = baseOpenDSSElementSchema.extend({
    bus1: z.string().optional(),
    bus2: z.string().optional(),
    lineCode: z.string().optional(),
    length: z.string().optional(),
    phases: z.string().optional(),
    r1: z.string().optional(),
    x1: z.string().optional(),
    r0: z.string().optional(),
    x0: z.string().optional(),
    c1: z.string().optional(),
    c0: z.string().optional(),
    rMatrix: z.string().optional(),
    xMatrix: z.string().optional(),
    cMatrix: z.string().optional(),
    switch: z.string().optional(),
    rg: z.string().optional(),
    xg: z.string().optional(),
    rho: z.string().optional(),
    geometry: z.string().optional(),
    units: unitsSchema.optional(),
    spacing: z.string().optional(),
    wires: z.string().optional(),
    earthModel: earthModelSchema.optional(),
    cnCables: z.string().optional(),
    tsCables: z.string().optional(),
    b1: z.string().optional(),
    b0: z.string().optional(),
    seasons: z.string().optional(),
    ratings: z.string().optional(),
    lineType: z.string().optional(),
    normAmps: z.string().optional(),
    emergAmps: z.string().optional(),
    faultRate: z.string().optional(),
    pctperm: z.string().optional(),
    repair: z.string().optional(),
    baseFreq: z.string().optional(),
    enabled: z.string().optional(),
});

export type OpenDSSLineParameters = z.infer<typeof opendssLineSchema>;
