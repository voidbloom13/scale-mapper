import ShapeFilter from "./ShapeFilter";
import ShapeSelector from "./ShapeSelector";

const ShapeForm = () => {
    return (
        <div className="flex flex-row justify-between gap-2">
            <ShapeFilter />
            <ShapeSelector />
        </div>
    );
};

export default ShapeForm;
