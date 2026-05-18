import { useState, useEffect } from "react";
import { useFilterStore as FilterStore } from "../../store";
import { scaleTags, chordTags, scales, chords } from "../../utility/theoryData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";

const ShapeFilter = () => {
    const mode = FilterStore((state) => state.mode);
    const filter = FilterStore((state) => state.filter);
    const toggleFilter = FilterStore((state) => state.toggleFilter);
    const resetFilter = FilterStore((state) => state.resetFilter);

    const [isOpen, setIsOpen] = useState(false);

    // Clear filter when mode changes
    useEffect(() => {
        resetFilter();
    }, [mode, resetFilter]);

    const availableShapes = mode === "scale" ? scales : chords;
    const currentTags = mode === "scale" ? scaleTags : chordTags;
    const tagsArray = Array.from(currentTags);

    // Filter shapes based on currently selected tags
    const filteredShapes = availableShapes.filter((shape) =>
        filter.every((f) => shape.tags?.includes(f)),
    );

    // Determine which tags are still valid to select (would result in >= 1 shape)
    const getAvailableTags = () => {
        return tagsArray.filter((tag) => {
            if (filter.includes(tag)) return true; // Already selected is always 'available' to deselect
            const potentialFilter = [...filter, tag];
            return availableShapes.some((shape) =>
                potentialFilter.every((f) => shape.tags?.includes(f)),
            );
        });
    };

    const availableTags = getAvailableTags();

    const isFilterActive = filter.length > 0;
    const buttonStyle =
        isOpen || isFilterActive
            ? "text-green-400 text-shadow-md text-shadow-green-400 shadow-[inset_2px_2px_3px_rgba(0,0,0,0.8),inset_-2px_-2px_3px_rgba(255,255,255,0.2)] from-zinc-700 to-zinc-800"
            : "text-zinc-400 shadow-[inset_2px_2px_3px_rgba(255,255,255,0.3),inset_-2px_-2px_3px_rgba(0,0,0,0.8)] from-zinc-600 to-zinc-700";

    return (
        <div className="flex flex-row items-center justify-center gap-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-10 h-10 text-2xl font-serif font-bold cursor-pointer rounded-md bg-radial ${buttonStyle} transition-all duration-150`}
            >
                <FontAwesomeIcon icon={faFilter} />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <dialog
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-112.5 max-h-[85vh] overflow-y-auto flex flex-col bg-zinc-800 border border-zinc-600 rounded-xl shadow-2xl p-6 text-zinc-200 ${isOpen ? "" : "hidden"}`}
            >
                <div className="flex justify-between items-center mb-4 border-b border-zinc-700 pb-2">
                    <h3 className="text-xl font-bold font-serif tracking-wide">
                        Filter {mode}s
                    </h3>
                    <div className="flex items-center gap-4">
                        <span className="text-zinc-500 text-sm font-share-tech-mono">
                            {filteredShapes.length} results
                        </span>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <div className="w-full min-h-8 flex flex-wrap gap-2 mb-4">
                    {filter.length === 0 ? (
                        <span className="text-zinc-500 italic text-sm">
                            No filters active
                        </span>
                    ) : (
                        filter.map((tag) => (
                            <div
                                key={tag}
                                onClick={() => toggleFilter(tag)}
                                className="px-3 py-1 bg-green-900/40 text-green-400 border border-green-800 rounded-full text-sm flex items-center gap-2 cursor-pointer hover:bg-green-900/60 transition-colors"
                            >
                                <span className="capitalize">{tag}</span>
                                <span className="text-xs">✕</span>
                            </div>
                        ))
                    )}
                </div>

                <div
                    className={`px-4 py-2 mb-4 capitalize cursor-pointer w-full border border-zinc-600 rounded-md text-center transition-colors ${filter.length > 0 ? "hover:bg-zinc-700" : "opacity-50 cursor-not-allowed"}`}
                    onClick={() => filter.length > 0 && resetFilter()}
                >
                    Clear All
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {tagsArray.map((tag: string) => {
                        const isSelected = filter.includes(tag);
                        const isAvailable = availableTags.includes(tag);

                        return (
                            <div
                                key={tag}
                                className={`p-2 rounded border transition-all duration-200 select-none ${
                                    isSelected
                                        ? "bg-green-900/40 border-green-500 text-green-400"
                                        : isAvailable
                                          ? "bg-zinc-700/50 border-zinc-600 hover:bg-zinc-700 cursor-pointer"
                                          : "bg-zinc-900/30 border-zinc-800 text-zinc-600 cursor-not-allowed grayscale"
                                }`}
                                onClick={() => isAvailable && toggleFilter(tag)}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="capitalize">{tag}</span>
                                    {isSelected && (
                                        <span className="text-xs">●</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </dialog>
        </div>
    );
};

export default ShapeFilter;
