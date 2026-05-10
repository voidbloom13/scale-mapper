import ShapeFilter from "./ShapeFilter";
import ShapeSelector from "./ShapeSelector";

const ShapeForm = () => {
    return (
        <div className="flex justify-between">
            <ShapeSelector />
            <ShapeFilter />
        </div>
    );
};

export default ShapeForm;
