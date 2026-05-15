import { useEffect, useState } from "react";
import {
    useModeStore as ModeStore,
    useShapeFilterStore as FilterStore,
} from "../../store";
import { scaleTags, chordTags } from "../../utility/theoryData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";

const ShapeFilter = () => {
    const mode = ModeStore((state) => state.mode);
    const filter = FilterStore((state) => state.filter);
    const setFilter = FilterStore((state) => state.setFilter);
    const scaleTagsArray: string[] = Array.from(scaleTags);
    const chordTagsArray: string[] = Array.from(chordTags);
    const tempFilter: string[] = [];
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setFilter("");
    }, [mode, setFilter]);

    const setTempFilter = (tempFilter: string[]) => {
        console.log(tempFilter);
    };

    const buttonStyle = isOpen
        ? "text-green-400 text-shadow-md text-shadow-green-400 shadow-[inset_2px_2px_1px_rgba(0,0,0,0.8),2px_2px_2px_rgba(255,255,255,0.1)] from-zinc-700 to-zinc-800"
        : "text-zinc-400 shadow-[inset_2px_2px_1px_rgba(255,255,255,0.1),2px_2px_2px_rgba(0,0,0,0.8)] from-zinc-600 to-zinc-700";

    return (
        <div className="flex flex-row items-center justify-center gap-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-10 h-10 text-2xl font-serif font-bold cursor-pointer rounded-md bg-radial ${buttonStyle} transition-all duration-150`}
            >
                <FontAwesomeIcon icon={faFilter} />
            </button>
            <dialog className={`flex flex-col ${isOpen ? "" : "hidden"}`}>
                <div>
                    <label
                        htmlFor="remove-tags"
                        className="capitalize cursor-pointer"
                        onClick={() => setTempFilter([])}
                    >
                        [Remove Tags]
                    </label>
                    <input type="checkbox" id="remove-tags" className="" />
                </div>{" "}
                {mode === "scale"
                    ? scaleTagsArray.map((tag: string) => (
                          <div key={tag}>
                              <label
                                  htmlFor={tag}
                                  className="capitalize cursor-pointer"
                                  onClick={() =>
                                      setTempFilter([...tempFilter, tag])
                                  }
                              >
                                  {tag}
                              </label>
                              <input type="checkbox" id={tag} className="" />
                          </div>
                      ))
                    : chordTagsArray.map((tag: string) => (
                          <div key={tag}>
                              <label
                                  htmlFor={tag}
                                  className="capitalize cursor-pointer"
                                  onClick={() =>
                                      setTempFilter([...tempFilter, tag])
                                  }
                              >
                                  {tag}
                              </label>
                              <input type="checkbox" id={tag} className="" />
                          </div>
                      ))}
            </dialog>
        </div>
    );
};

export default ShapeFilter;
