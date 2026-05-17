import { useInstrumentStore as InstrumentStore } from "../../../store";
import {
    InstrumentFamilyArray,
    type InstrumentFamily,
} from "../../../utility/instrumentData";

const InstrumentFamilySelector = () => {
    const instrumentFamily: string | null = InstrumentStore(
        (state) => state.instrumentFamily,
    );
    const setInstrumentFamily = InstrumentStore(
        (state) => state.setInstrumentFamily,
    );
    return (
        <label className="px-3 py-1 flex items-center justify-between gap-3 border-b border-r rounded-tl-md border-zinc-600 bg-black text-white">
            <span>Instrument</span>
            <select
                value={instrumentFamily}
                onChange={(e) =>
                    setInstrumentFamily(e.target.value as InstrumentFamily)
                }
                className="cursor-pointer capitalize border border-zinc-700 rounded-md bg-black hover:bg-zinc-800 outline-none"
            >
                {InstrumentFamilyArray.map((inst) => (
                    <option value={inst} key={inst} className="capitalize">
                        {inst}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default InstrumentFamilySelector;
