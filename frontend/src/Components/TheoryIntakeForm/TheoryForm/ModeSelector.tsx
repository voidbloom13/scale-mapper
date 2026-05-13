import {
    useModeStore as ModeStore,
    useScaleDegreeStore as ScaleDegreeStore,
    useDisplaySeventhStore as DisplaySeventhStore,
} from "../../../store";

const ModeSelector = () => {
    const mode = ModeStore((state) => state.mode);
    const setMode = ModeStore((state) => state.setMode);
    const resetScaleDegree = ScaleDegreeStore((state) => state.reset);
    const setDisplaySeventh = DisplaySeventhStore(
        (state) => state.setDisplaySeventh,
    );
    const toggleMode = (): void => {
        setMode(mode === "scale" ? "chord" : "scale");
        resetScaleDegree();
        setDisplaySeventh(true);
    };

    const scaleLED =
        mode === "scale"
            ? "bg-green-400 border border-green-600 shadow-md shadow-green-200"
            : "bg-green-900 border border-green-950 shadow-sm shadow-zinc-400";
    const chordLED =
        mode === "chord"
            ? "bg-red-400 border border-red-600 shadow-md shadow-red-200"
            : "bg-red-900 border border-red-950 shadow-sm shadow-zinc-400";
    const scaleToggle = "-translate-x-2.5 -rotate-180";
    const chordToggle = "translate-x-2.5 rotate-180";
    const scaleLabel = mode === "scale" ? "text-zinc-50" : "text-zinc-400";
    const chordLabel = mode === "chord" ? "text-zinc-50" : "text-zinc-400";

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <label
                htmlFor="mode-selector"
                className="text-center text-2xl font-serif tracking-wide text-zinc-200 font-bold"
            >
                Mode
            </label>
            <div className="flex space-evenly">
                <span
                    className={`${scaleLabel} transition-all duration-250 ease-in-out`}
                >
                    Scale
                </span>
                <div
                    className={`w-2 h-2 my-auto mx-2 rounded-full ${scaleLED} transition-all duration-150 ease-out`}
                ></div>
                <div
                    className="w-12 h-6 flex group flex-row items-center justify-center my-auto bg-linear-to-b from-zinc-500 via-zinc-700 to-zinc-400 cursor-pointer border-none rounded-full shadow-[-1px_-2px_3px_rgba(0,0,0,0.6),2px_2px_3px_rgba(255,255,255,0.2)]"
                    id="mode-selector"
                    onClick={() => toggleMode()}
                >
                    <div
                        className={`w-5 h-5 absolute ${mode === "scale" ? scaleToggle : chordToggle} rounded-full bg-conic/decreasing from-violet-400 via-lime-400 to-violet-400 transition-all duration-250 ease-in-out`}
                    ></div>
                </div>
                <div
                    className={`w-2 h-2 my-auto mx-2 rounded-full ${chordLED} transition-all duration-150 ease-out`}
                ></div>
                <span
                    className={`${chordLabel} transition-all duration-250 ease-in-out`}
                >
                    Chord
                </span>
            </div>
        </div>
    );
};

export default ModeSelector;
