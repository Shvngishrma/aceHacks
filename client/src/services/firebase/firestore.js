import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { app } from "./firebase";

const firestore = getFirestore(app);
const votesCollection = collection(firestore, "votes");

// Function to check if the user has already voted for a song
const hasUserVoted = async (userId, songId) => {
  const q = query(votesCollection, where("userId", "==", userId), where("songId", "==", songId));
  const snapshot = await getDocs(q);
  return !snapshot.empty; // Returns true if the user has already voted
};

// Function to submit a vote (only if user hasn't voted)
export const submitVote = async (userId, songId) => {
  try {
    const alreadyVoted = await hasUserVoted(userId, songId);
    if (alreadyVoted) {
      console.warn("User has already voted for this song.");
      return { success: false, message: "You have already voted for this song!" };
    }

    await addDoc(votesCollection, { userId, songId, timestamp: new Date() });
    console.log("Vote submitted!");
    return { success: true, message: "Vote recorded!" };
  } catch (error) {
    console.error("Error submitting vote:", error);
    return { success: false, message: "Error submitting vote." };
  }
};

export { firestore };
