import RootSelector from "./RootSelector";
import ModeSelector from "./ModeSelector";

const TheoryForm = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center">
            <ModeSelector />
            <RootSelector />
        </div>
    );
};

export default TheoryForm;
