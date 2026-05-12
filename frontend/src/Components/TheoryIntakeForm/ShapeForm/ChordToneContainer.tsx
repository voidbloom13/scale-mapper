import { useShapeStore as ShapeStore } from "../../../store";
import type { IntervalToken, Scale } from "../../../utility/theoryData";
import { generateChordNotation } from "../../../utility/theoryEngine";
import ChordSelector from "./ChordSelector";

const ChordToneContainer = () => {
    const shape = ShapeStore((state) => state.shape) as Scale;
    console.log(shape);
    const chordNotationArray: string[] = generateChordNotation(shape);

    // TODO
    // Make ChordSelector an input type="checkbox"
    // Ensure only one checkbox can be selected
    // Update state and re-calculate chord tones
    return (
        <div className="col-span-2 flex items-center justify-evenly">
            {shape.composition.map((interval: IntervalToken, index: number) => (
                <ChordSelector
                    interval={interval}
                    key={interval}
                    degree={index}
                    label={chordNotationArray[index]}
                />
            ))}
        </div>
    );
};

export default ChordToneContainer;
