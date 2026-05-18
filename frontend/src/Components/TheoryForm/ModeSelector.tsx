import {
    useFilterStore as FilterStore,
    useTheoryStore as TheoryStore,
} from "../../store";
import { scales, chords } from "../../utility/theoryData";

const ModeSelector = () => {
    const mode = FilterStore((state) => state.mode);
    const setMode = FilterStore((state) => state.setMode);
    const setShape = TheoryStore((state) => state.setShape);
    const resetScaleDegree = TheoryStore((state) => state.resetDegree);
    const setDisplaySeventh = TheoryStore(
        (state) => state.setDisplaySeventh,
    );

    const toggleMode = (nextMode: "scale" | "chord"): void => {
        resetScaleDegree();
        setDisplaySeventh(true);
        if (nextMode === "scale") {
            setShape(scales[0]);
        } else {
            setShape(chords[0]);
        }
        setMode(nextMode);
    };

    const activeButton: string =
        "text-shadow-md shadow-[inset_2px_2px_3px_rgba(0,0,0,0.8),inset_-2px_-2px_3px_rgba(255,255,255,0.2)] from-zinc-700 to-zinc-800";
    const inactiveButton: string =
        "text-zinc-400 shadow-[inset_2px_2px_3px_rgba(255,255,255,0.3),inset_-2px_-2px_3px_rgba(0,0,0,0.8),3px_3px_6px_rgba(0,0,0,0.8)] from-zinc-600 to-zinc-700";

    return (
        <div className="flex flex-row gap-4 items-center justify-between md:justify-start w-full">
            <h3 className="text-center text-2xl font-serif tracking-wide text-zinc-200 font-bold">
                Mode
            </h3>
            <div className="flex gap-2 justify-center items-center">
                <button
                    className={`w-18 h-10 text-lg cursor-pointer rounded-md bg-radial transition-all duration-150 ${mode === "scale" ? activeButton + " text-green-400 text-shadow-green-700" : inactiveButton}`}
                    onClick={() => toggleMode("scale")}
                >
                    Scale
                </button>
                <button
                    className={`w-18 h-10 text-lg cursor-pointer rounded-md bg-radial transition-all duration-150 ${mode === "chord" ? activeButton + " text-red-400 text-shadow-red-700" : inactiveButton}`}
                    onClick={() => toggleMode("chord")}
                >
                    Chord
                </button>
            </div>
        </div>
    );
};

export default ModeSelector;
