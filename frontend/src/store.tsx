import {
    scales,
    type Chord,
    type NoteToken,
    type Scale,
} from "./utility/theoryData";
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
    setMode: (mode: "scale" | "chord") => void;
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
    clearFilter: () => void;
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
    clearFilter: () => set(() => ({ filter: [] })),
}));

const initialScaleDegreeState = {
    degree: 1,
};
type ScaleDegreeState = typeof initialScaleDegreeState;
type ScaleDegreeActions = {
    setDegree: (degree: number) => void;
    reset: () => void;
};

export const useScaleDegreeStore = create<
    ScaleDegreeState & ScaleDegreeActions
>()((set) => ({
    ...initialScaleDegreeState,
    setDegree: (degree) => set(() => ({ degree })),
    reset: () => set(initialScaleDegreeState),
}));

interface DisplaySeventhState {
    displaySeventh: boolean;
    setDisplaySeventh: (displaySeventh: boolean) => void;
}

export const useDisplaySeventhStore = create<DisplaySeventhState>()((set) => ({
    displaySeventh: true,
    setDisplaySeventh: (displaySeventh) => set(() => ({ displaySeventh })),
}));
