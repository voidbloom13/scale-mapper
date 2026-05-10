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
    shape: string;
    setShape: (shape: string) => void;
}

export const useShapeStore = create<ShapeState>()((set) => ({
    shape: scales[0].id,
    setShape: (shape) => set(() => ({ shape })),
}));

interface ShapeFilterState {
    filter?: string;
    setFilter: (filter: string) => void;
}

export const useShapeFilterStore = create<ShapeFilterState>()((set) => ({
    filter: "",
    setFilter: (filter) => set(() => ({ filter })),
}));
