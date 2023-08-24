import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUserData, setCurrentUserData] = useState(null);

  const updateUser = async () => {
    try {
      if (currentUserEmail) {
        const response = await axios.get('http://localhost:8800/people');
        const peopleData = response.data;

        const loggedInUser = peopleData.find(person => person.email === currentUserEmail);
        if (loggedInUser) {
          setCurrentUserData(loggedInUser);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    updateUser();
  }, [currentUserEmail]);

  return (
    <UserContext.Provider value={{ currentUserEmail, currentUserData, setCurrentUserEmail, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};