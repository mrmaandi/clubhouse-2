import { Playlist, Track } from "@prisma/client";
import { atom } from "recoil";

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});

export const currentTrackState = atom<Track | null>({
  key: "currentTrackState",
  default: null,
});

export const currentPlaylistState = atom<Playlist | null>({
  key: "currentPlaylistState",
  default: null,
});

