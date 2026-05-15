import { useEffect } from "react";
import type { Scale, Chord } from "../../utility/theoryData.ts";
import {
    useModeStore as ModeStore,
    useShapeStore as ShapeStore,
    useShapeFilterStore as FilterStore,
} from "../../store";
import { scales, chords } from "../../utility/theoryData.ts";
import ShapeFilter from "./ShapeFilter.tsx";

const ShapeSelector = () => {
    const mode = ModeStore((state) => state.mode);
    const shape = ShapeStore((state) => state.shape);
    const setShape = ShapeStore((state) => state.setShape);
    const filter = FilterStore((state) => state.filter);
    let filteredShapeOptions: Scale[] | Chord[];

    if (filter && filter.length > 0) {
        if (mode === "scale") {
            filteredShapeOptions = scales.filter((scale) =>
                scale.tags?.includes(filter),
            );
        } else {
            filteredShapeOptions = chords.filter((chord) =>
                chord.tags?.includes(filter),
            );
        }
    } else {
        if (mode === "scale") {
            filteredShapeOptions = scales;
        } else {
            filteredShapeOptions = chords;
        }
    }

    useEffect(() => {
        if (filteredShapeOptions.length > 0) {
            const isValid = filteredShapeOptions.some((s) => s.id === shape.id);
            if (!isValid) {
                setShape(filteredShapeOptions[0]);
            }
        }
    }, [mode, filter, filteredShapeOptions, setShape, shape]);

    const updateShape = (shapeID: string) => {
        let shapeObj: Scale | Chord;
        if (mode === "scale") {
            shapeObj = scales.find((x) => x.id === shapeID)!;
        } else {
            shapeObj = chords.find((x) => x.id === shapeID)!;
        }
        setShape(shapeObj);
    };

    return (
        <div className="flex flex-row md:col-span-full items-center justify-between gap-4 w-full">
            <label
                className="capitalize text-center text-2xl font-serif tracking-wide text-zinc-200 font-bold"
                htmlFor="shape-selector"
            >
                {mode}
            </label>
            <div className="flex justify-end gap-2">
                <ShapeFilter />
                <select
                    className="w-8/10 h-10 md:w-64 p-1 rounded-sm font-orbitron font-bold tracking-wider bg-green-950 text-green-400 text-shadow-xs text-shadow-green-600 shadow-[inset_2px_2px_1px_rgba(0,0,0,0.8),2px_2px_2px_rgba(255,255,255,0.1)] truncate"
                    id="shape-selector"
                    onChange={(e) => updateShape(e.target.value)}
                    value={shape.id}
                >
                    {filteredShapeOptions.map((shape: Scale | Chord) => (
                        <option
                            className="font-share-tech-mono"
                            key={shape.id}
                            value={shape.id}
                        >
                            {shape.label.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ShapeSelector;
