import TheoryForm from "./TheoryForm/TheoryForm";
import ShapeForm from "./ShapeForm/ShapeForm";
import ChordToneContainer from "./ShapeForm/ChordToneContainer";
import { useShapeStore as ShapeStore } from "../../store";
import brushedMetalOverlay from "../../../src/assets/brushed-metal-overlay.png";

const TheoryInstakeForm = () => {
    const shape = ShapeStore((state) => state.shape);
    return (
        <div className="relative isolate w-6/10 mx-auto p-3 bg-linear-to-b from-zinc-600 via-zinc-700 to-zinc-800 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] border-t border-zinc-500/30 rounded-lg flex flex-col gap-3 justify-center align-middle">
            <div
                className="absolute inset-0 pointer-events-none rounded-lg z-0"
                style={{
                    backgroundImage: `url(${brushedMetalOverlay})`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "400px 100px",
                    mixBlendMode: "overlay",
                    opacity: 0.5,
                }}
            />
            <div className="relative z-10 flex flex-col gap-3">
                <TheoryForm />
                <ShapeForm />
                {shape.type === "scale" && shape.derivesChordsFrom && (
                    <ChordToneContainer />
                )}
            </div>
        </div>
    );
};

export default TheoryInstakeForm;
