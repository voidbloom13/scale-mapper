import ModeSelector from "./ModeSelector";
import RootSelector from "./RootSelector";
import ShapeSelector from "./ShapeSelector";
import brushedMetalOverlay from "../../../src/assets/brushed-metal-overlay.png";

const TheoryForm = () => {
    return (
        <div className="relative isolate z-20 w-8/10 max-w-xl mx-auto p-3 bg-linear-to-b from-zinc-600 via-zinc-700 to-zinc-800 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] border-t border-zinc-500/30 rounded-lg flex flex-col gap-3 justify-center align-middle">
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
            <div className="relative z-10 gap-2 flex flex-col md:grid md:grid-cols-2">
                <ModeSelector />
                <RootSelector />
                <ShapeSelector />
            </div>
        </div>
    );
};

export default TheoryForm;
