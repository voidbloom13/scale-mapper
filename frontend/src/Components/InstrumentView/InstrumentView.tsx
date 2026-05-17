import InstrumentForm from "./InstrumentForm/InstrumentForm";
import { useInstrumentStore as InstrumentStore } from "../../store";

const InstrumentView = () => {
    const x = InstrumentStore((state) => state.instrumentFamily);
    const y = InstrumentStore((state) => state.instrumentVariant);
    const z = InstrumentStore((state) => state.tuning);
    return (
        <div className="w-11/12 max-w-7xl flex flex-col text-white bg-zinc-950 border border-zinc-700 rounded-md">
            <InstrumentForm />
            <div className="flex flex-col gap-2 m-2 px-4 py-2 bg-zinc-900 border border-zinc-600 rounded-lg">
                <span className="capitalize">Instrument: {x}</span>
                <span>Variant: {y.label}</span>
                {!y.id.includes("keyboard") && (
                    <div className="flex flex-col">
                        <span>Tuning: {z?.label}</span>
                        <span>
                            MIDI:{" "}
                            {z?.tuning.map((midi) => (
                                <span>{midi} </span>
                            ))}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InstrumentView;
