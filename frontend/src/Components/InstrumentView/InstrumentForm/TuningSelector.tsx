import { useInstrumentStore as InstrumentStore } from "../../../store";
import {
    type TuningDefinition,
    tunings,
} from "../../../utility/instrumentData";

const TuningSelector = () => {
    const instrumentVariant = InstrumentStore(
        (state) => state.instrumentVariant,
    );
    const tuning = InstrumentStore((state) => state.tuning);
    const setTuning = InstrumentStore((state) => state.setTuning);
    const availableTunings: TuningDefinition[] = tunings.filter(
        (t) => t.variant === instrumentVariant.id,
    );

    return (
        <label className="px-3 py-1 flex items-center justify-between gap-3 border-b border-r rounded-tl-md border-zinc-600 bg-black text-white">
            <span>Tuning</span>
            <select
                value={tuning?.id}
                onChange={(e) => setTuning(e.target.value)}
                className="cursor-pointer capitalize border border-zinc-700 rounded-md bg-black hover:bg-zinc-800 outline-none"
            >
                {availableTunings.map((t) => (
                    <option value={t.id} key={t.id} className="capitalize">
                        {t.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default TuningSelector;
