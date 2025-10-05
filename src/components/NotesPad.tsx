import { useAudio } from "../hooks/useAudio";
import { useState } from "react";
import type { NoteItem } from "../types";

import BinarySelector from "../components/Selector";

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
        top: "80cqw",
        left: "45cqw",
        width: "10cqw",
        height: "10cqw",
        background: "deepskyblue",
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "5cqw -35cqw", // rotate around the parent’s center
        transition: "transform 0.3s ease",
      }}
      className="center-t%t"
    >
      <div
        style={{
          transform: `rotate(${-rotation}deg)`,
          transformOrigin: "center center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          transition: "transform 0.3s ease",
        }}
      >
        {content}
      </div>
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
        top: "73cqw",
        left: "45cqw",
        width: "10cqw",
        height: "10cqw",
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "5cqw -27cqw", // rotate around the parent’s center
        transition: "transform 0.3s ease",
        // outline: "1px solid red",
      }}
      className="center-t%t"
    >
      <div
        style={{
          transform: `rotate(${-rotation}deg)`,
          transformOrigin: "center center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          transition: "transform 0.3s ease",
        }}
      >
        {content}
      </div>
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
  let freq = 221 * Math.pow(2, offset / 12 + 0.25);

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
  const [count, setCount] = useState(6);
  const [five, setFive] = useState(false);
  const [fromDo, setFromDo] = useState(false);
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
  let semi = k
    .filter((x) => x[0].id >= 0)
    .sort((a, b) => a[0].id - b[0].id)
    .map((x) => ((x[1] % 12) + 18) % 12);

  if (!fromDo) {
    semi = semi.sort((a, b) => a - b);
  }

  // console.log(semi);
  const freqs = semi.map((x) => Math.pow(2, 0.25 + x / 12) * 221);

  for (let i = 1; i < freqs.length; i++) {
    if (freqs[i] < freqs[i - 1]) {
      freqs[i] *= 2;
    }
  }

  if (freqs.length == 7) {
    freqs.push(freqs[0] * 2);
  }
  // console.log(freqs);

  return (
    <div
      style={{
        width: "60vh",
        maxWidth: "90vw",
        aspectRatio: "3/4",
        transform: "scale(1)",
        outline: "1px solid blue",
        marginBottom: "3vh",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "75%",
          outline: "1px solid blue",
          containerType: "size",
        }}
      >
        {notes.map((x, i) => (
          <Note
            key={"note" + i}
            rotation={
              (i - 3) * 30 -
              90 +
              30 * count * (fromDo ? 1 : 0) -
              (fromDo ? 180 : 0)
            }
            content={notes_name[x]}
            freq={get_freq(x, freqs[0])}
          />
        ))}
        {marks.map((x, i) => (
          <Mark
            key={"mark" + i}
            rotation={
              i * 30 - 30 * count * (fromDo ? 0 : 1) - (fromDo ? 180 : 0)
            }
            content={x.label}
          />
        ))}
      </div>
      <div className="card">
        {/*{count}*/} Layout:
        <BinarySelector
          trueLabel="Fifths"
          falseLabel="Chromatic"
          onSelectionChange={(f) => {
            if (count % 2 != 0 && f !== five) {
              setCount(count + (count > 0 ? -6 : 6));
            }
            setFive(f);
          }}
        />
      </div>
      <div className="card">
        Solmization:
        <BinarySelector
          trueLabel="Relative"
          falseLabel="Absolute"
          onSelectionChange={setFromDo}
        />
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>-</button>
        <button onClick={() => audio.sound(0.3, freqs)}> Play</button>
        <button onClick={() => setCount((count) => count - 1)}>+</button>
      </div>
    </div>
  );
}
