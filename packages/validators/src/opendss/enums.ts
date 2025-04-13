import { z } from "zod";

export const cktModelSchema = z.enum(["Multiphase", "Positive"]);

export type CktModelEnum = z.infer<typeof cktModelSchema>;

export const controlModeOptionSchema = z.enum([
    "OFF",
    "STATIC",
    "EVENT",
    "TIME",
]);

export type ControlModeOptionEnum = z.infer<typeof controlModeOptionSchema>;

export const randomSchema = z.enum([
    "Uniform",
    "Gaussian",
    "Lognormal",
    "None",
]);

export type RandomEnum = z.infer<typeof randomSchema>;

export const loadModelSchema = z.enum(["Powerflow", "Admittance"]);

export type LoadModelEnum = z.infer<typeof loadModelSchema>;

export const loadShapeClassSchema = z.enum(["Daily", "Yearly", "Duty", "None"]);

export type LoadShapeClassEnum = z.infer<typeof loadShapeClassSchema>;

export const modeSchema = z.enum([
    "Daily",
    "Yearly DIrect",
    "DUtycycle",
    "Time",
    "DYnamic",
    "Harmonic",
    "HarmonicT",
    "M1",
    "M2",
    "M3",
    "Faultstudy",
    "MF",
    "Peakday",
    "LD1",
    "LD2",
    "AutoAdd",
    "YearlyVQ",
    "DutyVQ",
]);

export type ModeEnum = z.infer<typeof modeSchema>;

export const reduceOptionSchema = z.enum([
    "Default",
    "Shortlines",
    "MergeParallel",
    "BreakLoops",
    "Switches",
    "Ends",
    "Laterals",
]);

export type ReduceOptionEnum = z.infer<typeof reduceOptionSchema>;

export const scanTypeSchema = z.enum(["pos", "zero", "none"]);

export type ScanTypeEnum = z.infer<typeof scanTypeSchema>;

export const sequenceSchema = z.enum(["pos", "zero", "none"]);

export type SequenceEnum = z.infer<typeof sequenceSchema>;

export const unitsSchema = z.enum(["mi", "kft", "km", "m", "Ft", "in", "cm"]);

export type UnitsEnum = z.infer<typeof unitsSchema>;

export const earthModelSchema = z.enum(["Carson", "FullCarson", "Deri"]);

export type EarthModelEnum = z.infer<typeof earthModelSchema>;

export const connSchema = z.enum(["wye", "delta", "LN", "LL"]);

export type ConnEnum = z.infer<typeof connSchema>;

export const modelSchema = z.enum(["Thevenin", "Ideal"]);

export type ModelEnum = z.infer<typeof modelSchema>;

export const allUnitsSchema = z.enum([
    "mi",
    "kft",
    "km",
    "m",
    "Ft",
    "in",
    "cm",
    "mm",
]);

export type AllUnitsEnum = z.infer<typeof allUnitsSchema>;
