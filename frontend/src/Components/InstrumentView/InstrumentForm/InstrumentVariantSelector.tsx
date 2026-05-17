import { useInstrumentStore as InstrumentStore } from "../../../store";
import {
    type GuitarVariant,
    type BassVariant,
    type KeyboardVariant,
    type GuitarVariantDefinition,
    type BassVariantDefinition,
    type KeyboardVariantDefinition,
    guitarVariants,
    bassVariants,
    keyboardVariants,
} from "../../../utility/instrumentData";

const InstrumentVariantSelector = () => {
    const instrumentFamily = InstrumentStore((state) => state.instrumentFamily);
    const instrumentVariant = InstrumentStore(
        (state) => state.instrumentVariant,
    );
    const setInstrumentVariant = InstrumentStore(
        (state) => state.setInstrumentVariant,
    );
    let options:
        | GuitarVariantDefinition[]
        | BassVariantDefinition[]
        | KeyboardVariantDefinition[];

    switch (instrumentFamily) {
        case "guitar":
            options = guitarVariants;
            break;
        case "bass":
            options = bassVariants;
            break;
        case "keyboard":
            options = keyboardVariants;
            break;
        default:
            throw new Error(
                "Unknown Instrument Type: no instruments or variants to return.",
            );
    }

    return (
        <label className="px-3 py-1 flex items-center justify-between gap-3 border-b border-r rounded-tl-md border-zinc-600 bg-black text-white">
            <span>Range</span>
            <select
                value={instrumentVariant.id}
                onChange={(e) =>
                    setInstrumentVariant(
                        e.target.value as
                            | GuitarVariant
                            | BassVariant
                            | KeyboardVariant,
                    )
                }
                className="cursor-pointer capitalize border border-zinc-700 rounded-md bg-black hover:bg-zinc-800 outline-none"
            >
                {options.map((variant) => (
                    <option value={variant.id} key={variant.id}>
                        {variant.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default InstrumentVariantSelector;
