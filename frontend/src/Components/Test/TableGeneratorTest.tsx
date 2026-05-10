import { generateIntervalsAndNotes } from "../../utility/theoryEngine";
import {
    useRootStore as RootStore,
    useModeStore as ModeStore,
    useShapeStore as ShapeStore,
} from "../../store";

const TableGeneratorTest = () => {
    const root = RootStore((state) => state.root);
    const mode = ModeStore((state) => state.mode);
    const shape = ShapeStore((state) => state.shape);

    const intervalsAndNotes = generateIntervalsAndNotes(root, shape, mode);

    return (
        <div className="text-slate-300 text-center m-2">
            <span className="capitalize text-lg font-bold text-center">
                {root} {shape}
            </span>
            <table className="mx-auto p-4 border border-slate-300 rounded-md">
                <thead>
                    <tr className="border-b-2 border-slate-300">
                        <th className="px-2 text-center">Interval</th>
                        <th className="px-2 text-center">Note</th>
                    </tr>
                </thead>
                <tbody>
                    {intervalsAndNotes[0].map((item, i) => (
                        <tr
                            className="border-b border-slate-300"
                            key={item ?? i}
                        >
                            <td>{item}</td>
                            <td>{intervalsAndNotes[1][i]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableGeneratorTest;
