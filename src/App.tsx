import "./App.css";
import { AudioProvider } from "./contexts/AudioProvider";

import NotesPad from "./components/NotesPad";
import RadioForm from "./components/RadioForm";
import { pitches } from "./assets/pitches";
import { useState } from "react";
import Footer from "./components/Footer";

// 定义主容器样式，用于确保页脚位于底部
const appContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", // 确保应用容器至少占满整个视口高度
};

const mainContentStyle: React.CSSProperties = {
  flexGrow: 1, // 确保主要内容区域占据所有剩余空间
  padding: "20px",
};

function App() {
  const [marks, setMarks] = useState(pitches["Major_Scale"]);
  return (
    <div style={appContainerStyle}>
      <AudioProvider>
        <div style={mainContentStyle}>
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
        </div>
        <Footer />
      </AudioProvider>
    </div>
  );
}

export default App;
