// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginButton from './components/loginButton';
// import VoteResults from './components/VoteResults';
// import { initializeFirebase } from './services/firebase/firebase';
// import SongSearch from './components/songsearch';
// import { getVotes } from './services/firebase/firestore';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { getDatabase } from 'firebase/database';
// import { getStorage } from 'firebase/storage';
// import { getAnalytics } from 'firebase/analytics';
// import { app } from './services/firebase/firebase';
// import { auth } from './services/firebase/firebase';
// import { database } from './services/firebase/firebase';
// import { firestore } from './services/firebase/firebase';
// import { storage } from './services/firebase/firebase';
// import { analytics } from './services/firebase/firebase';
// import { signInWithGoogle } from './services/firebase/auth';
// import { logout } from './services/firebase/auth';
// import { trackAuthState } from './services/firebase/auth';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { firestoreDB } from './firebase/fir';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Add more routes as needed */}
//         <Route path="/" element={<LoginButton />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App; 
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Voting from "./pages/voting";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/protectedRoute.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Voting />} />
        <Route path="/results" element={<Results />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        
        {/* Catch-All 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
