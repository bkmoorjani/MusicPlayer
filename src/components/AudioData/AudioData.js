import React, { useEffect, useRef, useContext, useCallback } from "react";
import { Actions, MusicPlayerContext } from "../MusicContainer/MusicContainer";

const AudioData = () => {

    const audioElement = useRef();
    const { state, dispatch } = useContext(MusicPlayerContext);
    const { audioStatus, musicTrack, currentTime } = state;
    //UseEffect because u execute a task and not deriving data.. 
    //task is get current time 
    useEffect(() => {
        //const converttomin = currentTime / 60;
        audioElement.current.currentTime = currentTime; 
    },[currentTime])

    const playAudio = useCallback(() => {
        try {
            audioElement.current?.play();
        }
        catch (err) { console.log(err); }
    }, [])
    const pauseAudio = useCallback(() => {
        audioElement.current?.pause();
    }, [])
    useEffect(() => {
        if (audioStatus === Actions.PLAY) {
            playAudio();
        }
        else { pauseAudio(); }
    }, [audioStatus, pauseAudio, playAudio])

    const updatedProgress = useCallback((event) => {
        const { currentTime,duration} = event.nativeEvent.srcElement;
        const percentage = 100 * currentTime / duration;
        //provide data to the middle man the data is percentage and duration of song
        dispatch({ type: Actions.UPDATE_PROGRESS, payload: {percentage,duration} });

    }, [dispatch])

    const onEndingAudio = useCallback(() => {
        console.log("ending", audioElement.current.onEnded);
        dispatch({ type: Actions.NEXT })
    }, [dispatch])
    return <>
        <audio autoPlay={true} ref={audioElement} src={musicTrack} id="audio"
            onTimeUpdate={updatedProgress}
            onEnded={onEndingAudio}
        >
        </audio>
    </>
}

export default AudioData