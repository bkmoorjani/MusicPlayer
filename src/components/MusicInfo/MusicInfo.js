import React, { useContext,useMemo } from "react";
import { Actions, MusicPlayerContext } from "../MusicContainer/MusicContainer";
import MusicProgressBar from "../MusicProgressBar/MusicProgressBar";

const MusicInfo = () => {
    const { state } = useContext(MusicPlayerContext);
    const { musicTitle, audioStatus } = state;
    const musicInfoClassName = useMemo(() => {
        if (audioStatus === Actions.PLAY) {
            return "music-info-animated";
        } else {
            return "";

        }
    }, [audioStatus])
    return <>
        <div className={`music-info ${musicInfoClassName}`}>
            <h4 id="title">{musicTitle}</h4>
            <MusicProgressBar></MusicProgressBar>
        </div>
    </>
}

export default MusicInfo;