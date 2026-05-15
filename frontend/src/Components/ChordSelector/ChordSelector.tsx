import {
    useShapeStore as ShapeStore,
    useDisplaySeventhStore as DisplaySeventhStore,
} from "../../store";
import type { IntervalToken, Scale } from "../../utility/theoryData";
import { generateChordNotation } from "../../utility/theoryEngine";
import ChordSelectorButton from "./ChordSelectorButton";
import brushedMetalOverlay from "../../../src/assets/brushed-metal-overlay.png";

const ChordSelector = () => {
    const shape = ShapeStore((state) => state.shape) as Scale;
    const displaySeventh = DisplaySeventhStore((state) => state.displaySeventh);
    const setDisplaySeventh = DisplaySeventhStore(
        (state) => state.setDisplaySeventh,
    );
    const buttonStyle: string = displaySeventh
        ? "text-green-400 text-shadow-md text-shadow-green-400 shadow-[inset_2px_2px_1px_rgba(0,0,0,0.8),2px_2px_2px_rgba(255,255,255,0.1)] from-zinc-700 to-zinc-800"
        : "text-zinc-400 shadow-[inset_2px_2px_1px_rgba(255,255,255,0.1),2px_2px_2px_rgba(0,0,0,0.8)] from-zinc-600 to-zinc-700";
    const chordNotationArray: string[] = generateChordNotation(
        shape,
        displaySeventh,
    );

    return (
        <div className="relative isolate w-8/10 max-w-3xl mx-auto p-3 bg-linear-to-b from-zinc-600 via-zinc-700 to-zinc-800 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] border-t border-zinc-500/30 rounded-lg flex flex-col gap-3 justify-center align-middle">
            <div
                className="absolute inset-0 pointer-events-none rounded-lg z-0"
                style={{
                    backgroundImage: `url(${brushedMetalOverlay})`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "400px 100px",
                    mixBlendMode: "overlay",
                    opacity: 0.5,
                }}
            />
            <div className="flex flex-col items-center gap-4 z-10">
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
                    className={`w-10 h-10 text-2xl font-serif font-bold cursor-pointer rounded-md bg-radial ${buttonStyle} transition-all duration-150`}
                    onClick={() => setDisplaySeventh(!displaySeventh)}
                >
                    7
                </button>
            </div>
        </div>
    );
};

export default ChordSelector;
