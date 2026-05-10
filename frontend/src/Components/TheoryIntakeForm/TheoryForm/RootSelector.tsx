import { noteMap } from "../../../utility/theoryData";
import type { NoteToken } from "../../../utility/theoryData";
import { useRootStore as RootStore } from "../../../store";

const RootSelector = () => {
    const root = RootStore((state) => state.root);
    const setRoot = RootStore((state) => state.setRoot);
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="root-selector">Root</label>
            <select
                className="capitalize border w-8/10 text-center"
                id="root-selector"
                defaultValue={root}
                onChange={(e) => setRoot(e.target.value)}
            >
                {noteMap.map((note: NoteToken) => (
                    <option key={note} value={note}>
                        {note}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RootSelector;
