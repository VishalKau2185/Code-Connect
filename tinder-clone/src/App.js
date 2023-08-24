import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import TinderCards from './TinderCards';
import Login from './Login';
import Registration from './Registration';
import Account from './Account';
import { UserProvider } from './UserContext'; // Import the UserProvider

import './App.css';

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8800/people')
      .then(response => {
        setPeople(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <UserProvider> {/* Wrap your app with UserProvider */}
      <div className="App">

        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/chat" element={<TinderCards people={people} />} />
            <Route path="/home" element={
            <>
              <Header /> {/* Include Header here */}
              <TinderCards people={people} />
            </>
          } />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
