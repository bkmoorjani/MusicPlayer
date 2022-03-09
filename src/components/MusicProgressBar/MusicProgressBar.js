import React, { useContext,useCallback } from "react";
import { MusicPlayerContext ,Actions} from "../MusicContainer/MusicContainer";
import './MusicProgressBar.css';
const MusicProgressBar = () => {

    const { state ,dispatch} = useContext(MusicPlayerContext);
    const { percentage, duration } = state;
    //musicprogress bar is current time
    //music container is middle man
    

    const placeStart = useCallback((event) => {
        const {  offsetX} = event.nativeEvent;
        var clientWidth = document.getElementsByClassName('progress-container')[0].clientWidth;
        console.log(clientWidth);
        console.log( offsetX);
        const ratio = (offsetX / clientWidth);
        const currentTime = ratio * duration;
        //passing the current time & dispatch it MusicContainer
        dispatch({ type: Actions.UPDATE_CURRENT_TIME, payload: currentTime });
        
        
    },[dispatch,duration])

    return (
        <>
            <div className="progress-container" onClick={placeStart} >
                
                <div className="progress" style={{ width: `${Math.round(percentage)}%` }}>

                    <span className="progress_text">{`${Math.round(percentage)}%`}</span>
                </div>

            </div>
        </>

    )


}

export default MusicProgressBar;