import React, { useEffect }  from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight,faPause } from "@fortawesome/free-solid-svg-icons";


const Player = ({ setSongs,currentSong,isPlaying,setIsPlaying,audioRef,timeUpdateHandler,songInfo,setSongInfo,songs,setCurrentSong }) => {
    //UseEffect
    useEffect(() => {
        //Add active state
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return { ...song, active: true };
            }
            else {
                return { ...song, active: false };
            }
        })
        setSongs(newSongs);
    })
    //Event Handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }
  
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":"+("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const skipTrackHandler = async(direction) => { 
            let currentIndex = songs.findIndex((song)=>song.id===currentSong.id);
            console.log('curr_Index',currentIndex);
            if (direction === "skip-forward") {
                await setCurrentSong(songs[(currentIndex + 1)===songs.length?0:currentIndex+1]);
            }
            if (direction === "skip-back") {
                await setCurrentSong(songs[(currentIndex - 1) < 0 ? songs.length-1 : currentIndex - 1]);
        }
        if (isPlaying) audioRef.current.play();
    }
    

    //For Slider operations
    const dragHandler = (e) => {
        //update the audio
        audioRef.current.currentTime = e.target.value;
        //update the slider
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    }
    const songEndedHandler = async() => {
        let currentIndex = songs.findIndex((song)=>song.id===currentSong.id);
        await setCurrentSong(songs[(currentIndex + 1)===songs.length?0:currentIndex+1]);
        if (isPlaying) audioRef.current.play();
    }
    //Adding Styles
    const trackAnimate = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    };
    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div className="track" style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}}>
                    <input
                        min={0}
                        max={songInfo.duration||0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                        type="range" />
                    <div className="animate-track" style={trackAnimate}></div>
                </div>
                
                <p>{songInfo.duration?getTime(songInfo.duration):"0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} onClick={()=>{skipTrackHandler('skip-back')}} />
                <FontAwesomeIcon className="play" size="2x" icon={isPlaying?faPause:faPlay} onClick={playSongHandler}/>
                <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} onClick={() => { skipTrackHandler('skip-forward') }} />
            </div>
            <audio onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndedHandler}></audio>
        </div>
        
    )
}
export default Player;