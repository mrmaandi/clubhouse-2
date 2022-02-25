import {
  CollectionIcon,
  MinusCircleIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import {
  ArrowsExpandIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import { format } from "date-fns";
import Image from "next/image";
import { Slider } from "primereact/slider";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  playerActiveState,
  playerExtendedState,
  playerPlayingState,
  playerPlaylistViewState,
  playerTrackIndexState,
  playerTracksState,
  playerVolumeState,
} from "../../atoms/atoms";
import { AMAZON_URL } from "../../pages/_app";
import PlayerPlaylistView from "./PlayerPlaylistView";

/* const formatAudioTime = (time: number) => {
  const s: number = Math.floor(time % 60);
  const m: number = Math.floor((time / 60) % 60);

  return `${m}:${s}`
} */

const formatAudioTime = (time: number) => {
  if (time) {
    return format(time * 1000, "mm:ss");
  }
};

const AudioCurrentTime = (props: { audioRef: any }): JSX.Element => {
  const [audioDuration, setAudioDuration] = useState();
  console.log("aduio curent itme");

  useEffect(() => {
    if (props.audioRef.current) {
      console.log(props.audioRef.current);

      props.audioRef.current.ontimeupdate = () => {
        setAudioDuration(props.audioRef.current.currentTime);
      };
    }
  }, [props.audioRef.current]);

  if (!audioDuration) {
    return <></>;
  }

  return <>{formatAudioTime(audioDuration)}</>;
};

const PlayerBar = (): JSX.Element => {
  const [isActive, setIsActive] = useRecoilState(playerActiveState);
  const [tracks, setTracks] = useRecoilState(playerTracksState);
  const [isPlaying, setIsPlaying] = useRecoilState(playerPlayingState);
  const [volume, setVolume] = useRecoilState(playerVolumeState);
  const [isExtended, setIsExtended] = useRecoilState(playerExtendedState);
  const [trackIndex, setTrackIndex] = useRecoilState(playerTrackIndexState);
  const [showPlaylistView, setShowPlaylistView] = useRecoilState(
    playerPlaylistViewState
  );

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
    if (tracks.length) {
      const track = tracks.find((track) => track.id === tracks[trackIndex].id);
      const playlist = track.playlist;

      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audioSrc = `${AMAZON_URL}/${playlist.sampleflipId}/${tracks[trackIndex].fileName}`;
      const audioElement = new Audio(audioSrc);
      audioRef.current = audioElement;
      audioRef.current.addEventListener("ended", () => {
        onNextTrack();
      });

      setAudio(audioElement);
      changeAudioVolume(volume);
    }
  }, [tracks, trackIndex, onNextTrack]);

  useEffect(() => {
    changeAudioVolume(volume);
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [audio, isPlaying]);

  const changeAudioVolume = (volume: number) => {
    setVolume(volume);
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  };

  const onPlayerExpandToggle = () => {
    setIsExtended(!isExtended);
  };

  const onPlaylistViewToggle = () => {
    setShowPlaylistView(!showPlaylistView);
  };

  if (!isActive || !tracks.length) {
    return <></>;
  }

  // todo: if changing to artist view and stopping player then it takes wrong playlist cuz tracks change
  const track = tracks.find((track) => track.id === tracks[trackIndex].id);
  const playlist = track.playlist;

  const PlayerLeftColumn = () => (
    <div className="flex align-items-center" style={{ gap: 20 }}>
      <div className="flex align-items-center w-4rem h-4rem">
        {playlist.covers && (
          <Image
            src={`${AMAZON_URL}/${playlist.sampleflipId}/${playlist.covers[0].fileName}`}
            layout="fixed"
            width="60rem"
            height="60rem"
            objectFit="cover"
            alt="cover"
            className="border-round"
          />
        )}
      </div>
      <div className="flex flex-column">
        <div>{playlist.name}</div>
        <div className="font-bold">{track.author.name}</div>
      </div>
    </div>
  );

  const PlayerMiddleColumn = () => (
    <div className="flex align-content-center align-items-center justify-content-evenly">
      {/* <AudioCurrentTime audioRef={audioRef} /> */}
      <RewindIcon
        className="cursor-pointer"
        height="2rem"
        onClick={onPrevTrack}
      />
      {isPlaying ? (
        <PauseIcon
          className="cursor-pointer"
          height="3rem"
          onClick={() => setIsPlaying(false)}
        />
      ) : (
        <PlayIcon
          className="cursor-pointer"
          height="3rem"
          onClick={() => setIsPlaying(true)}
        />
      )}
      <FastForwardIcon
        className="cursor-pointer"
        height="2rem"
        onClick={onNextTrack}
      />
      {/* {audioRef.current && formatAudioTime(audioRef.current.duration)} */}
    </div>
  );

  const PlayerRightColumn = (props: { volume: number }) => {
    return (
      <div className="flex justify-content-end">
        <div className="flex align-items-center" style={{ gap: 25 }}>
          <div className="flex align-items-center w-15rem" style={{ gap: 15 }}>
            <VolumeOffIcon height="1.5rem" />
            <Slider
              className="flex-1 w-20 cursor-pointer"
              value={props.volume * 100}
              onChange={(e) => changeAudioVolume(Number(e.value) / 100)}
            />
            <VolumeUpIcon height="1.5rem" />
          </div>
          <CollectionIcon
            height="1.5rem"
            className="cursor-pointer"
            onClick={onPlaylistViewToggle}
          />
          {isExtended ? (
            <MinusCircleIcon height="1.5rem" onClick={onPlayerExpandToggle} />
          ) : (
            <ArrowsExpandIcon
              height="1.5rem"
              className="cursor-pointer"
              onClick={onPlayerExpandToggle}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={classNames(
          "absolute right-0 m-2 z-3 bottom-0 grid grid-nogutter align-items-center p-1 border-round shadow-7 surface-hover",
          {
            "left-0 p-3 fadein": isExtended,
            "": !isExtended,
          }
        )}
      >
        {/*  <div className="absolute bottom-100 right-0 mb-3">
          <PlayerPlaylistView />
        </div>
        <div className="col">
          <PlayerLeftColumn />
        </div>
        <div className="col">
          <PlayerMiddleColumn />
        </div>
        <div className="col">
          <PlayerRightColumn volume={volume} />
        </div>
      </div> */}
        <div className="absolute bottom-100 right-0 mb-3">
          <PlayerPlaylistView />
        </div>
        <div className="col">
          <div className="flex align-items-center" style={{ gap: 20 }}>
            <div className="flex align-items-center w-4rem h-4rem">
              {playlist.covers && (
                <Image
                  src={`${AMAZON_URL}/${playlist.sampleflipId}/${playlist.covers[0].fileName}`}
                  layout="fixed"
                  width="60rem"
                  height="60rem"
                  objectFit="cover"
                  alt="cover"
                  className="border-round"
                />
              )}
            </div>
            <div className="flex flex-column">
              <div>{playlist.name}</div>
              <div className="font-bold">{track.author.name}</div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="flex align-content-center align-items-center justify-content-evenly">
            {/* <AudioCurrentTime audioRef={audioRef} /> */}
            <RewindIcon
              className="cursor-pointer"
              height="2rem"
              onClick={onPrevTrack}
            />
            {isPlaying ? (
              <PauseIcon
                className="cursor-pointer"
                height="3rem"
                onClick={() => setIsPlaying(false)}
              />
            ) : (
              <PlayIcon
                className="cursor-pointer"
                height="3rem"
                onClick={() => setIsPlaying(true)}
              />
            )}
            <FastForwardIcon
              className="cursor-pointer"
              height="2rem"
              onClick={onNextTrack}
            />
            {/* {audioRef.current && formatAudioTime(audioRef.current.duration)} */}
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
                  className="flex-1 w-20 cursor-pointer"
                  value={volume * 100}
                  onChange={(e) => changeAudioVolume(Number(e.value) / 100)}
                />
                <VolumeUpIcon height="1.5rem" />
              </div>
              <CollectionIcon
                height="1.5rem"
                className="cursor-pointer"
                onClick={onPlaylistViewToggle}
              />
              {isExtended ? (
                <MinusCircleIcon
                  height="1.5rem"
                  onClick={onPlayerExpandToggle}
                />
              ) : (
                <ArrowsExpandIcon
                  height="1.5rem"
                  className="cursor-pointer"
                  onClick={onPlayerExpandToggle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerBar;
