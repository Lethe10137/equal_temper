import "./App.css";
import { AudioProvider } from "./contexts/AudioProvider";

import NotesPad from "./components/NotesPad";
import RadioForm from "./components/RadioForm";
import { pitches } from "./assets/pitches";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [marks, setMarks] = useState(pitches["Major_Scale"]);
  return (
    <div className="main">
      <AudioProvider>
        <div className="main-row">
          <RadioForm options={pitches} onChange={setMarks} />
          <NotesPad marks={marks} />
        </div>
        <Footer />
      </AudioProvider>
    </div>
  );
}

export default App;
