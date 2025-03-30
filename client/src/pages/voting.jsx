import React from "react";
import { useEffect, useState } from "react";
import { useVote } from "../hooks/useVote";
import SongList from "../components/songList";

const Voting = () => {
  const { fetchSongs, voteForSong } = useVote();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs(setSongs);
  }, []);

  return (
    <div className="voting">
      <h1>Vote for Your Favorite Song</h1>
      <SongList songs={songs} onVote={voteForSong} />
    </div>
  );
};

export default Voting;
