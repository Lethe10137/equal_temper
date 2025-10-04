import { createContext } from "react";
import type { AudioContextProps } from "./AudioProvider";

export const AudioContextContext = createContext<AudioContextProps | null>(
  null,
);
