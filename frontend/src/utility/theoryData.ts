export type IntervalToken =
    | "R"
    | "d2"
    | "A1"
    | "m2"
    | "M2"
    | "d3"
    | "A2"
    | "m3"
    | "M3"
    | "d4"
    | "A3"
    | "P4"
    | "A4"
    | "d5"
    | "P5"
    | "d6"
    | "A5"
    | "m6"
    | "M6"
    | "d7"
    | "A6"
    | "m7"
    | "M7"
    | "P8"
    | "d9"
    | "A8"
    | "m9"
    | "M9"
    | "d10"
    | "A9"
    | "m10"
    | "M10"
    | "d11"
    | "A10"
    | "P11"
    | "A11"
    | "d12"
    | "P12"
    | "d13"
    | "A12"
    | "m13"
    | "M13"
    | "d14"
    | "A13"
    | "m14"
    | "M14"
    | "P15";

export const noteMap: string[] = [
    "C",
    "C#/Db",
    "D",
    "D#/Eb",
    "E",
    "F",
    "F#/Gb",
    "G",
    "G#/Ab",
    "A",
    "A#/Bb",
    "B",
] as const;

export type NoteToken = (typeof noteMap)[number];

// Duplicate semitone values allowed to distinguish between different intervals
// ex: Major 3rd and Diminished 4th are both 4 semitones
export const intervalMap: Record<IntervalToken, number> = {
    R: 0,
    d2: 0,
    A1: 1,
    m2: 1,
    M2: 2,
    d3: 2,
    A2: 3,
    m3: 3,
    M3: 4,
    d4: 4,
    A3: 5,
    P4: 5,
    A4: 6,
    d5: 6,
    P5: 7,
    d6: 7,
    A5: 8,
    m6: 8,
    M6: 9,
    d7: 9,
    A6: 10,
    m7: 10,
    M7: 11,
    P8: 12,
    d9: 12,
    A8: 13,
    m9: 13,
    M9: 14,
    d10: 14,
    A9: 15,
    m10: 15,
    M10: 16,
    d11: 16,
    A10: 17,
    P11: 17,
    A11: 18,
    d12: 18,
    P12: 19,
    d13: 19,
    A12: 20,
    m13: 20,
    M13: 21,
    d14: 21,
    A13: 22,
    m14: 22,
    M14: 23,
    P15: 24,
};

export interface Scale {
    id: string;
    label: string;
    composition: IntervalToken[];
    tags?: string[];
}

export interface Chord {
    id: string;
    label: string;
    composition: IntervalToken[];
    tags?: string[];
}

export type ShapeId = Scale["id"] | Chord["id"];

