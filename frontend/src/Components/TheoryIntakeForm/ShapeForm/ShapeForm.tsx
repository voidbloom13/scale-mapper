import { useShapeStore as ShapeStore } from "../../../store";
import ShapeFilter from "./ShapeFilter";
import ShapeSelector from "./ShapeSelector";
import ChordToneContainer from "./ChordToneContainer";

const ShapeForm = () => {
    const shape = ShapeStore((state) => state.shape);

    return (
        <div className="grid grid-cols-2 grid-rows-2 justify-between">
            <ShapeSelector />
            <ShapeFilter />
            {shape.type === "scale" && shape.derivesChordsFrom && (
                <ChordToneContainer />
            )}
        </div>
    );
};

export default ShapeForm;
