import { z } from "zod";

import { baseElementSchema, baseOpenDSSElementSchema } from "./baseElement";
import { busSchema } from "./bus";

export const faultSchema = baseElementSchema.extend({
    /** Name of first bus. Examples:
     * bus1=busname.
     * Bus1=busname.1.2.3.
     * Bus2 automatically defaults to busname.0,0,0 unless it was previously defined. */
    bus1: busSchema.optional(),
    /** Name of 2nd bus of the 2-terminal Fault object. Defaults to all phases connected to first bus, node 0, if not specified. (Shunt Wye Connection to ground reference).
     * That is, the Fault defaults to a ground fault unless otherwise specified. */
    bus2: busSchema.optional(),
    /** Number of Phases. Default is 1. */
    phases: z.number().optional(),
    /** Resistance, each phase, ohms. Default is 0.0001. Assumed to be Mean value if gaussian random mode.Max value if uniform mode.  A Fault is actually a series resistance that defaults to a wye connection to ground on the second terminal.  You may reconnect the 2nd terminal to achieve whatever connection.  Use the Gmatrix property to specify an arbitrary conductance matrix. */
    r: z.number().optional(),
    /** Percent standard deviation in resistance to assume for Monte Carlo fault (MF) solution mode for GAUSSIAN distribution. Default is 0 (no variation from mean). */
    "%stddev": z.number().optional(),
    /** Use this to specify a nodal conductance (G) matrix to represent some arbitrary resistance network. Specify in lower triangle form as usual for DSS matrices. */
    gMatrix: z.number().array().optional(),
    /** Time (sec) at which the fault is established for time varying simulations. Default is 0.0 (on at the beginning of the simulation). */
    onTime: z.number().optional(),
    /** Default is False.  Designate whether the fault is temporary.  For Time-varying simulations, the fault will be removed if the current through the fault drops below the MINAMPS criteria. */
    temporary: z.boolean().optional(),
    /** Minimum amps that can sustain a temporary fault. Default is 5. */
    minAmps: z.number().optional(),
    /** Normal rated current. */
    normAmps: z.number().optional(),
    /** Maximum or emergency current. */
    emergAmps: z.number().optional(),
    /** Failure rate per year. */
    faultRate: z.number().optional(),
    /** Percent of failures that become permanent. */
    pctperm: z.number().optional(),
    /** Hours to repair. */
    repair: z.number().optional(),
    /** Base Frequency for ratings. */
    baseFreq: z.number().optional(),
    /** Indicates whether this element is enabled. */
    enabled: z.boolean().optional(),
});

export type FaultParameters = z.infer<typeof faultSchema>;

export const opendssFaultSchema = baseOpenDSSElementSchema.extend({
    name: z.string(),
    bus1: z.string().optional(),
    bus2: z.string().optional(),
    phases: z.string().optional(),
    r: z.string().optional(),
    "%stddev": z.string().optional(),
    gMatrix: z.string().optional(),
    onTime: z.string().optional(),
    temporary: z.string().optional(),
    minAmps: z.string().optional(),
    normAmps: z.string().optional(),
    emergAmps: z.string().optional(),
    faultRate: z.string().optional(),
    pctperm: z.string().optional(),
    repair: z.string().optional(),
    baseFreq: z.string().optional(),
    enabled: z.string().optional(),
});

export type OpenDSSFaultParameters = z.infer<typeof opendssFaultSchema>;
