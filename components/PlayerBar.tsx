import {
  CollectionIcon,
  MinusCircleIcon,
  VolumeOffIcon,
  VolumeUpIcon
} from "@heroicons/react/outline";
import {
  ArrowsExpandIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import Image from "next/image";
import { Slider } from "primereact/slider";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  playerActiveState,
  playerExtendedState,
  playerPlayingState,
  playerPlaylistState,
  playerTrackIndexState,
  playerTracksState,
  playerVolumeState,
} from "../atoms/atoms";
import { AMAZON_URL } from "../pages/_app";

const PlayerBar = (): JSX.Element => {
  const [isActive, setIsActive] = useRecoilState(playerActiveState);
  const [playlist, setPlaylist] = useRecoilState(playerPlaylistState);
  const [tracks, setTracks] = useRecoilState(playerTracksState);
  const [isPlaying, setIsPlaying] = useRecoilState(playerPlayingState);
  const [volume, setVolume] = useRecoilState(playerVolumeState);
  const [isExtended, setIsExtended] = useRecoilState(playerExtendedState);
  const [trackIndex, setTrackIndex] = useRecoilState(playerTrackIndexState);

  const [audio, setAudio] = useState<any>();
  const audioRef = useRef<any>();

  const onPrevTrack = useCallback(() => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  }, [setTrackIndex, trackIndex, tracks.length]);

  const onNextTrack = useCallback(() => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  }, [setTrackIndex, trackIndex, tracks.length]);

  useEffect(() => {
    if (playlist) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audioSrc = `${AMAZON_URL}/${playlist.sampleflipId}/${(tracks[trackIndex] as any).fileName}`
      const audioElement = new Audio(audioSrc);
      audioRef.current = audioElement;
      audioRef.current.addEventListener("ended", () => {
        onNextTrack();
      });
      setAudio(audioElement);
    }
  }, [playlist, tracks, trackIndex, onNextTrack]);

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [audio, isPlaying])

  const changeAudioVolume = (volume: number) => {
    const newVolume = volume / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const onPlayerExpandToggle = () => {
    setIsExtended(!isExtended);
  };

  if (!isActive || !playlist) {
    return <></>;
  }

  return (
    <div
      className={classNames(
        "absolute z-3 right-0 bottom-0 m-2 border-round shadow-7 surface-hover py-1 fadeindown",
        {
          "left-0 py-3 scalein": isExtended,
        }
      )}
    >
      <div
        className={classNames("grid grid-nogutter align-items-center px-1", {
          "px-3": isExtended,
        })}
      >
        <div className="col">
          <div className="flex align-items-center" style={{ gap: 20 }}>
            <div className="flex align-items-center w-4rem h-4rem">
              <Image
                src={`${AMAZON_URL}/${playlist.sampleflipId}/${
                  (playlist as any).covers[0].fileName
                }`}
                layout="fixed"
                width="60rem"
                height="60rem"
                objectFit="cover"
                alt="cover"
                className="border-round"
              />
            </div>
            <div className="flex flex-column">
              <div>{playlist.name}</div>
              <div className="font-bold">
                {(tracks[trackIndex] as any).author.name}
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="flex align-content-center align-items-center justify-content-evenly">
            <RewindIcon className="cursor-pointer" height="2rem" onClick={onPrevTrack} />
            {isPlaying ? (
              <PauseIcon className="cursor-pointer" height="3rem" onClick={() => setIsPlaying(false)} />
            ) : (
              <PlayIcon className="cursor-pointer" height="3rem" onClick={() => setIsPlaying(true)} />
            )}
            <FastForwardIcon className="cursor-pointer" height="2rem" onClick={onNextTrack} />
          </div>
        </div>
        <div className="col">
          <div className="flex justify-content-end">
            <div className="flex align-items-center" style={{ gap: 25 }}>
              <div
                className="flex align-items-center w-15rem"
                style={{ gap: 15 }}
              >
                <VolumeOffIcon height="1.5rem" />
                <Slider
                  className="flex-1 w-20"
                  value={volume * 100}
                  onChange={(e) => changeAudioVolume(Number(e.value))}
                />
                <VolumeUpIcon height="1.5rem" />
              </div>
              <CollectionIcon height="1.5rem" />
              {isExtended ? (
                <MinusCircleIcon
                  height="1.5rem"
                  onClick={onPlayerExpandToggle}
                />
              ) : (
                <ArrowsExpandIcon
                  height="1.5rem"
                  onClick={onPlayerExpandToggle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
