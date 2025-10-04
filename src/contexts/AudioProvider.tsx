import React, { useRef, useEffect } from "react";

import type { ReactNode } from "react";
import { AudioContextContext } from "./AudioContext";

export type AudioContextProps = {
  sound: (duration: number, freqList: number[]) => Promise<void>;
};

type AudioProviderProps = {
  children: ReactNode;
};

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const currentOscillatorsRef = useRef<OscillatorNode[]>([]);

  useEffect(() => {
    audioCtxRef.current = new AudioContext();
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  const sound = async (duration: number, freqList: number[]) => {
    if (!audioCtxRef.current) return;

    console.log(freqList);

    // 停止所有正在播放的振荡器
    currentOscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        console.error("Failed to stop Oscillator");
      }
    });
    currentOscillatorsRef.current = [];

    const playChord = (freqs: number[], duration: number = 0.5) => {
      return new Promise<void>((resolve) => {
        const audioCtx = audioCtxRef.current!;
        const oscillators: OscillatorNode[] = [];
        const promises: Promise<void>[] = [];

        freqs.forEach((freq) => {
          const tonePromise = new Promise<void>((toneResolve) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = "sine";
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.1 / freqs.length, audioCtx.currentTime);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            oscillators.push(osc);
            currentOscillatorsRef.current.push(osc); // 存储到全局 ref

            osc.start();
            osc.stop(audioCtx.currentTime + duration);

            osc.onended = () => {
              // 从全局 ref 移除已经结束的振荡器
              currentOscillatorsRef.current =
                currentOscillatorsRef.current.filter((o) => o !== osc);
              toneResolve();
            };
          });
          promises.push(tonePromise);
        });

        Promise.all(promises).then(() => resolve());
      });
    };

    for (const freq of freqList) {
      await playChord([freq], duration);
    }
    if (freqList.length < 5 && freqList.length > 1) {
      await playChord(freqList, duration * 2);
    }
  };

  return (
    <AudioContextContext.Provider value={{ sound }}>
      {children}
    </AudioContextContext.Provider>
  );
};
