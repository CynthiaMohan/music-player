//import Styles
import './styles/app.scss'
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
// Import Util
import data from './util';
import { useState,useRef } from 'react';
import Library from './components/Library';

function App() {
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0
  });
  //Ref
  const audioRef = useRef(null);
  //EventHandlers
  const timeUpdateHandler = (e) => { 
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo,currentTime:current,duration})
}
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        timeUpdateHandler={timeUpdateHandler}
        setSongInfo={setSongInfo}
        songInfo={songInfo} />
      <Library audioRef={ audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setSongs={setSongs} />
    </div>
  );
}

export default App;
