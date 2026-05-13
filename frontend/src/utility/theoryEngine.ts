import * as Instrument from "./instrumentData";
import * as Theory from "./theoryData";

export const pitchClassOfNote = (note: Theory.NoteToken): number => {
    return Theory.noteMap.indexOf(note);
};

export const noteOfPitchClass = (pitchClass: number): Theory.NoteToken => {
    return Theory.noteMap[((pitchClass % 12) + 12) % 12];
};

export const semitoneOfInterval = (
    interval: Theory.IntervalToken,
): Theory.SemitoneValue => {
    return Theory.intervalMap[interval];
};

type NoteRank = "Root" | "Third" | "Fifth" | "Seventh" | "Passing";

export interface ScaleNote {
    interval: Theory.IntervalToken;
    note: Theory.NoteToken;
    semitone: Theory.SemitoneValue;
    noteRank: NoteRank;
}

// This can be called even if user selects a chord shape in scale mode or vice versa
// The frontend will be responsible for only allowing the user to select a
// compatible shape based on the selected mode.
export const generateIntervalsAndNotes = (
    root: Theory.NoteToken,
    shape: Theory.ShapeId,
    mode: "scale" | "chord",
    degree: number, // starting at position 1, not index 0.
    displaySeventh: boolean,
): ScaleNote[] => {
    const rootPitchClass: number = pitchClassOfNote(root);
    let shapeCompositionIntervals: Theory.IntervalToken[];
    let activeScale: ScaleNote[] = [];

    switch (mode) {
        case "scale":
            let scale = Theory.scales.find((s) => s.id === shape)
                ? Theory.scales.find((s) => s.id === shape)
                : Theory.scales[0];
            if (!scale) throw new Error("No scale was found.");
            shapeCompositionIntervals = scale.composition;
            break;
        case "chord":
            let chord = Theory.chords.find((c) => c.id === shape)
                ? Theory.chords.find((c) => c.id === shape)
                : Theory.chords[0];
            if (!chord) throw new Error("No chord was found.");
            shapeCompositionIntervals = chord.composition;
            break;
        default:
            const _unhandledCheck: never = mode;
            throw new Error(`Unhandled Mode: ${_unhandledCheck}`);
    }

    for (let i = 0; i < shapeCompositionIntervals.length; i++) {
        let noteRank: NoteRank;

        const activeInterval: Theory.IntervalToken =
            shapeCompositionIntervals[i];
        const activeSemitone: Theory.SemitoneValue =
            Theory.intervalMap[activeInterval] + rootPitchClass;

        const activeNote: Theory.NoteToken = noteOfPitchClass(activeSemitone);

        const intervalNumber: number = parseInt(
            activeInterval.replace(/\D/g, ""),
            10,
        ); // returns interval number (m3 -> 3, P12 -> 12, etc.)
        const intervalNumberModulo: number = ((intervalNumber - 1) % 7) + 1; // simplifies to 1-7
        const relativeIntervalModulo: number =
            ((((intervalNumberModulo - degree) % 7) + 7) % 7) + 1;

        switch (relativeIntervalModulo) {
            case 1:
                noteRank = "Root";
                break;
            case 3:
                noteRank = "Third";
                break;
            case 5:
                noteRank = "Fifth";
                break;
            case 7:
                noteRank = displaySeventh ? "Seventh" : "Passing";
                break;
            case 2:
            case 4:
            case 6:
                noteRank = "Passing";
                break;
            default:
                throw new Error(
                    `Unhandled Interval: ${relativeIntervalModulo}`,
                );
        }

        activeScale[i] = {
            interval: activeInterval,
            note: activeNote,
            semitone: activeSemitone,
            noteRank: noteRank,
        };
    }

    return activeScale;
};

