import { useInstrumentStore as InstrumentStore } from "../../../store";
import {
    stringViewOptions,
    keyboardViewOptions,
} from "../../../utility/instrumentData";

const ViewportSelector = () => {
    const instrumentFamily = InstrumentStore((state) => state.instrumentFamily);
    const view = InstrumentStore((state) => state.view);
    const setView = InstrumentStore((state) => state.setView);

    let viewOptions: number[];
    if (instrumentFamily === "keyboard") {
        viewOptions = keyboardViewOptions;
    } else {
        viewOptions = stringViewOptions;
    }

    return (
        <label className="px-3 py-1 flex items-center justify-between gap-3 border-b border-r rounded-br-md border-zinc-600 bg-black text-white">
            <span>{instrumentFamily === "keyboard" ? "Keys" : "Frets"}</span>
            <select
                value={view}
                onChange={(e) => setView(Number(e.target.value))}
                className="cursor-pointer capitalize border border-zinc-700 rounded-md bg-black hover:bg-zinc-800 outline-none"
            >
                {viewOptions.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default ViewportSelector;