export const scales: Scale[] = [
    // --- DIATONIC MODES (Major Scale) ---
    {
        id: "ionian",
        label: "Ionian (Major)",
        composition: ["R", "M2", "M3", "P4", "P5", "M6", "M7"],
        tags: ["major", "diatonic", "bright"],
    },
    {
        id: "dorian",
        label: "Dorian",
        composition: ["R", "M2", "m3", "P4", "P5", "M6", "m7"],
        tags: ["minor", "diatonic", "neutral"],
    },
    {
        id: "phrygian",
        label: "Phrygian",
        composition: ["R", "m2", "m3", "P4", "P5", "m6", "m7"],
        tags: ["minor", "diatonic", "dark"],
    },
    {
        id: "lydian",
        label: "Lydian",
        composition: ["R", "M2", "M3", "A4", "P5", "M6", "M7"],
        tags: ["major", "diatonic", "bright"],
    },
    {
        id: "mixolydian",
        label: "Mixolydian",
        composition: ["R", "M2", "M3", "P4", "P5", "M6", "m7"],
        tags: ["major", "diatonic", "neutral"],
    },
    {
        id: "aeolian",
        label: "Aeolian (Natural Minor)",
        composition: ["R", "M2", "m3", "P4", "P5", "m6", "m7"],
        tags: ["minor", "diatonic", "dark"],
    },
    {
        id: "locrian",
        label: "Locrian",
        composition: ["R", "m2", "m3", "P4", "d5", "m6", "m7"],
        tags: ["diminished", "diatonic", "dark"],
    },

    // --- MELODIC MINOR MODES ---
    {
        id: "melodic-minor",
        label: "Melodic Minor",
        composition: ["R", "M2", "m3", "P4", "P5", "M6", "M7"],
        tags: ["minor", "melodic minor", "neutral"],
    },
    {
        id: "dorian-b2",
        label: "Dorian ♭2",
        composition: ["R", "m2", "m3", "P4", "P5", "M6", "m7"],
        tags: ["minor", "melodic minor", "dark"],
    },
    {
        id: "lydian-augmented",
        label: "Lydian Augmented",
        composition: ["R", "M2", "M3", "A4", "A5", "M6", "M7"],
        tags: ["augmented", "melodic minor", "bright"],
    },
    {
        id: "lydian-dominant",
        label: "Lydian Dominant",
        composition: ["R", "M2", "M3", "A4", "P5", "M6", "m7"],
        tags: ["dominant", "melodic minor", "bright"],
    },
    {
        id: "mixolydian-b6",
        label: "Mixolydian ♭6 (Hindu)",
        composition: ["R", "M2", "M3", "P4", "P5", "m6", "m7"],
        tags: ["dominant", "melodic minor", "neutral"],
    },
    {
        id: "locrian-nat2",
        label: "Locrian ♮2",
        composition: ["R", "M2", "m3", "P4", "d5", "m6", "m7"],
        tags: ["diminished", "melodic minor", "dark"],
    },
    {
        id: "super-locrian",
        label: "Super Locrian (Altered)",
        composition: ["R", "m2", "m3", "d4", "d5", "m6", "m7"],
        tags: ["altered", "melodic minor", "dark"],
    },

    // --- HARMONIC MINOR MODES ---
    {
        id: "harmonic-minor",
        label: "Harmonic Minor",
        composition: ["R", "M2", "m3", "P4", "P5", "m6", "M7"],
        tags: ["minor", "harmonic minor", "dark"],
    },
    {
        id: "locrian-nat6",
        label: "Locrian ♮6",
        composition: ["R", "m2", "m3", "P4", "d5", "M6", "m7"],
        tags: ["diminished", "harmonic minor", "dark"],
    },
    {
        id: "ionian-sharp5",
        label: "Ionian ♯5",
        composition: ["R", "M2", "M3", "P4", "A5", "M6", "M7"],
        tags: ["augmented", "harmonic minor", "bright"],
    },
    {
        id: "dorian-sharp4",
        label: "Dorian ♯4 (Ukrainian)",
        composition: ["R", "M2", "m3", "A4", "P5", "M6", "m7"],
        tags: ["minor", "harmonic minor", "neutral"],
    },
    {
        id: "phrygian-dominant",
        label: "Phrygian Dominant",
        composition: ["R", "m2", "M3", "P4", "P5", "m6", "m7"],
        tags: ["dominant", "harmonic minor", "exotic"],
    },
    {
        id: "lydian-sharp2",
        label: "Lydian ♯2",
        composition: ["R", "A2", "M3", "A4", "P5", "M6", "M7"],
        tags: ["major", "harmonic minor", "bright"],
    },
    {
        id: "super-locrian-bb7",
        label: "Super Locrian ♭♭7",
        composition: ["R", "m2", "m3", "d4", "d5", "m6", "d7"],
        tags: ["diminished", "harmonic minor", "dark"],
    },

    // --- PENTATONIC MODES ---
    {
        id: "pentatonic-major",
        label: "Major Pentatonic (Mode 1)",
        composition: ["R", "M2", "M3", "P5", "M6"],
        tags: ["major", "pentatonic", "bright"],
    },
    {
        id: "pentatonic-sus",
        label: "Suspended Pentatonic (Mode 2)",
        composition: ["R", "M2", "P4", "P5", "m7"],
        tags: ["suspended", "pentatonic", "neutral"],
    },
    {
        id: "pentatonic-man-gong",
        label: "Man Gong (Mode 3)",
        composition: ["R", "m3", "P4", "m6", "m7"],
        tags: ["minor", "pentatonic", "dark"],
    },
    {
        id: "pentatonic-ritusen",
        label: "Ritusen (Mode 4)",
        composition: ["R", "M2", "P4", "P5", "M6"],
        tags: ["major", "pentatonic", "neutral"],
    },
    {
        id: "pentatonic-minor",
        label: "Minor Pentatonic (Mode 5)",
        composition: ["R", "m3", "P4", "P5", "m7"],
        tags: ["minor", "pentatonic", "dark"],
    },

    // --- SYMMETRIC & EXOTIC ---
    {
        id: "chromatic",
        label: "Chromatic",
        composition: ["R", "m2", "M2", "m3", "M3", "P4", "A4", "P5", "m6", "M6", "m7", "M7"],
        tags: ["symmetric", "exotic", "neutral"],
    },
    {
        id: "whole-tone",
        label: "Whole Tone",
        composition: ["R", "M2", "M3", "A4", "A5", "m7"],
        tags: ["symmetric", "hexatonic", "dominant", "bright"],
    },
    {
        id: "diminished-half-whole",
        label: "Diminished (Half-Whole)",
        composition: ["R", "m2", "m3", "M3", "A4", "P5", "M6", "m7"],
        tags: ["symmetric", "octatonic", "dominant", "dark"],
    },
    {
        id: "diminished-whole-half",
        label: "Diminished (Whole-Half)",
        composition: ["R", "M2", "m3", "P4", "d5", "m6", "M6", "M7"],
        tags: ["symmetric", "octatonic", "diminished", "dark"],
    },
    {
        id: "blues",
        label: "Blues",
        composition: ["R", "m3", "P4", "d5", "P5", "m7"],
        tags: ["minor", "blues", "hexatonic", "dark"],
    },
    {
        id: "hungarian-minor",
        label: "Hungarian Minor",
        composition: ["R", "M2", "m3", "A4", "P5", "m6", "M7"],
        tags: ["minor", "exotic", "dark"],
    },
    {
        id: "double-harmonic-major",
        label: "Double Harmonic Major (Byzantine)",
        composition: ["R", "m2", "M3", "P4", "P5", "m6", "M7"],
        tags: ["major", "exotic", "bright"],
    },
];

