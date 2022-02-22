import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  isPlayingState,
  currentTrackState,
  currentPlaylistState,
} from "../atoms/atoms";
import Image from "next/image";
import { AMAZON_URL } from "../pages/_app";
import { useRouter } from "next/router";
import {
  PauseIcon,
  PlayIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  FastForwardIcon,
  RewindIcon,
} from "@heroicons/react/solid";
import { Slider } from "primereact/slider";

const PlayerBar = (): JSX.Element => {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [currentPlaylist, setCurrentPlaylist] =
    useRecoilState(currentPlaylistState);
  const [volume, setVolume] = useState(50);
  const router = useRouter();
  const { id } = router.query;

  let ref = useRef<any>();

  useEffect(() => {
    if (currentTrack) {
      ref.current = document.createElement("audio");
      ref.current.src = `${AMAZON_URL}/${currentPlaylist?.sampleflipId}/${currentTrack.fileName}`;
      ref.current.load();
    }
  }, [currentPlaylist?.sampleflipId, currentTrack, id, ref]);

  if (!currentTrack || !currentPlaylist) {
    return <div className="mx-3"></div>;
  }

  // audioElement.addEventListener("ended", nextTrack);

  const playPauseTrack = () => {
    if (!isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {};

  return (
    <div className="absolute z-3 left-0 right-0 bottom-0 m-3 border-round shadow-7 surface-hover">
      <div className="grid grid-nogutter align-items-center p-3">
        <div className="col">
          <div className="flex align-items-center" style={{ gap: 20 }}>
            <div className="relative w-4rem h-4rem">
              <Image
                src={`${AMAZON_URL}/${currentPlaylist.sampleflipId}/${
                  (currentPlaylist as any).covers[0].fileName
                }`}
                layout="fill"
                objectFit="cover"
                alt="cover"
                className="border-round"
              />
            </div>
            <div className="flex flex-column">
              <div>{currentPlaylist.name}</div>
              <div className="font-bold">
                {(currentTrack as any).author.name}
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="flex align-content-center align-items-center justify-content-evenly">
            <RewindIcon height="2rem" />
            {isPlaying ? (
              <PauseIcon height="3rem" onClick={playPauseTrack} />
            ) : (
              <PlayIcon height="3rem" onClick={playPauseTrack} />
            )}
            <FastForwardIcon height="2rem" />
          </div>
        </div>
        <div className="col">
          <div className="flex justify-content-end">
            <div
              className="flex align-items-center w-15rem"
              style={{ gap: 15 }}
            >
              <VolumeOffIcon height="1.5rem" />
              <Slider
                className="flex-1 w-20"
                value={volume}
                onChange={(e) => setVolume(Number(e.value))}
              />
              <VolumeUpIcon height="1.5rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
