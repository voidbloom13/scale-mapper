import { noteMap } from "../../utility/theoryData";
import type { NoteToken } from "../../utility/theoryData";
import { useTheoryStore as TheoryStore } from "../../store";

const RootSelector = () => {
    const root = TheoryStore((state) => state.root);
    const setRoot = TheoryStore((state) => state.setRoot);
    return (
        <div className="flex flex-row md:flex-row-reverse gap-4 items-center justify-between md:justify-start w-full">
            <label
                htmlFor="root-selector"
                className="text-center text-2xl font-serif tracking-wide text-zinc-200 font-bold"
            >
                Root
            </label>
            <select
                className="p-1 h-10 rounded-md font-orbitron font-bold tracking-wider bg-amber-950 text-amber-400 text-shadow-xs text-shadow-amber-600 shadow-[inset_2px_2px_1px_rgba(0,0,0,0.8),2px_2px_2px_rgba(255,255,255,0.1)] cursor-pointer"
                id="root-selector"
                defaultValue={root}
                onChange={(e) => setRoot(e.target.value)}
            >
                {noteMap.map((note: NoteToken) => (
                    <option
                        className="bg-orange-950 text-amber-600"
                        key={note}
                        value={note}
                    >
                        {note}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RootSelector;
