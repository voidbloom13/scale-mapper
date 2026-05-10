import RootSelector from "./RootSelector";
import ModeSelector from "./ModeSelector";

const TheoryForm = () => {
    return (
        <div className="flex justify-between">
            <RootSelector />
            <ModeSelector />
        </div>
    );
};

export default TheoryForm;
