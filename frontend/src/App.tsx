import "./App.css";
import InstrumentView from "./Components/InstrumentView/InstrumentView";
import TableGeneratorTest from "./Components/Test/TableGeneratorTest";
import TheoryInstakeForm from "./Components/TheoryIntakeForm/TheoryInstakeForm";

function App() {
    return (
        <div className="w-screen h-screen py-8 bg-slate-800">
            <InstrumentView />
            <TheoryInstakeForm />
            <div className="flex gap-4 justify-center">
                <TableGeneratorTest
                    root="C"
                    shape="ionian"
                    mode="scale"
                    label="C Major"
                />
            </div>
            <p className="w-1/2 mx-auto text-slate-300 text-center font-lg font-mono">
                1- Create Theory Form, Scale Mode Form, and Chord Mode Form in
                that order
            </p>
            <p className="w-1/2 mx-auto text-slate-300 text-center font-lg font-mono">
                2- Ensure state management via zustand works, hard-coding any
                information that is needed for Scale Mode or Chord Mode while
                testing.
            </p>
            <p className="w-1/2 mx-auto text-slate-300 text-center font-lg font-mono">
                Future- Look into the best way to render the keyboard and
                fretboard maps. SVG? Manually drawing the canvas?
            </p>
        </div>
    );
}

export default App;