export const generateChordNotation = (
    scale: Theory.Scale,
    displaySeventh: boolean,
): string[] => {
    const diminished: "°" = "°";
    const halfDiminished: "ø" = "ø";
    const augmented: "+" = "+";
    const romanNumerals: string[] = [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII",
        "VIII",
        "IX",
        "X",
        "XI",
    ];

    let chordNotationArray: string[] = [];
    for (let i = 0; i < scale.composition.length; i++) {
        let chordNotation: string = romanNumerals[i];
        let root: Theory.IntervalToken = scale.composition[i];
        let third: Theory.IntervalToken =
            scale.composition[(i + 2) % scale.composition.length];
        let fifth: Theory.IntervalToken =
            scale.composition[(i + 4) % scale.composition.length];
        let seventh: Theory.IntervalToken =
            scale.composition[(i + 6) % scale.composition.length];

        const thirdInterval: number =
            (semitoneOfInterval(third) - semitoneOfInterval(root) + 12) % 12;
        const fifthInterval: number =
            (semitoneOfInterval(fifth) - semitoneOfInterval(root) + 12) % 12;
        const seventhInterval: number =
            (semitoneOfInterval(seventh) - semitoneOfInterval(root) + 12) % 12;

        let thirdQuality: "sus2" | "minor" | "major" | "sus4";
        let fifthQuality: "diminished" | "perfect" | "augmented";
        let seventhQuality: "diminished" | "minor" | "major";

        switch (thirdInterval) {
            case 2:
                thirdQuality = "sus2";
                break;
            case 3:
                thirdQuality = "minor";
                break;
            case 4:
                thirdQuality = "major";
                break;
            case 5:
                thirdQuality = "sus4";
                break;
            default:
                throw new Error("Interval not found.");
        }

        switch (fifthInterval) {
            case 6:
                fifthQuality = "diminished";
                break;
            case 7:
                fifthQuality = "perfect";
                break;
            case 8:
                fifthQuality = "augmented";
                break;
            default:
                throw new Error("Interval not found.");
        }

        switch (seventhInterval) {
            case 9:
                seventhQuality = "diminished";
                break;
            case 10:
                seventhQuality = "minor";
                break;
            case 11:
                seventhQuality = "major";
                break;
            default:
                throw new Error("Interval not found.");
        }

        if (thirdQuality === "minor") {
            chordNotation = chordNotation.toLowerCase();
        }

        if (displaySeventh) {
            switch (true) {
                case fifthQuality === "diminished" &&
                    seventhQuality === "diminished":
                    chordNotation += diminished + "7";
                    break;
                case fifthQuality === "diminished" &&
                    seventhQuality === "minor":
                    chordNotation += halfDiminished + "7";
                    break;
                case fifthQuality === "diminished" &&
                    seventhQuality === "major":
                    chordNotation += diminished + "maj7";
                    break;
                case (fifthQuality === "perfect" &&
                    seventhQuality === "diminished") ||
                    (fifthQuality === "perfect" && seventhQuality === "minor"):
                    chordNotation += "7";
                    break;
                case fifthQuality === "perfect" && seventhQuality === "major":
                    chordNotation += "maj7";
                    break;
                case (fifthQuality === "augmented" &&
                    seventhQuality === "diminished") ||
                    (fifthQuality === "augmented" &&
                        seventhQuality === "minor"):
                    chordNotation += augmented + "7";
                    break;
                case fifthQuality === "augmented" && seventhQuality === "major":
                    chordNotation += augmented + "maj7";
                    break;
                default:
                    throw new Error("Chord Notation not found.");
            }
        }

        if (!displaySeventh) {
            switch (true) {
                case thirdQuality === "minor" && fifthQuality === "diminished":
                    chordNotation += diminished;
                    break;
                case thirdQuality === "major" && fifthQuality === "augmented":
                    chordNotation += augmented;
                    break;
            }
        }

        if (thirdQuality === "sus2" || thirdQuality === "sus4") {
            chordNotation += thirdQuality;
        }

        chordNotationArray[i] = chordNotation;
    }
    return chordNotationArray;
};
