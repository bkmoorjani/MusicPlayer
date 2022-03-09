import React, {  useContext } from "react";
import { MusicPlayerContext } from "../MusicContainer/MusicContainer";

const ImagesData = () => {
    const { state } = useContext(MusicPlayerContext);
    const { coverPhoto } = state;
    return<>      
        <div className="img-container">
                <img src={coverPhoto} alt="music-cover" id="cover" />
            </div>
    </>
}
export default ImagesData;