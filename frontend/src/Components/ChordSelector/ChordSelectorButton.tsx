import { useScaleDegreeStore as ScaleDegreeStore } from "../../store";
import type { IntervalToken } from "../../utility/theoryData";

interface ChordSelectorProps {
    interval: IntervalToken;
    key: IntervalToken;
    degree: number;
    label: string;
}

const ChordSelectorButton = (props: ChordSelectorProps) => {
    const degree = ScaleDegreeStore((state) => state.degree);
    const setDegree = ScaleDegreeStore((state) => state.setDegree);
    const buttonStyle: string =
        props.degree + 1 === degree ? "text-zinc-50" : "text-zinc-400";
    const ledStyle: string =
        props.degree + 1 === degree
            ? "bg-green-400 border border-green-600 shadow-md shadow-green-200"
            : "bg-green-900 border border-green-950 shadow-sm shadow-zinc-400";

    return (
        <div
            className="w-22 mx-2 my-1 cursor-pointer flex flex-col gap-1 items-center"
            onClick={() => setDegree(props.degree + 1)}
        >
            <div className={`w-3 h-3 rounded-full ${ledStyle}`}></div>
            <span
                className={`font-serif text-xl tracking-wider ${buttonStyle} transition-all duration-250 ease-in-out`}
            >
                {props.label}
            </span>
        </div>
    );
};

export default ChordSelectorButton;
