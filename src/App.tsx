import "./App.css";
import { AudioProvider } from "./contexts/AudioProvider";

import NotesPad from "./components/NotesPad";
import RadioForm from "./components/RadioForm";
import { pitches } from "./assets/pitches";
import { useState } from "react";

function App() {
  const [marks, setMarks] = useState(pitches["Major_Scale"]);
  return (
    <AudioProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // 两端对齐
          alignItems: "flex-start", // 顶部对齐
          gap: "20px", // 两者之间的间距，可选
        }}
      >
        <div
          style={{
            transform: "scale(1)",
            transformOrigin: "center center",
            outline: "1px solid blue",
          }}
        >
          <NotesPad marks={marks} />
        </div>

        <RadioForm options={pitches} onChange={setMarks} />
      </div>
    </AudioProvider>
  );
}

export default App;
