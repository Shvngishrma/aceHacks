import React from "react";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path to your Firebase configuration file

const VoteList = () => {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const votesRef = collection(db, "votes");

    // Firestore Listener: Updates UI in real-time
    const unsubscribe = onSnapshot(votesRef, (snapshot) => {
      const updatedVotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVotes(updatedVotes);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div>
      <h2>Live Votes</h2>
      <ul>
        {votes.map((vote) => (
          <li key={vote.id}>
            Song ID: {vote.songId} | Votes: {vote.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoteList;
