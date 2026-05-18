import { useState } from "react";
import InstrumentFamilySelector from "./InstrumentFamilySelector";
import InstrumentVariantSelector from "./InstrumentVariantSelector";
import TuningSelector from "./TuningSelector";
import ViewportSelector from "./ViewportSelector";
import { useInstrumentStore as InstrumentStore } from "../../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const InstrumentForm = () => {
    const instrumentVariant = InstrumentStore(
        (state) => state.instrumentVariant,
    );

    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative flex flex-col md:flex-row">
            <div
                className="block md:hidden px-3 py-1 text-xl cursor-pointer border-b border-r rounded-br-md border-zinc-600 text-zinc-200 hover:bg-zinc-500 hover:text-zinc-50 transition-all duration-150"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
            </div>
            <div
                className={`${isOpen ? "block" : "hidden"} absolute top-full left-0 md:static md:flex md:flex-row`}
            >
                <InstrumentFamilySelector />
                <InstrumentVariantSelector />
                {!instrumentVariant.id.includes("keyboard") && (
                    <TuningSelector />
                )}
                {!instrumentVariant.id.includes("keyboard") && (
                    <ViewportSelector />
                )}
            </div>
        </div>
    );
};

export default InstrumentForm;
