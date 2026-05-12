import { useScaleDegreeStore as ScaleDegreeStore } from "../../../store";
import type { IntervalToken } from "../../../utility/theoryData";

interface ChordSelectorProps {
    interval: IntervalToken;
    key: IntervalToken;
    degree: number;
    label: string;
}

const ChordSelector = (props: ChordSelectorProps) => {
    const setDegree = ScaleDegreeStore((state) => state.setDegree);
    return (
        <div>
            <button
                className="size-14 text-sm flex items-center justify-center rounded-full bg-black text-amber-500 font-serif shadow-md shadow-blue-800 hover:shadow-lg hover:shadow-blue-400 hover:text-amber-300 transition-all duration-300"
                onClick={() => setDegree(props.degree + 1)}
            >
                {props.label}
            </button>
        </div>
    );
};

export default ChordSelector;
