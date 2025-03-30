import React from "react"; 
import { useState, useEffect } from "react";
import { firestoreDB } from "..firebase/firestore"; 
import { collection, getDocs } from "firebase/firestore";

const SongList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestoreDB, "songs"));
        const songsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSongs(songsList);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎶 Song List</h2>
      {songs.length === 0 ? (
        <p>No songs found.</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song.id} className="p-2 border-b">
              <p className="font-semibold">{song.name}</p>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongList;