export const chords: Chord[] = [
    {
        id: "major-triad",
        label: "Major",
        composition: ["R", "M3", "P5"],
        tags: ["major", "triad", "bright"],
    },
    {
        id: "minor-triad",
        label: "Minor",
        composition: ["R", "m3", "P5"],
        tags: ["minor", "triad", "dark"],
    },
    {
        id: "diminished-triad",
        label: "Diminished",
        composition: ["R", "m3", "d5"],
        tags: ["diminished", "triad", "dark"],
    },
    {
        id: "augmented-triad",
        label: "Augmented",
        composition: ["R", "M3", "A5"],
        tags: ["augmented", "triad", "bright"],
    },
    {
        id: "sus2-triad",
        label: "Sus2",
        composition: ["R", "M2", "P5"],
        tags: ["suspended", "triad", "neutral"],
    },
    {
        id: "sus4-triad",
        label: "Sus4",
        composition: ["R", "P4", "P5"],
        tags: ["suspended", "triad", "neutral"],
    },
    {
        id: "major-7",
        label: "Maj7",
        composition: ["R", "M3", "P5", "M7"],
        tags: ["major", "seventh", "bright"],
    },
    {
        id: "minor-7",
        label: "Min7",
        composition: ["R", "m3", "P5", "m7"],
        tags: ["minor", "seventh", "dark"],
    },
    {
        id: "minor-major-7",
        label: "MinMaj7",
        composition: ["R", "m3", "P5", "M7"],
        tags: ["minor", "seventh", "exotic"],
    },
    {
        id: "dominant-7",
        label: "7",
        composition: ["R", "M3", "P5", "m7"],
        tags: ["dominant", "seventh", "neutral"],
    },
    {
        id: "half-diminished-7",
        label: "ø7",
        composition: ["R", "m3", "d5", "m7"],
        tags: ["diminished", "seventh", "dark"],
    },
    {
        id: "diminished-7",
        label: "dim7",
        composition: ["R", "m3", "d5", "d7"],
        tags: ["diminished", "seventh", "dark"],
    },
    {
        id: "major-9",
        label: "Maj9",
        composition: ["R", "M3", "P5", "M7", "M9"],
        tags: ["major", "extended", "bright"],
    },
    {
        id: "minor-9",
        label: "Min9",
        composition: ["R", "m3", "P5", "m7", "M9"],
        tags: ["minor", "extended", "dark"],
    },
    {
        id: "dominant-9",
        label: "9",
        composition: ["R", "M3", "P5", "m7", "M9"],
        tags: ["dominant", "extended", "neutral"],
    },
    {
        id: "dominant-11",
        label: "11",
        composition: ["R", "M3", "P5", "m7", "M9", "P11"],
        tags: ["dominant", "extended", "neutral"],
    },
    {
        id: "dominant-13",
        label: "13",
        composition: ["R", "M3", "P5", "m7", "M9", "P11", "M13"],
        tags: ["dominant", "extended", "neutral"],
    },
];

export const scaleTags: Set<string> = new Set(
    scales.flatMap((scale) => scale.tags ?? []),
);
export const chordTags: Set<string> = new Set(
    chords.flatMap((chord) => chord.tags ?? []),
);
