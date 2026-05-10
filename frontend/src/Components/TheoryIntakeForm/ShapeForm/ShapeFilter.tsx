import { useEffect } from "react";
import {
    useModeStore as ModeStore,
    useShapeFilterStore as FilterStore,
} from "../../../store";
import { scaleTags, chordTags } from "../../../utility/theoryData";

const ShapeFilter = () => {
    const mode = ModeStore((state) => state.mode);
    const filter = FilterStore((state) => state.filter);
    const setFilter = FilterStore((state) => state.setFilter);
    const scaleTagsArray: string[] = Array.from(scaleTags);
    const chordTagsArray: string[] = Array.from(chordTags);

    useEffect(() => {
        setFilter("");
    }, [mode, setFilter]);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <label htmlFor="filter-selector">Filter</label>
            <select
                className="capitalize border w-8/10 text-center"
                id="filter-selector"
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
            >
                <option value=""></option>
                {mode === "scale"
                    ? scaleTagsArray.map((tag: string) => (
                          <option className="capitalize" key={tag} value={tag}>
                              {tag}
                          </option>
                      ))
                    : chordTagsArray.map((tag: string) => (
                          <option className="capitalize" key={tag} value={tag}>
                              {tag}
                          </option>
                      ))}
            </select>
        </div>
    );
};

export default ShapeFilter;
