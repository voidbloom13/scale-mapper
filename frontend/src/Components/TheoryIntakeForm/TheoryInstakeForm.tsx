import TheoryForm from "./TheoryForm/TheoryForm";
import ShapeForm from "./ShapeForm/ShapeForm";
import ChordToneContainer from "./ShapeForm/ChordToneContainer";
import { useShapeStore as ShapeStore } from "../../store";

const TheoryInstakeForm = () => {
    const shape = ShapeStore((state) => state.shape);
    return (
        <div className="w-6/10 mx-auto p-3 bg-linear-to-b from-zinc-600 via-zinc-700 to-zinc-800 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] border-t border-zinc-500/30 rounded-lg flex flex-col gap-3 justify-center align-middle">
            <TheoryForm />
            <ShapeForm />
            {shape.type === "scale" && shape.derivesChordsFrom && (
                <ChordToneContainer />
            )}
        </div>
    );
};

export default TheoryInstakeForm;
