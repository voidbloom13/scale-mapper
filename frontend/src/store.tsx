import {
    scales,
    type Chord,
    type NoteToken,
    type Scale,
} from "./utility/theoryData";
import {
    type InstrumentFamily,
    type GuitarVariant,
    type GuitarVariantDefinition,
    type BassVariant,
    type BassVariantDefinition,
    type KeyboardVariant,
    type KeyboardVariantDefinition,
    type TuningDefinition,
    guitarVariants,
    bassVariants,
    keyboardVariants,
    tunings,
    stringViewOptions,
    keyboardViewOptions,
} from "./utility/instrumentData";
import { create } from "zustand";

/**
 * THEORY STORE
 * Manages musical state: root note, scale/chord shape, scale degree, and display preferences.
 */
interface TheoryState {
    root: NoteToken;
    shape: Scale | Chord;
    degree: number;
    displaySeventh: boolean;
    setRoot: (root: NoteToken) => void;
    setShape: (shape: Scale | Chord) => void;
    setDegree: (degree: number) => void;
    setDisplaySeventh: (displaySeventh: boolean) => void;
    resetDegree: () => void;
}

export const useTheoryStore = create<TheoryState>()((set) => ({
    root: "C",
    shape: scales[0],
    degree: 1,
    displaySeventh: true,
    setRoot: (root) => set({ root }),
    setShape: (shape) => set({ shape }),
    setDegree: (degree) => set({ degree }),
    setDisplaySeventh: (displaySeventh) => set({ displaySeventh }),
    resetDegree: () => set({ degree: 1 }),
}));

/**
 * FILTER STORE
 * Manages operational mode (scale/chord) and tag filters for shapes.
 */
export type Mode = "scale" | "chord";
interface FilterState {
    mode: Mode;
    filter: string[];
    setMode: (mode: Mode) => void;
    setFilter: (filter: string[]) => void;
    toggleFilter: (tag: string) => void;
    resetFilter: () => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
    mode: "scale",
    filter: [],
    setMode: (mode) => set({ mode }),
    setFilter: (filter) => set({ filter }),
    toggleFilter: (tag) =>
        set((state) => ({
            filter: state.filter.includes(tag)
                ? state.filter.filter((t) => t !== tag)
                : [...state.filter, tag],
        })),
    resetFilter: () => set({ filter: [] }),
}));

/**
 * INSTRUMENT STORE
 * Manages physical instrument state: family, variant, tuning, and viewport.
 */
interface InstrumentState {
    instrumentFamily: InstrumentFamily;
    instrumentVariant:
        | GuitarVariantDefinition
        | BassVariantDefinition
        | KeyboardVariantDefinition;
    tuning: TuningDefinition | null;
    view: number;
    setInstrumentFamily: (instrumentFamily: InstrumentFamily) => void;
    setInstrumentVariant: (
        instrumentVariant: GuitarVariant | BassVariant | KeyboardVariant,
    ) => void;
    setTuning: (tuning: TuningDefinition["id"]) => void;
    setView: (
        view:
            | (typeof stringViewOptions)[number]
            | (typeof keyboardViewOptions)[number],
    ) => void;
}

export const useInstrumentStore = create<InstrumentState>()((set) => ({
    instrumentFamily: "guitar",
    instrumentVariant: guitarVariants[0],
    tuning: tunings[0],
    view: 12,
    setInstrumentFamily: (instrumentFamily: InstrumentFamily) => {
        let variant:
            | GuitarVariantDefinition
            | BassVariantDefinition
            | KeyboardVariantDefinition;
        let tuning: TuningDefinition | null;
        let view:
            | (typeof stringViewOptions)[number]
            | (typeof keyboardViewOptions)[number];
        switch (instrumentFamily) {
            case "guitar":
                variant = guitarVariants[0];
                tuning = tunings.find(
                    (t) => t.variant === variant.id,
                ) as TuningDefinition;
                view = stringViewOptions[1];
                break;
            case "bass":
                variant = bassVariants[0];
                tuning = tunings.find(
                    (t) => t.variant === variant.id,
                ) as TuningDefinition;
                view = stringViewOptions[1];
                break;
            case "keyboard":
                variant = keyboardVariants[0];
                tuning = null;
                view = variant.keyCount;
                break;
            default:
                throw new Error(
                    "Unknown Instrument Type: no instruments or variants to return.",
                );
        }

        set({
            instrumentFamily: instrumentFamily,
            instrumentVariant: variant,
            tuning: tuning,
            view: view,
        });
    },
    setInstrumentVariant: (
        instrumentVariant: GuitarVariant | BassVariant | KeyboardVariant,
    ) => {
        let instrumentVariantDefinition:
            | GuitarVariantDefinition
            | BassVariantDefinition
            | KeyboardVariantDefinition;
        let tuning: TuningDefinition | null;
        let view:
            | (typeof stringViewOptions)[number]
            | (typeof keyboardViewOptions)[number];
        switch (true) {
            case instrumentVariant.includes("guitar"):
                instrumentVariantDefinition = guitarVariants.find(
                    (i) => i.id === instrumentVariant,
                ) as GuitarVariantDefinition;
                tuning = tunings.find(
                    (t) => t.variant === instrumentVariant,
                ) as TuningDefinition;
                view = stringViewOptions[1];
                break;
            case instrumentVariant.includes("bass"):
                instrumentVariantDefinition = bassVariants.find(
                    (i) => i.id === instrumentVariant,
                ) as BassVariantDefinition;
                tuning = tunings.find(
                    (t) => t.variant === instrumentVariant,
                ) as TuningDefinition;
                view = stringViewOptions[1];
                break;
            case instrumentVariant.includes("keyboard"):
                instrumentVariantDefinition = keyboardVariants.find(
                    (i) => i.id === instrumentVariant,
                ) as KeyboardVariantDefinition;
                tuning = null;
                view = instrumentVariantDefinition.keyCount;
                break;
            default:
                throw new Error(
                    "Unknown Instrument Type: no instruments or variants to return.",
                );
        }

        set({
            instrumentVariant: instrumentVariantDefinition,
            tuning: tuning,
            view: view,
        });
    },

    setTuning: (tuningID: TuningDefinition["id"]) => {
        const tuning = tunings.find((t) => t.id === tuningID);
        const view = stringViewOptions[1];
        set({ tuning: tuning, view: view });
    },

    setView: (view: number) => {
        set({ view: view });
    },
}));
