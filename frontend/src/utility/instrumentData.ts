export const InstrumentFamilyArray = ["guitar", "bass", "keyboard"] as const;
export type InstrumentFamily = (typeof InstrumentFamilyArray)[number];

export const GuitarVariantArray = [
    "guitar-6",
    "guitar-7",
    "guitar-8",
    "guitar-9",
] as const;
export type GuitarVariant = (typeof GuitarVariantArray)[number];
export const BassVariantArray = ["bass-4", "bass-5", "bass-6"] as const;
export type BassVariant = (typeof BassVariantArray)[number];
export const KeyboardVariantArray = [
    "keyboard-25",
    "keyboard-49",
    "keyboard-61",
    "keyboard-76",
    "keyboard-88",
] as const;
export type KeyboardVariant = (typeof KeyboardVariantArray)[number];

export interface GuitarVariantDefinition {
    id: GuitarVariant;
    family: "guitar";
    stringCount: 6 | 7 | 8 | 9;
    label: string;
}

export interface BassVariantDefinition {
    id: BassVariant;
    family: "bass";
    stringCount: 4 | 5 | 6;
    label: string;
}

export interface KeyboardVariantDefinition {
    id: KeyboardVariant;
    family: "keyboard";
    keyCount: 25 | 49 | 61 | 76 | 88;
    lowestMidiNote: number;
    label: string;
}

export const guitarVariants: GuitarVariantDefinition[] = [
    {
        id: "guitar-6",
        family: "guitar",
        stringCount: 6,
        label: "6‑String Guitar",
    },
    {
        id: "guitar-7",
        family: "guitar",
        stringCount: 7,
        label: "7‑String Guitar",
    },
    {
        id: "guitar-8",
        family: "guitar",
        stringCount: 8,
        label: "8‑String Guitar",
    },
    {
        id: "guitar-9",
        family: "guitar",
        stringCount: 9,
        label: "9‑String Guitar",
    },
];

export const bassVariants: BassVariantDefinition[] = [
    {
        id: "bass-4",
        family: "bass",
        stringCount: 4,
        label: "4‑String Bass",
    },
    {
        id: "bass-5",
        family: "bass",
        stringCount: 5,
        label: "5‑String Bass",
    },
    {
        id: "bass-6",
        family: "bass",
        stringCount: 6,
        label: "6‑String Bass",
    },
];

export const keyboardVariants: KeyboardVariantDefinition[] = [
    {
        id: "keyboard-25",
        family: "keyboard",
        keyCount: 25,
        lowestMidiNote: 48,
        label: "25-Key Keyboard",
    },
    {
        id: "keyboard-49",
        family: "keyboard",
        keyCount: 49,
        lowestMidiNote: 36,
        label: "49-Key Keyboard",
    },
    {
        id: "keyboard-61",
        family: "keyboard",
        keyCount: 61,
        lowestMidiNote: 36,
        label: "61-Key Keyboard",
    },
    {
        id: "keyboard-76",
        family: "keyboard",
        keyCount: 76,
        lowestMidiNote: 28,
        label: "76-Key Keyboard",
    },
    {
        id: "keyboard-88",
        family: "keyboard",
        keyCount: 88,
        lowestMidiNote: 21,
        label: "88-Key Keyboard",
    },
];

export interface TuningDefinition {
    id: string;
    label: string;
    variant: GuitarVariant | BassVariant;
    tuning: number[]; // MIDI Notes
    tags: string[];
}

