import InstrumentForm from "./InstrumentForm/InstrumentForm";
import { useInstrumentStore as InstrumentStore } from "../../store";

const InstrumentView = () => {
    const w = InstrumentStore((state) => state.instrumentFamily);
    const x = InstrumentStore((state) => state.instrumentVariant);
    const y = InstrumentStore((state) => state.tuning);
    const z = InstrumentStore((state) => state.view);
    return (
        <div className="w-11/12 max-w-7xl flex flex-col text-white bg-zinc-950 border border-zinc-700 rounded-md">
            <InstrumentForm />
            <div className="flex flex-col gap-2 m-2 px-4 py-2 bg-zinc-900 border border-zinc-600 rounded-lg">
                <span className="capitalize">Instrument: {w}</span>
                <span>Variant: {x.label}</span>
                {!x.id.includes("keyboard") && (
                    <div className="flex flex-col">
                        <span>Tuning: {y?.label}</span>
                        <span>
                            MIDI:{" "}
                            {y?.tuning.map((midi) => (
                                <span key={midi}>{midi} </span>
                            ))}
                        </span>
                    </div>
                )}
                <span>View: {z}</span>
            </div>
        </div>
    );
};

export default InstrumentView;
