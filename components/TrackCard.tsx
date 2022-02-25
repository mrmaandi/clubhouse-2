import { PauseIcon, PlayIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import React from "react";
import { useRecoilState } from "recoil";
import {
  playerActiveState,
  playerPlayingState,
  playerTrackIndexState,
  playerTracksState,
} from "../atoms/atoms";

interface ComponentProps {
  cardTrack: TrackExtended;
  tracks: TrackExtended[];
}

const TrackCard = ({ cardTrack, tracks }: ComponentProps) => {
  const [playerTrackIndex, setPlayerTrackIndex] = useRecoilState(
    playerTrackIndexState
  );
  const [isPlaying, setIsPlaying] = useRecoilState(playerPlayingState);
  const [isActive, setIsActive] = useRecoilState(playerActiveState);
  const [playerTracks, setPlayerTracks] = useRecoilState(playerTracksState);

  const playPauseTrack = (cardTrack: TrackExtended) => {
    if (!isActive) {
      setIsActive(true);
    }

    if (cardTrack.id === playerTracks[playerTrackIndex]?.id) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayerTrackIndex(tracks.indexOf(cardTrack));
      setIsPlaying(true);
    }

    if (
      cardTrack.id !== playerTracks[playerTrackIndex]?.id ||
      !playerTracks.length
    ) {
      setPlayerTracks(tracks);
    }
  };

  const currentCardSelected =
    cardTrack.id === playerTracks[playerTrackIndex]?.id;

  return (
    <div
      className={classNames("py-2 px-3  surface-50 border-1", {
        "border-left-3 border-y-none border-right-none shadow-1": currentCardSelected,
        "border-gray-100": !currentCardSelected,
      })}
    >
      <div className="flex align-items-center" style={{ gap: 20 }}>
        <div className="flex align-items-center">
          {currentCardSelected && isPlaying ? (
            <PauseIcon
              height="3rem"
              className="cursor-pointer"
              onClick={() => playPauseTrack(cardTrack)}
            />
          ) : (
            <PlayIcon
              height="3rem"
              className="cursor-pointer"
              onClick={() => playPauseTrack(cardTrack)}
            />
          )}
        </div>
        <div>
          <div className="font-bold">{cardTrack.author.name}</div>
          <div className="text-overflow-ellipsis">{cardTrack.fileName}</div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
