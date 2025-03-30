import React from 'react';
import { useEffect, useState } from "react";
import { getVotes } from "@/services/firebase/firestore";

const VoteResults = () => {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const fetchVotes = async () => {
      const data = await getVotes();
      setVotes(data);
    };
    fetchVotes();
  }, []);

  return (
    <div>
      <h2>Live Vote Results:</h2>
      <ul>
        {votes.map((vote) => (
          <li key={vote.id}>{vote.songId} - Voted by {vote.userId}</li>
        ))}
      </ul>
    </div>
  );
};

export default VoteResults;
