//import Styles
import './styles/app.scss'
//Adding Components
import Player from "./components/Player";
import Song from "./components/Song";
// Import Util
import data from './util';
import { useState } from 'react';
import Library from './components/Library';

function App() {
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
      <Library songs={songs} />
    </div>
  );
}

export default App;
