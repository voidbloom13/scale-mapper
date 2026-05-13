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
export const intervalMap: Record<string, number> = {
    R1: 0,
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
} as const;
export type IntervalToken = keyof typeof intervalMap;
export type SemitoneValue = (typeof intervalMap)[IntervalToken];

export interface Scale {
    id: string;
    type: "scale";
    label: string;
    composition: IntervalToken[];
    tags?: string[];
    derivesChordsFrom: boolean;
}

export interface Chord {
    id: string;
    type: "chord";
    label: string;
    composition: IntervalToken[];
    tags?: string[];
}

export type ShapeId = Scale["id"] | Chord["id"];

export const scales: Scale[] = [
    // --- DIATONIC MODES (Major Scale) ---
    {
        id: "ionian",
        type: "scale",
        label: "Ionian (Major)",
        composition: ["R1", "M2", "M3", "P4", "P5", "M6", "M7"],
        tags: ["major", "diatonic", "bright"],
        derivesChordsFrom: true,
    },
    {
        id: "dorian",
        type: "scale",
        label: "Dorian",
        composition: ["R1", "M2", "m3", "P4", "P5", "M6", "m7"],
        tags: ["minor", "diatonic", "neutral"],
        derivesChordsFrom: true,
    },
    {
        id: "phrygian",
        type: "scale",
        label: "Phrygian",
        composition: ["R1", "m2", "m3", "P4", "P5", "m6", "m7"],
        tags: ["minor", "diatonic", "dark"],
        derivesChordsFrom: true,
    },
    {
        id: "lydian",
        type: "scale",
        label: "Lydian",
        composition: ["R1", "M2", "M3", "A4", "P5", "M6", "M7"],
        tags: ["major", "diatonic", "bright"],
        derivesChordsFrom: true,
    },
    {
        id: "mixolydian",
        type: "scale",
        label: "Mixolydian",
        composition: ["R1", "M2", "M3", "P4", "P5", "M6", "m7"],
        tags: ["major", "diatonic", "neutral"],
        derivesChordsFrom: true,
    },
    {
        id: "aeolian",
        type: "scale",
        label: "Aeolian (Natural Minor)",
        composition: ["R1", "M2", "m3", "P4", "P5", "m6", "m7"],
        tags: ["minor", "diatonic", "dark"],
        derivesChordsFrom: true,
    },
    {
        id: "locrian",
        type: "scale",
        label: "Locrian",
        composition: ["R1", "m2", "m3", "P4", "d5", "m6", "m7"],
        tags: ["diminished", "diatonic", "dark"],
        derivesChordsFrom: true,
    },

    // --- MELODIC MINOR MODES ---
    {
        id: "melodic-minor",
        type: "scale",
        label: "Melodic Minor",
        composition: ["R1", "M2", "m3", "P4", "P5", "M6", "M7"],
        tags: ["minor", "melodic minor", "neutral"],
        derivesChordsFrom: true,
    },
    {
        id: "dorian-b2",
        type: "scale",
        label: "Dorian ♭2",
        composition: ["R1", "m2", "m3", "P4", "P5", "M6", "m7"],
        tags: ["minor", "melodic minor", "dark"],
        derivesChordsFrom: true,
    },
    {
        id: "lydian-augmented",
        type: "scale",
        label: "Lydian Augmented",
        composition: ["R1", "M2", "M3", "A4", "A5", "M6", "M7"],
        tags: ["augmented", "melodic minor", "bright"],
        derivesChordsFrom: true,
    },
    {
        id: "lydian-dominant",
        type: "scale",
        label: "Lydian Dominant",
        composition: ["R1", "M2", "M3", "A4", "P5", "M6", "m7"],
        tags: ["dominant", "melodic minor", "bright"],
        derivesChordsFrom: true,
    },
    {
        id: "mixolydian-b6",
        type: "scale",
        label: "Mixolydian ♭6 (Hindu)",
        composition: ["R1", "M2", "M3", "P4", "P5", "m6", "m7"],
        tags: ["dominant", "melodic minor", "neutral"],
        derivesChordsFrom: true,
    },
    {
        id: "locrian-nat2",
        type: "scale",
        label: "Locrian ♮2",
        composition: ["R1", "M2", "m3", "P4", "d5", "m6", "m7"],
        tags: ["diminished", "melodic minor", "dark"],
        derivesChordsFrom: true,
    },
    {
        id: "super-locrian",
        type: "scale",
        label: "Super Locrian (Altered)",
        composition: ["R1", "m2", "m3", "d4", "d5", "m6", "m7"],
        tags: ["altered", "diminished", "melodic minor", "dark"],
        derivesChordsFrom: true,
    },

    // --- HARMONIC MINOR MODES ---
    {
        id: "harmonic-minor",
        type: "scale",
        label: "Harmonic Minor",
        composition: ["R1", "M2", "m3", "P4", "P5", "m6", "M7"],
        tags: ["minor", "harmonic minor", "dark"],
        derivesChordsFrom: true,
    },
    {
        id: "locrian-nat6",
        type: "scale",
        label: "Locrian ♮6",
        composition: ["R1", "m2", "m3", "P4", "d5", "M6", "m7"],
        tags: ["diminished", "harmonic minor", "dark"],
        derivesChordsFrom: true,
    },
    {
        id: "ionian-sharp5",
        type: "scale",
        label: "Ionian ♯5",
        composition: ["R1", "M2", "M3", "P4", "A5", "M6", "M7"],
        tags: ["augmented", "harmonic minor", "bright"],
        derivesChordsFrom: true,
    },
    {
        id: "dorian-sharp4",
        type: "scale",
        label: "Dorian ♯4 (Ukrainian)",
        composition: ["R1", "M2", "m3", "A4", "P5", "M6", "m7"],
        tags: ["minor", "harmonic minor", "neutral"],
        derivesChordsFrom: true,
    },
    {
        id: "phrygian-dominant",
        type: "scale",
        label: "Phrygian Dominant",
        composition: ["R1", "m2", "M3", "P4", "P5", "m6", "m7"],
        tags: ["dominant", "harmonic minor", "exotic"],
        derivesChordsFrom: true,
    },
    {
        id: "lydian-sharp2",
        type: "scale",
        label: "Lydian ♯2",
        composition: ["R1", "A2", "M3", "A4", "P5", "M6", "M7"],
        tags: ["major", "harmonic minor", "bright"],
        derivesChordsFrom: true,
    },
    {
        id: "super-locrian-bb7",
        type: "scale",
        label: "Super Locrian ♭♭7",
        composition: ["R1", "m2", "m3", "d4", "d5", "m6", "d7"],
        tags: ["diminished", "harmonic minor", "dark"],
        derivesChordsFrom: true,
    },

    // --- PENTATONIC MODES ---
    {
        id: "pentatonic-major",
        type: "scale",
        label: "Major Pentatonic (Mode 1)",
        composition: ["R1", "M2", "M3", "P5", "M6"],
        tags: ["major", "pentatonic", "bright"],
        derivesChordsFrom: false,
    },
    {
        id: "pentatonic-sus",
        type: "scale",
        label: "Suspended Pentatonic (Mode 2)",
        composition: ["R1", "M2", "P4", "P5", "m7"],
        tags: ["suspended", "pentatonic", "neutral"],
        derivesChordsFrom: false,
    },
    {
        id: "pentatonic-man-gong",
        type: "scale",
        label: "Man Gong (Mode 3)",
        composition: ["R1", "m3", "P4", "m6", "m7"],
        tags: ["minor", "pentatonic", "dark"],
        derivesChordsFrom: false,
    },
    {
        id: "pentatonic-ritusen",
        type: "scale",
        label: "Ritusen (Mode 4)",
        composition: ["R1", "M2", "P4", "P5", "M6"],
        tags: ["major", "pentatonic", "neutral"],
        derivesChordsFrom: false,
    },
    {
        id: "pentatonic-minor",
        type: "scale",
        label: "Minor Pentatonic (Mode 5)",
        composition: ["R1", "m3", "P4", "P5", "m7"],
        tags: ["minor", "pentatonic", "dark"],
        derivesChordsFrom: false,
    },

    // --- SYMMETRIC & EXOTIC ---
    {
        id: "chromatic",
        type: "scale",
        label: "Chromatic",
        composition: [
            "R1",
            "m2",
            "M2",
            "m3",
            "M3",
            "P4",
            "A4",
            "P5",
            "m6",
            "M6",
            "m7",
            "M7",
        ],
        tags: ["symmetric", "exotic", "neutral"],
        derivesChordsFrom: false,
    },
    {
        id: "whole-tone",
        type: "scale",
        label: "Whole Tone",
        composition: ["R1", "M2", "M3", "A4", "A5", "m7"],
        tags: ["symmetric", "hexatonic", "dominant", "bright"],
        derivesChordsFrom: false,
    },
    {
        id: "diminished-half-whole",
        type: "scale",
        label: "Diminished (Half-Whole)",
        composition: ["R1", "m2", "m3", "M3", "A4", "P5", "M6", "m7"],
        tags: ["symmetric", "octatonic", "dominant", "dark"],
        derivesChordsFrom: false,
    },
    {
        id: "diminished-whole-half",
        type: "scale",
        label: "Diminished (Whole-Half)",
        composition: ["R1", "M2", "m3", "P4", "d5", "m6", "M6", "M7"],
        tags: ["symmetric", "octatonic", "diminished", "dark"],
        derivesChordsFrom: false,
    },
    {
        id: "blues",
        type: "scale",
        label: "Blues",
        composition: ["R1", "m3", "P4", "d5", "P5", "m7"],
        tags: ["minor", "blues", "hexatonic", "dark"],
        derivesChordsFrom: false,
    },
    {
        id: "hungarian-minor",
        type: "scale",
        label: "Hungarian Minor",
        composition: ["R1", "M2", "m3", "A4", "P5", "m6", "M7"],
        tags: ["minor", "exotic", "dark"],
        derivesChordsFrom: true,
    },
    {
        id: "double-harmonic-major",
        type: "scale",
        label: "Double Harmonic Major (Byzantine)",
        composition: ["R1", "m2", "M3", "P4", "P5", "m6", "M7"],
        tags: ["major", "exotic", "bright"],
        derivesChordsFrom: true,
    },
];

