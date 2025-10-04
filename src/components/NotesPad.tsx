import { useAudio } from "../hooks/useAudio";
import { useState } from "react";
import type { NoteItem } from "../types";
type NoteProps = {
  rotation: number;
  content: string;
  freq: number;
};

function Note({ rotation, content, freq }: NoteProps) {
  const { sound } = useAudio();
  return (
    <h1
      onClick={() => sound(0.3, [freq])}
      style={{
        position: "absolute",
        top: "60vh",
        left: "35vh",
        width: "10vh",
        height: "10vh",
        background: "skyblue",
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "5vh -25vh", // rotate around the parent’s center
        transition: "transform 0.3s ease",
      }}
      className="center-text"
    >
      {content}
    </h1>
  );
}

type MarkProps = {
  rotation: number;
  content: string;
};

function Mark({ rotation, content }: MarkProps) {
  return (
    <h2
      style={{
        position: "absolute",
        top: `${Math.sin((rotation / 180) * Math.PI) * 22 + 30}vh`,
        left: `${Math.cos((rotation / 180) * Math.PI) * 22 + 35}vh`,
        width: "10vh",
        height: "10vh",
        color: "black",
        fontSize: "2.5em",
        // outline: "1px solid yellow",
      }}
      className="center-text"
    >
      {content}
    </h2>
  );
}

const notes_name = [
  "C",
  "#C",
  "D",
  "#D",
  "E",
  "F",
  "#F",
  "G",
  "#G",
  "A",
  "#A",
  "B",
];

type NotesPadProps = {
  marks: NoteItem[];
};

const get_freq = (offset: number, min: number) => {
  let freq = 442 * Math.pow(2, offset / 12 + 0.25);

  // console.log(notes_name[offset], offset, freq);

  while (freq < min * 0.9999) {
    freq *= 2;
  }
  while (freq > min * 2.0001) {
    freq *= 0.5;
  }
  return freq;
};

export default function NotesPad({ marks: ori_marks }: NotesPadProps) {
  const [count, setCount] = useState(0);
  const [five, setFive] = useState(false);
  const audio = useAudio();

  const notes = Array.from({ length: 12 }, (_, i) => {
    if (five) {
      return (i * 7) % 12;
    } else return i;
  });
  const marks = notes.map((x) => ori_marks[x]);

  const k: [NoteItem, number][] = marks.map((x, i) => [
    x,
    notes[(12 - (count % 12) + i) % 12],
  ]);
  const freqs = k
    .filter((x) => x[0].id >= 0)
    .sort((a, b) => a[0].id - b[0].id)
    .map((x) => 442 * Math.pow(2, x[1] / 12 + 0.25));

  for (let i = 1; i < freqs.length; i++) {
    if (freqs[i] < freqs[i - 1]) {
      freqs[i] *= 2;
    }
  }
  if (freqs.length == 7) {
    freqs.push(freqs[0] * 2);
  }

  return (
    <>
      <div
        style={{
          width: "80vh",
          height: "80vh",
        }}
      >
        {notes.map((x, i) => (
          <Note
            key={"note" + i}
            rotation={(i + count - 3) * 30 - 90}
            content={notes_name[x]}
            freq={get_freq(x, freqs[0])}
          />
        ))}
        {marks.map((x, i) => (
          <Mark key={"mark" + i} rotation={i * 30 - 90} content={x.label} />
        ))}{" "}
      </div>
      <div className="card">
        <button
          onClick={() => {
            setFive(!five);
            setCount(count % 2 == 0 ? count : (6 + count) % 12);
          }}
        >
          Toggle mode
        </button>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>-</button>
        <button onClick={() => audio.sound(0.3, freqs)}> Play</button>
        <button onClick={() => setCount((count) => count - 1)}>+</button>
      </div>
    </>
  );
}
