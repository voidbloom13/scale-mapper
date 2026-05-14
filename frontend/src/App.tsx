import "./App.css";
import "./index.css";
import InstrumentView from "./Components/InstrumentView/InstrumentView";
import TableGeneratorTest from "./Components/Test/TableGeneratorTest";
import TheoryInstakeForm from "./Components/TheoryIntakeForm/TheoryInstakeForm";

function App() {
    return (
        <div>
            <InstrumentView />
            <TheoryInstakeForm />
            <TableGeneratorTest />
        </div>
    );
}

export default App;
