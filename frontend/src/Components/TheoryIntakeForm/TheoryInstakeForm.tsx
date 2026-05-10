import TheoryForm from "./TheoryForm/TheoryForm";
import ShapeForm from "./ShapeForm/ShapeForm";

const TheoryInstakeForm = () => {
    return (
        <div className="w-6/10 mx-auto p-3 bg-slate-200 border-2 border-slate-600 rounded-md flex flex-col justify-center align-middle">
            <TheoryForm />
            <ShapeForm />
        </div>
    );
};

export default TheoryInstakeForm;
