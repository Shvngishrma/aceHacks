import { db } from "../services/firebase"; // Firestore instance
import { collection, addDoc, onSnapshot, updateDoc, doc, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "./useAuth"; // Custom Auth Hook

export const useVote = () => {
  const { user } = useAuth(); // Get logged-in user
  const songsCollection = collection(db, "songs"); // Firestore collection reference

  // 🔹 Fetch available songs from Firestore
  const fetchSongs = (setSongs) => {
    const unsubscribe = onSnapshot(songsCollection, (snapshot) => {
      const songList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSongs(songList);
    });

    return () => unsubscribe(); // Cleanup listener
  };

  // 🔹 Fetch real-time vote results
  const fetchResults = (setResults) => {
    const unsubscribe = onSnapshot(songsCollection, (snapshot) => {
      const voteResults = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        votes: doc.data().votes || 0,
      }));
      setResults(voteResults);
    });

    return () => unsubscribe();
  };

  // 🔹 Vote for a song (Prevents duplicate votes)
  const voteForSong = async (songId) => {
    if (!user) {
      alert("You must be logged in to vote!");
      return;
    }

    const userVotesCollection = collection(db, "userVotes");
    const voteQuery = query(userVotesCollection, where("userId", "==", user.uid));

    const querySnapshot = await getDocs(voteQuery);

    if (!querySnapshot.empty) {
      alert("You have already voted!");
      return;
    }

    try {
      // Increment vote count in Firestore
      const songRef = doc(db, "songs", songId);
      await updateDoc(songRef, {
        votes: (await (await getDocs(query(songsCollection, where("id", "==", songId)))).docs[0]).data().votes + 1,
      });

      // Store user's vote to prevent duplicate voting
      await addDoc(userVotesCollection, {
        userId: user.uid,
        songId: songId,
      });
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return { fetchSongs, fetchResults, voteForSong };
};
