import InstrumentForm from "./InstrumentForm/InstrumentForm";

const InstrumentView = () => {
    return (
        <div className="w-7/10 mx-auto py-16 text-center font-bold text-cyan-800 bg-cyan-200 text-2xl border border-cyan-800 rounded-md">
            <InstrumentForm />
            Instrument View
        </div>
    );
};

export default InstrumentView;
