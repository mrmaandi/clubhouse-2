import { Playlist, Track } from "@prisma/client";
import { atom } from "recoil";

export const playerActiveState = atom<boolean>({
  key: "playerActiveState",
  default: false
});

export const playerPlaylistState = atom<Playlist | undefined>({
  key: "playerPlaylistState",
  default: undefined
});

export const playerTracksState = atom<Track[]>({
  key: "playerTracksState",
  default: []
});

export const playerPlayingState = atom<boolean>({
  key: "playerPlayingState",
  default: false
});

export const playerVolumeState = atom<number>({
  key: "playerVolumeState",
  default: 0.5
});

export const playerExtendedState = atom<boolean>({
  key: "playerExtendedState",
  default: true
});

export const playerTrackIndexState = atom<number>({
  key: "playerTrackIndexState",
  default: 0
});