export const chords: Chord[] = [
    {
        id: "major-triad",
        type: "chord",
        label: "Major",
        composition: ["R1", "M3", "P5"],
        tags: ["major", "triad", "bright"],
    },
    {
        id: "minor-triad",
        type: "chord",
        label: "Minor",
        composition: ["R1", "m3", "P5"],
        tags: ["minor", "triad", "dark"],
    },
    {
        id: "diminished-triad",
        type: "chord",
        label: "Diminished",
        composition: ["R1", "m3", "d5"],
        tags: ["diminished", "triad", "dark"],
    },
    {
        id: "augmented-triad",
        type: "chord",
        label: "Augmented",
        composition: ["R1", "M3", "A5"],
        tags: ["augmented", "triad", "bright"],
    },
    {
        id: "sus2-triad",
        type: "chord",
        label: "Sus2",
        composition: ["R1", "M2", "P5"],
        tags: ["suspended", "triad", "neutral"],
    },
    {
        id: "sus4-triad",
        type: "chord",
        label: "Sus4",
        composition: ["R1", "P4", "P5"],
        tags: ["suspended", "triad", "neutral"],
    },
    {
        id: "major-7",
        type: "chord",
        label: "Maj7",
        composition: ["R1", "M3", "P5", "M7"],
        tags: ["major", "seventh", "bright"],
    },
    {
        id: "minor-7",
        type: "chord",
        label: "Min7",
        composition: ["R1", "m3", "P5", "m7"],
        tags: ["minor", "seventh", "dark"],
    },
    {
        id: "minor-major-7",
        type: "chord",
        label: "MinMaj7",
        composition: ["R1", "m3", "P5", "M7"],
        tags: ["minor", "seventh", "exotic"],
    },
    {
        id: "dominant-7",
        type: "chord",
        label: "7",
        composition: ["R1", "M3", "P5", "m7"],
        tags: ["dominant", "seventh", "neutral"],
    },
    {
        id: "half-diminished-7",
        type: "chord",
        label: "ø7",
        composition: ["R1", "m3", "d5", "m7"],
        tags: ["diminished", "seventh", "dark"],
    },
    {
        id: "diminished-7",
        type: "chord",
        label: "dim7",
        composition: ["R1", "m3", "d5", "d7"],
        tags: ["diminished", "seventh", "dark"],
    },
    {
        id: "major-9",
        type: "chord",
        label: "Maj9",
        composition: ["R1", "M3", "P5", "M7", "M9"],
        tags: ["major", "extended", "bright"],
    },
    {
        id: "minor-9",
        type: "chord",
        label: "Min9",
        composition: ["R1", "m3", "P5", "m7", "M9"],
        tags: ["minor", "extended", "dark"],
    },
    {
        id: "dominant-9",
        type: "chord",
        label: "9",
        composition: ["R1", "M3", "P5", "m7", "M9"],
        tags: ["dominant", "extended", "neutral"],
    },
    {
        id: "dominant-11",
        type: "chord",
        label: "11",
        composition: ["R1", "M3", "P5", "m7", "M9", "P11"],
        tags: ["dominant", "extended", "neutral"],
    },
    {
        id: "dominant-13",
        type: "chord",
        label: "13",
        composition: ["R1", "M3", "P5", "m7", "M9", "P11", "M13"],
        tags: ["dominant", "extended", "neutral"],
    },
];

export const scaleTags: Set<string> = new Set(
    scales.flatMap((scale) => scale.tags ?? []),
);
export const chordTags: Set<string> = new Set(
    chords.flatMap((chord) => chord.tags ?? []),
);
