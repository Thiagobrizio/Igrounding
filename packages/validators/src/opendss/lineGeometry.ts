import { z } from "zod";

import { baseElementSchema, baseOpenDSSElementSchema } from "./baseElement";
import { unitsSchema } from "./enums";

export const lineGeometrySchema = baseElementSchema.extend({
    /** Number of conductors in this geometry. Default is 3. Triggers memory allocations. Define first! */
    nconds: z.number().optional(),
    /** Number of phases. Default =3; All other conductors are considered neutrals and might be reduced out. */
    nphases: z.number().optional(),
    /** Set this = number of the conductor you wish to define. Default is 1. */
    cond: z.number().optional(),
    /** Code from WireData. MUST BE PREVIOUSLY DEFINED. No default.
     *
     * Specifies use of Overhead Line parameter calculation,.
     *
     * Unless Tape Shield cable previously assigned to phases, and this wire is a neutral. */
    wire: z.string().optional(),
    /** X coordinate. */
    x: z.number().optional(),
    /** Height of conductor. */
    h: z.number().optional(),
    /** Units for x and h: {mi|kft|km|m|Ft|in|cm } Initial default is "ft", but defaults to last unit defined */
    units: unitsSchema.optional(),
    /** Normal ampacity, amperes for the line. Defaults to first conductor if not specified. */
    normAmps: z.number().optional(),
    /** Emergency ampacity, amperes. Defaults to first conductor if not specified. */
    emergAmps: z.number().optional(),
    /** {Yes | No} Default = no. Reduce to Nphases (Kron Reduction). Reduce out neutrals. */
    reduce: z.boolean().optional(),
    /** Reference to a LineSpacing for use in a line constants calculation.
     *
     * Alternative to x, h, and units. MUST BE PREVIOUSLY DEFINED.
     *
     * Must match "nconds" as previously defined for this geometry.
     *
     * Must be used in conjunction with the Wires property. */

    spacing: z.string().optional(),
    /** Array of WireData names for use in a line constants calculation.
     *
     * Alternative to individual wire inputs. ALL MUST BE PREVIOUSLY DEFINED.
     *
     * Must match "nconds" as previously defined for this geometry,.
     *
     * Unless TSData or CNData were previously assigned to phases, and these wires are neutrals.
     *
     * Must be used in conjunction with the Spacing property.
     *
     * Redundant with wire */
    wires: z.array(z.string()).optional(),
    /** Code from CNData. MUST BE PREVIOUSLY DEFINED. No default.
     *
     * Specifies use of Concentric Neutral cable parameter calculation.
     *
     * Redundant with wire */
    cncable: z.string().optional(),
    /** Code from TSData. MUST BE PREVIOUSLY DEFINED. No default.
     *
     * Specifies use of Tape Shield cable parameter calculation.
     *
     * Redundant with wire */
    tscable: z.string().optional(),
    /** Array of CNData names for cable parameter calculation.
     *
     * All must be previously defined, and match "nphases" for this geometry.
     *
     * You can later define "nconds-nphases" wires for bare neutral conductors.
     *
     * Redundant with cncable */
    cncables: z.string().array().optional(),
    /** Array of TSData names for cable parameter calculation.
     *
     * All must be previously defined, and match "nphases" for this geometry.
     *
     * You can later define "nconds-nphases" wires for bare neutral conductors.
     *
     * Redundant with tscable */
    tscables: z.string().array().optional(),
    /** Defines the number of ratings to be defined for the wire, to be used only when defining seasonal ratings using the "Ratings" property. Defaults to first conductor if not specified. */
    seasons: z.number().optional(),
    /** An array of ratings to be used when the seasonal ratings flag is True. It can be used to insert.
     *
     * Multiple ratings to change during a QSTS simulation to evaluate different ratings in lines.Defaults to first conductor if not specified. */
    ratings: z.number().array().optional(),
    /** Code designating the type of line.
     *
     * One of: OH, UG, UG_TS, UG_CN, SWT_LDBRK, SWT_FUSE, SWT_SECT, SWT_REC, SWT_DISC, SWT_BRK, SWT_ELBOW.
     *
     * OpenDSS currently does not use this internally. For whatever purpose the user defines. Default is OH. */
    lineType: z.string().optional(),
});

export type LineGeometryParameters = z.infer<typeof lineGeometrySchema>;

export const opendssLineGeometrySchema = baseOpenDSSElementSchema.extend({
    name: z.string(),
    nconds: z.string().optional(),
    nphases: z.string().optional(),
    cond: z.string().optional(),
    wire: z.string().optional(),
    x: z.string().optional(),
    h: z.string().optional(),
    units: unitsSchema.optional(),
    normAmps: z.string().optional(),
    emergAmps: z.string().optional(),
    reduce: z.string().optional(),
    spacing: z.string().optional(),
    wires: z.string().optional(),
    cncable: z.string().optional(),
    tscable: z.string().optional(),
    cncables: z.string().optional(),
    tscables: z.string().optional(),
    seasons: z.string().optional(),
    ratings: z.string().optional(),
    lineType: z.string().optional(),
});

export type OpenDSSLineGeometryParameters = z.infer<
    typeof opendssLineGeometrySchema
>;
