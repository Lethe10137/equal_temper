import { useContext } from "react";
import type { AudioContextProps } from "../contexts/AudioProvider";
import { AudioContextContext } from "../contexts/AudioContext";

export const useAudio = (): AudioContextProps => {
  const context = useContext(AudioContextContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
};
