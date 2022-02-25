import { Track } from "@prisma/client";
import classNames from "classnames";
import React from "react";
import { useRecoilState } from "recoil";
import {
  playerPlaylistViewState,
  playerTrackIndexState,
  playerTracksState,
} from "../../atoms/atoms";

const PlayerPlaylistView = () => {
  const [showPlaylistView, setShowPlaylistView] = useRecoilState(
    playerPlaylistViewState
  );
  const [trackIndex, setTrackIndex] = useRecoilState(playerTrackIndexState);
  const [tracks, setTracks] = useRecoilState(playerTracksState);

  const onTrackSelect = (track: Track) => {
    setTrackIndex(tracks.indexOf(track));
  };

  if (!showPlaylistView) {
    return <></>;
  }

  return (
    <div className="flex flex-shrink border-round shadow-1 surface-hover fadein overflow-y-auto">
      <div className="m-3">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => onTrackSelect(track)}
            className="cursor-pointer"
          >
            <p
              className={classNames("my-2", {
                "font-bold": tracks[trackIndex].id === track.id,
              })}
            >
              {track.author.name} - {track.playlist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerPlaylistView;
