import {
    generateIntervalsAndNotes,
    type ScaleNote,
} from "../../utility/theoryEngine";
import {
    useRootStore as RootStore,
    useModeStore as ModeStore,
    useShapeStore as ShapeStore,
    useScaleDegreeStore as ScaleDegreeStore,
    useDisplaySeventhStore as DisplaySeventhStore,
} from "../../store";

const TableGeneratorTest = () => {
    const root = RootStore((state) => state.root);
    const mode = ModeStore((state) => state.mode);
    const shape = ShapeStore((state) => state.shape);
    const degree = ScaleDegreeStore((state) => state.degree);
    const displaySeventh = DisplaySeventhStore((state) => state.displaySeventh);

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
