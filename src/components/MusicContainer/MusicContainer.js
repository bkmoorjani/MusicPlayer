import AudioData from "../AudioData/AudioData";
import ImagesData from "../ImagesData/ImagesData";
import React, { useEffect, useReducer } from "react";
import SongList from '../../config/music.config.json'
import PlayerButtons from "../PlayerButtons/PlayerButtons";
import MusicInfo from "../MusicInfo/MusicInfo";
export const MusicPlayerContext = React.createContext({
    state: {}, dispatch: (data) => {
    }
})
export const Actions = {
    PLAY: "Play",
    PAUSE: "Pause",
    NEXT: "Next",
    PREV: "Prev",
    SET_CURRENT_SONGDATA: "SET_CURRENT_SONGDATA",
    UPDATE_CURRENT_TIME: "UPDATE_CURRENT_TIME",
    UPDATE_PROGRESS:"UPDATE_PROGRESS"

}
const initialState = {
    audioStatus: Actions.PLAY,
    musicTitle: '',
    musicTrack: '',
    coverPhoto: '',
    songs: SongList.songs,
    songIndex: 0,
    percentage: 0.0,
    duration: 0,
    currentTime:0,

}
const reducer = (state, action) => {
    let newSongIndex;

    switch (action.type) {
        case Actions.PLAY:
            console.log("prev click>" + state.audioStatus);
            return { ...state, audioStatus: Actions.PLAY }

        case Actions.PAUSE:
            console.log("pause click>" + state.audioStatus);
            return { ...state, audioStatus: Actions.PAUSE }
        case Actions.NEXT:  //
            //songindex=2
            newSongIndex = state.songIndex + 1;
            if (newSongIndex > state.songs.length - 1) {
                return { ...state, songIndex: 0, audioStatus: Actions.PLAY }
            }
            else {
                return { ...state, songIndex: newSongIndex, audioStatus: Actions.PLAY }
            }
        case Actions.PREV:
            console.log("next click>" + state.audioStatus);
            newSongIndex = state.songIndex - 1;
            if (newSongIndex < 0) {
                return { ...state, songIndex: state.songs.length - 1, audioStatus: Actions.PLAY }
            }
            else {
                return { ...state, songIndex: newSongIndex, audioStatus: Actions.PLAY }
            }
        case Actions.SET_CURRENT_SONGDATA:
            console.log("SET_CURRENT_SONGDATA click>" + state.audioStatus);
            return { ...state, ...state.songs[state.songIndex] }
        case Actions.UPDATE_PROGRESS:
            const {percentage,duration}=action.payload
            return { ...state, percentage, duration }
        case Actions.UPDATE_CURRENT_TIME://this is getting the passed data
            return{...state,currentTime:action.payload}
        default:
            return state;
    }
}
const MusicContainer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { songIndex } = state;

    useEffect(() => {
        if (songIndex >= 0) {
            dispatch({ type: Actions.SET_CURRENT_SONGDATA })
        }
    }, [songIndex])

    return <>
        <MusicPlayerContext.Provider value={{ state, dispatch }}>
            <div className="music-container" id="music-container">

                <MusicInfo></MusicInfo>
                <AudioData></AudioData>
                <ImagesData></ImagesData>
                <PlayerButtons></PlayerButtons>

            </div>

        </MusicPlayerContext.Provider>
    </>

}

export default MusicContainer;