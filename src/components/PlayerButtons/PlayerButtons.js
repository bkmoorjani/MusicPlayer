import React, {  useCallback, useContext } from "react";

import { Actions, MusicPlayerContext } from "../MusicContainer/MusicContainer";
const PlayerButtons = () => {
    
    const { state, dispatch } = useContext(MusicPlayerContext);
    const prev = useCallback(() => {
        dispatch({type:Actions.PREV})
    },[dispatch])
    const next = useCallback(() => {
        dispatch({type:Actions.NEXT})
    }, [dispatch])
    const play = useCallback(() => {
        dispatch({type:Actions.PLAY})
    }, [dispatch])
    const pause = useCallback(() => {
        dispatch({type:Actions.PAUSE})
    },[dispatch])
    return <>
        <div className="navigation">

   

         <button onClick={prev } id="prev" className="action-btn">
                <i className="fas fa-backward"></i>
            </button>
            {state.audioStatus === Actions.PAUSE?
                <button onClick={play} id="play" className="action-btn">
                    <i className="fas fa-play"></i>
                </button>
                :
                <button onClick={pause} className="action-btn">
                    <i className="fas fa-pause"></i>
                </button>
            }
            <button onClick={next} id="next" className="action-btn">
                <i className="fas fa-forward"></i>
            </button>
            
      
            
        </div>

    </>
}

export default PlayerButtons;