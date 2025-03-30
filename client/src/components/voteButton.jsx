import React from "react";
import PropTypes from "prop-types";
import { submitVote } from "@/services/firebase/firestore";
import { useAuth } from "@/hooks/useAuth"; // Assuming you have an auth hook

const VoteButton = ({ songId }) => {
  const { user } = useAuth(); // Get logged-in user

  const handleVote = async () => {
    if (!user) {
      alert("You must be logged in to vote!");
      return;
    }

    const result = await submitVote(user.uid, songId);
    alert(result.message);
  };

  return <button onClick={handleVote}>Vote for this Song</button>;
};
VoteButton.propTypes = {
  songId: PropTypes.string.isRequired,
};

export default VoteButton;
