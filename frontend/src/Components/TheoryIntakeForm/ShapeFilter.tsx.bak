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
        <div className="flex flex-row items-center justify-center gap-4">
            <label
                className="text-center text-2xl font-serif tracking-wide text-zinc-200 font-bold"
                htmlFor="filter-selector"
            >
                Filter
            </label>
            <select
                className="w-8/10 px-2 outline-0 text-zinc-200 bg-linear-to-b from-zinc-500 via-zinc-700 to-zinc-400 active:from-zinc-300 active:via-zinc-50 active:to-zinc-400 active:text-zinc-800 shadow-[-1px_-2px_3px_rgba(0,0,0,0.6),2px_2px_3px_rgba(255,255,255,0.2)] rounded-full capitalize cursor-pointer border-none text-center truncate"
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
