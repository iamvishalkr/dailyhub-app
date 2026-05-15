import { create } from "zustand";

export type playerFunctionType = {
  getPlaylist: () => string[];
  nextVideo: () => void;
  previousVideo: () => void;
  playVideo: () => void;
  pauseVideo: () => void;
  playVideoAt: (index: number) => void;
  seekTo: (seconds: number) => void;
  setLoop: (loop: boolean) => void;
};

interface YtPlayerState {
  isPlayerVisible: boolean;
  setIsPlayerVisible: (visible: boolean) => void;
  playerState: string;
  setPlayerState: (pState: string) => void;
  playerFunctions: playerFunctionType;
  setPlayerFunctions: (pFunctions: playerFunctionType) => void;
}

export const useYtPlayerStore = create<YtPlayerState>()((set) => ({
  isPlayerVisible: false,
  setIsPlayerVisible: (visible) => set({ isPlayerVisible: visible }),
  playerState: "unknown",
  setPlayerState: (pState) => set({ playerState: pState }),
  playerFunctions: {
    getPlaylist: () => {
      return [];
    },
    nextVideo: () => {},
    previousVideo: () => {},
    playVideo: () => {},
    pauseVideo: () => {},
    playVideoAt: (_index) => {},
    seekTo: (_seconds) => {},
    setLoop: (_loop) => {},
  },
  setPlayerFunctions: (pFunctions) => set({ playerFunctions: pFunctions }),
}));
