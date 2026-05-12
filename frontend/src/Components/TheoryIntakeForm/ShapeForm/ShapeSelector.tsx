import { useEffect } from "react";
import type { Scale, Chord } from "../../../utility/theoryData.ts";
import {
    useModeStore as ModeStore,
    useShapeStore as ShapeStore,
    useShapeFilterStore as FilterStore,
} from "../../../store";
import { scales, chords } from "../../../utility/theoryData.ts";

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
        <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="shape-selector">Shape</label>
            <select
                className="capitalize border w-8/10 text-center"
                id="shape-selector"
                onChange={(e) => updateShape(e.target.value)}
                value={shape.id}
            >
                {filteredShapeOptions.map((shape: Scale | Chord) => (
                    <option
                        className="capitalize"
                        key={shape.id}
                        value={shape.id}
                    >
                        {shape.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ShapeSelector;
