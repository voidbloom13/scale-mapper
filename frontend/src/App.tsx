import "./App.css";
import "./index.css";
import InstrumentView from "./Components/InstrumentView/InstrumentView";
import TheoryForm from "./Components/TheoryForm/TheoryForm";
import ChordSelector from "./Components/ChordSelector/ChordSelector";
import { useModeStore as ModeStore } from "./store";
import TableGeneratorTest from "./Components/Test/TableGeneratorTest";

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
