import React from "react";
import { useEffect, useState } from "react";
import { useVote } from "../hooks/useVote";
import VoteResult from "../components/voteResult";

const Results = () => {
  const { fetchResults } = useVote();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults(setResults);
  }, []);

  return (
    <div className="results">
      <h1>Live Voting Results</h1>
      <VoteResult results={results} />
    </div>
  );
};

export default Results;
