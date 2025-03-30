import React from "react";
import { useState } from "react";
import axios from "axios";
import { firestoreDB } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const SongSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const CLIENT_ID = "d71dfd632e884a22ad99a2d7edeb5774";
  const CLIENT_SECRET = "f05e6863df0b4b9aaed50a67abc6735a";

  // 🔥 Get Spotify Access Token
  const getAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      return response.data.access_token;
    } catch (error) {
      console.error("Error getting Spotify token:", error);
      return null;
    }
  };

  // 🎵 Search for Songs using Spotify API
  const searchSongs = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const token = await getAccessToken();
      if (!token) return;

      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: { q: query, type: "track", limit: 5 },
      });

      setResults(response.data.tracks.items);
    } catch (error) {
      console.error("Error searching songs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add Selected Song to Firestore
  const addToFirestore = async (song) => {
    const songData = {
      id: song.id,
      name: song.name,
      artist: song.artists.map((a) => a.name).join(", "),
      url: song.external_urls.spotify,
    };

    try {
      await addDoc(collection(firestoreDB, "songs"), songData);
      alert("✅ Song added successfully!");
    } catch (error) {
      console.error("Error adding song to Firestore:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎵 Search & Add Songs</h2>

      {/* 🔍 Search Input */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search for a song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded flex-1"
        />
        <button
          onClick={searchSongs}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* 🔍 Search Results */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Search Results</h3>
        {loading && <p>Loading...</p>}
        {!loading && results.length === 0 && <p>No results found.</p>}
        {!loading && results.length > 0 && (
          <ul>
            {results.map((song) => (
              <li key={song.id} className="flex items-center justify-between border-b p-3">
                <div>
                  <p className="font-semibold">{song.name}</p>
                  <p className="text-sm text-gray-500">
                    {song.artists.map((a) => a.name).join(", ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={song.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    🎧 Listen
                  </a>
                  <button
                    onClick={() => addToFirestore(song)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    ➕ Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SongSearch;
