import {
    useShapeStore as ShapeStore,
    useDisplaySeventhStore as DisplaySeventhStore,
} from "../../../store";
import type { IntervalToken, Scale } from "../../../utility/theoryData";
import { generateChordNotation } from "../../../utility/theoryEngine";
import ChordSelectorButton from "./ChordSelectorButton";

const ChordToneContainer = () => {
    const shape = ShapeStore((state) => state.shape) as Scale;
    const displaySeventh = DisplaySeventhStore((state) => state.displaySeventh);
    const setDisplaySeventh = DisplaySeventhStore(
        (state) => state.setDisplaySeventh,
    );

    const chordNotationArray: string[] = generateChordNotation(
        shape,
        displaySeventh,
    );
    const seventhButtonStyle = displaySeventh
        ? "text-green-400 text-shadow-md text-shadow-green-400 "
        : "text-zinc-900";

    return (
        <div className="flex flex-col items-center gap-4">
            <h3 className="col-span-full text-center text-2xl font-serif tracking-wide text-zinc-200 font-bold">
                Scale Degree
            </h3>
            <div className="w-9/10 lg:w-full flex flex-row flex-wrap items-center justify-center">
                {shape.composition.map(
                    (interval: IntervalToken, index: number) => (
                        <ChordSelectorButton
                            interval={interval}
                            key={interval}
                            degree={index}
                            label={chordNotationArray[index]}
                        />
                    ),
                )}
            </div>
            <button
                className={`w-10 h-10 text-2xl font-serif font-bold cursor-pointer rounded-full bg-radial from-zinc-600 active:from-zinc-700 to-zinc-700 active:to-zinc-800 shadow-[inset_2px_2px_1px_rgba(255,255,255,0.1),2px_2px_2px_rgba(0,0,0,0.8)] active:shadow-[inset_2px_2px_1px_rgba(0,0,0,0.8),2px_2px_2px_rgba(255,255,255,0.1)] ${seventhButtonStyle} transition-all duration-150`}
                onClick={() => setDisplaySeventh(!displaySeventh)}
            >
                7
            </button>
        </div>
    );
};

export default ChordToneContainer;
