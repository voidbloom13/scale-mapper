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

interface RootState {
    root: NoteToken;
    setRoot: (root: NoteToken) => void;
}

export const useRootStore = create<RootState>()((set) => ({
    root: "C",
    setRoot: (root) => set(() => ({ root })),
}));

export type Mode = "scale" | "chord";
interface ModeState {
    mode: Mode;
    setMode: (mode: Mode) => void;
}

export const useModeStore = create<ModeState>()((set) => ({
    mode: "scale",
    setMode: (mode) => set(() => ({ mode })),
}));

interface ShapeState {
    shape: Scale | Chord;
    setShape: (shape: Scale | Chord) => void;
}

export const useShapeStore = create<ShapeState>()((set) => ({
    shape: scales[0],
    setShape: (shape) => set(() => ({ shape })),
}));

interface FilterState {
    filter: string[];
    setFilter: (filter: string[]) => void;
    toggleFilter: (tag: string) => void;
    reset: () => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
    filter: [],
    setFilter: (filter) => set(() => ({ filter })),
    toggleFilter: (tag) =>
        set((state) => ({
            filter: state.filter.includes(tag)
                ? state.filter.filter((t) => t !== tag)
                : [...state.filter, tag],
        })),
    reset: () => set(() => ({ filter: [] })),
}));

interface ScaleDegreeState {
    degree: number;
    setDegree: (degree: number) => void;
    reset: () => void;
}

export const useScaleDegreeStore = create<ScaleDegreeState>()((set) => ({
    degree: 1,
    setDegree: (degree: number) => set(() => ({ degree })),
    reset: () => set({ degree: 1 }),
}));

interface DisplaySeventhState {
    displaySeventh: boolean;
    setDisplaySeventh: (displaySeventh: boolean) => void;
}

export const useDisplaySeventhStore = create<DisplaySeventhState>()((set) => ({
    displaySeventh: true,
    setDisplaySeventh: (displaySeventh) => set(() => ({ displaySeventh })),
}));

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
                view = keyboardViewOptions[1];
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
                view = keyboardViewOptions[1];
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
        let view: (typeof stringViewOptions)[number] = stringViewOptions[1];
        set({ tuning: tuning, view: view });
    },

    setView: (view: number) => {
        set({ view: view });
    },
}));
