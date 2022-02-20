import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState } from "../atoms/atoms";

export const useTrackInfo = () => {
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
    const [trackInfo, setTrackInfo] = useState(null);

    useEffect(() => {

    }, [currentTrackId])

    return useTrackInfo;
}