import { noteComposition } from "./theoryEngine";
import * as Theory from "./theoryData";

const root = process.argv[2] as Theory.NoteToken;
const shape = process.argv[3] as Theory.ShapeId;
const mode = process.argv[4] as "scale" | "chord";

if (!root || !shape || !mode) {
    console.log("Usage: npx tsx test_note_composition.ts <root> <shape> <mode>");
    console.log("Example: npx tsx test_note_composition.ts \"G#/Ab\" phrygian scale");
    process.exit(1);
}

try {
    const result = noteComposition(root, shape, mode);
    console.log(`Result for noteComposition('${root}', '${shape}', '${mode}'):`);
    console.log("Intervals:", JSON.stringify(result[0]));
    console.log("Notes:", JSON.stringify(result[1]));
} catch (error) {
    console.error(`Error:`, error instanceof Error ? error.message : error);
}