export const tunings: TuningDefinition[] = [
    {
        id: "guitar-6-e-standard",
        label: "E Standard",
        variant: "guitar-6",
        tuning: [40, 45, 50, 55, 59, 64],
        tags: ["standard"],
    },
    {
        id: "guitar-6-eb-standard",
        label: "Eb Standard",
        variant: "guitar-6",
        tuning: [39, 44, 49, 54, 58, 63],
        tags: ["standard", "down-tuned"],
    },
    {
        id: "guitar-6-d-standard",
        label: "D Standard",
        variant: "guitar-6",
        tuning: [38, 43, 48, 53, 57, 62],
        tags: ["standard", "down-tuned"],
    },
    {
        id: "guitar-6-c-standard",
        label: "C Standard",
        variant: "guitar-6",
        tuning: [36, 41, 46, 51, 55, 60],
        tags: ["standard", "down-tuned"],
    },
    {
        id: "guitar-6-drop-d",
        label: "Drop D",
        variant: "guitar-6",
        tuning: [38, 45, 50, 55, 59, 64],
        tags: ["drop"],
    },
    {
        id: "guitar-6-drop-c",
        label: "Drop C",
        variant: "guitar-6",
        tuning: [36, 43, 48, 53, 57, 62],
        tags: ["drop"],
    },
    {
        id: "guitar-6-open-c",
        label: "Open C",
        variant: "guitar-6",
        tuning: [36, 43, 48, 55, 60, 64],
        tags: ["open"],
    },
    {
        id: "guitar-6-open-d",
        label: "Open D",
        variant: "guitar-6",
        tuning: [38, 45, 50, 54, 57, 62],
        tags: ["open"],
    },
    {
        id: "guitar-6-open-e",
        label: "Open E",
        variant: "guitar-6",
        tuning: [40, 47, 52, 56, 59, 64],
        tags: ["open"],
    },
    {
        id: "guitar-6-open-g",
        label: "Open G",
        variant: "guitar-6",
        tuning: [38, 43, 50, 55, 59, 62],
        tags: ["open"],
    },
    {
        id: "guitar-7-b-standard",
        label: "B Standard",
        variant: "guitar-7",
        tuning: [35, 40, 45, 50, 55, 59, 64],
        tags: ["standard", "extended"],
    },
    {
        id: "guitar-7-bb-standard",
        label: "Bb Standard",
        variant: "guitar-7",
        tuning: [34, 39, 44, 49, 54, 58, 63],
        tags: ["standard", "extended", "down-tuned"],
    },
    {
        id: "guitar-7-a-standard",
        label: "A Standard",
        variant: "guitar-7",
        tuning: [33, 38, 43, 48, 53, 57, 62],
        tags: ["standard", "extended"],
    },
    {
        id: "guitar-7-drop-a",
        label: "Drop A",
        variant: "guitar-7",
        tuning: [33, 40, 45, 50, 55, 59, 64],
        tags: ["drop", "extended"],
    },
    {
        id: "guitar-7-drop-g",
        label: "Drop G",
        variant: "guitar-7",
        tuning: [31, 38, 43, 48, 53, 57, 62],
        tags: ["drop", "extended"],
    },
    {
        id: "guitar-8-fsharp-standard",
        label: "F# Standard",
        variant: "guitar-8",
        tuning: [30, 35, 40, 45, 50, 55, 59, 64],
        tags: ["standard", "extended"],
    },
    {
        id: "guitar-8-f-standard",
        label: "F Standard",
        variant: "guitar-8",
        tuning: [29, 34, 39, 44, 49, 54, 58, 63],
        tags: ["standard", "extended", "down-tuned"],
    },
    {
        id: "guitar-8-e-standard",
        label: "E Standard",
        variant: "guitar-8",
        tuning: [28, 33, 38, 43, 48, 53, 57, 62],
        tags: ["standard", "extended"],
    },
    {
        id: "guitar-8-drop-e",
        label: "Drop E",
        variant: "guitar-8",
        tuning: [28, 35, 40, 45, 50, 55, 59, 64],
        tags: ["drop", "extended"],
    },
    {
        id: "guitar-9-csharp-standard",
        label: "C# Standard",
        variant: "guitar-9",
        tuning: [25, 30, 35, 40, 45, 50, 55, 59, 64],
        tags: ["standard", "extended"],
    },
    {
        id: "guitar-9-b-standard",
        label: "B Standard",
        variant: "guitar-9",
        tuning: [23, 28, 33, 38, 43, 48, 53, 57, 62],
        tags: ["standard", "extended"],
    },
    {
        id: "guitar-9-drop-b",
        label: "Drop B",
        variant: "guitar-9",
        tuning: [23, 30, 35, 40, 45, 50, 55, 59, 64],
        tags: ["drop", "extended"],
    },
    {
        id: "bass-4-e-standard",
        label: "E Standard",
        variant: "bass-4",
        tuning: [28, 33, 38, 43],
        tags: ["standard"],
    },
    {
        id: "bass-4-eb-standard",
        label: "Eb Standard",
        variant: "bass-4",
        tuning: [27, 32, 37, 42],
        tags: ["standard", "down-tuned"],
    },
    {
        id: "bass-4-d-standard",
        label: "D Standard",
        variant: "bass-4",
        tuning: [26, 31, 36, 41],
        tags: ["standard", "down-tuned"],
    },
    {
        id: "bass-4-drop-d",
        label: "Drop D",
        variant: "bass-4",
        tuning: [26, 33, 38, 43],
        tags: ["drop"],
    },
    {
        id: "bass-5-b-standard",
        label: "B Standard",
        variant: "bass-5",
        tuning: [23, 28, 33, 38, 43],
        tags: ["standard", "extended"],
    },
    {
        id: "bass-5-drop-a",
        label: "Drop A",
        variant: "bass-5",
        tuning: [21, 28, 33, 38, 43],
        tags: ["drop", "extended"],
    },
    {
        id: "bass-5-e-c-standard",
        label: "E–C Standard",
        variant: "bass-5",
        tuning: [28, 33, 38, 43, 48],
        tags: ["standard", "tenor"],
    },
    {
        id: "bass-6-b-standard",
        label: "B Standard",
        variant: "bass-6",
        tuning: [23, 28, 33, 38, 43, 48],
        tags: ["standard", "extended"],
    },
    {
        id: "bass-6-drop-a",
        label: "Drop A",
        variant: "bass-6",
        tuning: [21, 28, 33, 38, 43, 48],
        tags: ["drop", "extended"],
    },
    {
        id: "bass-6-a-standard",
        label: "A Standard",
        variant: "bass-6",
        tuning: [21, 26, 31, 36, 41, 46],
        tags: ["standard", "extended"],
    },
];

export const pitchClassToColor: Record<number, string> = {
    0: "white",
    1: "black",
    2: "white",
    3: "black",
    4: "white",
    5: "white",
    6: "black",
    7: "white",
    8: "black",
    9: "white",
    10: "black",
    11: "white",
};

export const stringViewOptions: number[] = [6, 12, 24];
export const keyboardViewOptions: number[] = [25, 49, 61, 76, 88];
