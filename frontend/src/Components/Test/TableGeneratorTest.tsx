import {
    generateIntervalsAndNotes,
    type ScaleNote,
} from "../../utility/theoryEngine";
import {
    useFilterStore as FilterStore,
    useTheoryStore as TheoryStore,
} from "../../store";

const TableGeneratorTest = () => {
    const root = TheoryStore((state) => state.root);
    const mode = FilterStore((state) => state.mode);
    const shape = TheoryStore((state) => state.shape);
    const degree = TheoryStore((state) => state.degree);
    const displaySeventh = TheoryStore((state) => state.displaySeventh);

    const intervalsAndNotes = generateIntervalsAndNotes(
        root,
        shape.id,
        mode,
        degree,
        displaySeventh,
    );

    type NoteRank = ScaleNote["noteRank"];

    const categoryStyles: Record<NoteRank, string> = {
        Root: "bg-rose-600 text-rose-100 font-bold",
        Third: "bg-green-600 text-green-200 font-bold",
        Fifth: "bg-blue-600 text-sky-200 font-bold",
        Seventh: "bg-purple-600 text-purple-200 font-bold",
        Passing: "bg-gray-400 text-slate-800",
    };

    return (
        <div className="text-slate-300 text-center m-2">
            <span className="capitalize text-lg font-bold text-center">
                {root} {shape.label}
            </span>
            <table className="mx-auto p-4 border border-slate-300 rounded-md">
                <thead>
                    <tr className="border-b-2 border-slate-300 bg-slate-900">
                        <th className="px-2 text-center">Interval</th>
                        <th className="px-2 text-center">Note</th>
                    </tr>
                </thead>
                <tbody>
                    {intervalsAndNotes.map((item) => {
                        const styles = categoryStyles[item.noteRank];

                        return (
                            <tr
                                className={`${styles} font-serif border-b border-slate-300`}
                                key={item.note}
                            >
                                <td>{item.interval}</td>
                                <td>{item.note}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableGeneratorTest;
