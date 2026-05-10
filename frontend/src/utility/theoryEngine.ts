import * as Instrument from "./instrumentData";
import * as Theory from "./theoryData";

export const pitchClassOfNote = (note: Theory.NoteToken): number => {
    return Theory.noteMap.indexOf(note);
};

export const noteOfPitchClass = (pitchClass: number): Theory.NoteToken => {
    return Theory.noteMap[((pitchClass % 12) + 12) % 12];
};

// This can be called even if user selects a chord shape in scale mode or vice versa
// The frontend will be responsible for only allowing the user to select a
// compatible shape based on the selected mode.
export const generateIntervalsAndNotes = (
    root: Theory.NoteToken,
    shape: Theory.ShapeId,
    mode: "scale" | "chord",
): [Theory.IntervalToken[], Theory.NoteToken[]] => {
    const rootPitchClass: number = pitchClassOfNote(root);
    let shapeCompositionSemitones: number[] = []; // Array of semitones relative to the Root
    let shapeCompositionIntervals: Theory.IntervalToken[];
    let shapeCompositionNotes: Theory.NoteToken[] = [];
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
        let intervalSemitone: number =
            Theory.intervalMap[shapeCompositionIntervals[i]];
        shapeCompositionSemitones[i] = intervalSemitone + rootPitchClass;
    }

    for (let i = 0; i < shapeCompositionSemitones.length; i++) {
        shapeCompositionNotes[i] = noteOfPitchClass(
            shapeCompositionSemitones[i],
        );
    }

    const intervalNoteArray: [Theory.IntervalToken[], Theory.NoteToken[]] = [
        shapeCompositionIntervals,
        shapeCompositionNotes,
    ];
    return intervalNoteArray;
};
