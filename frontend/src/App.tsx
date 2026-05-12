import "./App.css";
import InstrumentView from "./Components/InstrumentView/InstrumentView";
import TableGeneratorTest from "./Components/Test/TableGeneratorTest";
import TheoryInstakeForm from "./Components/TheoryIntakeForm/TheoryInstakeForm";

function App() {
    return (
        <div className="w-screen h-screen py-8 bg-slate-800">
            <InstrumentView />
            <TheoryInstakeForm />
            <TableGeneratorTest />
        </div>
    );
}

export default App;
