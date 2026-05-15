import "./App.css";
import "./index.css";
import InstrumentView from "./Components/InstrumentView/InstrumentView";
import TheoryForm from "./Components/TheoryIntakeForm/TheoryInstakeForm";
import ChordSelector from "./Components/ChordSelector/ChordSelector";
import TableGeneratorTest from "./Components/Test/TableGeneratorTest";
import { useModeStore as ModeStore } from "./store";

function App() {
    const mode = ModeStore((state) => state.mode);
    return (
        <div className="py-6 flex flex-col gap-4">
            <InstrumentView />
            <TheoryForm />
            {mode === "scale" && <ChordSelector />}
            <TableGeneratorTest />
        </div>
    );
}

export default App;
