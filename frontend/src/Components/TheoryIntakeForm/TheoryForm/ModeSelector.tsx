import { useModeStore as ModeStore } from "../../../store";

const ModeSelector = () => {
    const mode = ModeStore((state) => state.mode);
    const setMode = ModeStore((state) => state.setMode);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="mode-selector">Mode</label>
            <button
                className="capitalize border w-8/10 text-center"
                id="mode-selector"
                onClick={() => setMode(mode === "scale" ? "chord" : "scale")}
            >
                {mode}
            </button>
        </div>
    );
};

export default ModeSelector;
