import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import './Account.css'; // Import your CSS file for styling

function Account() {
  const [newData, setNewData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { currentUserData, updateUser } = useUserContext();


  const [collegesList, setCollegesList] = useState([]); // Store colleges here

  useEffect(() => {
    if (currentUserData) {
      setNewData(currentUserData);
    }
  }, [currentUserData]);

  useEffect(() => {
    // Fetch colleges from colleges.txt when the component mounts
    const fetchColleges = async () => {
      try {
        const response = await axios.get('./colleges.txt'); // Replace with actual path
        const collegesData = response.data.split('\n');
        setCollegesList(collegesData);
      } catch (error) {
        console.error('Error fetching colleges', error);
      }
    };

    fetchColleges();
  }, []);

  const handleChange = (e) => {
    setNewData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      if (!currentUserData) {
        setErrorMessage('User not found');
        return;
      }

      // Use the PATCH method to update only specific fields
      await axios.patch(`http://localhost:8800/people/${currentUserData.id}`, newData);

      setSuccessMessage('Profile updated successfully');
      setErrorMessage('');

      // Refresh user data after update
      updateUser();
    } catch (error) {
      console.error('Error updating profile:', error);
      setSuccessMessage('');
      setErrorMessage('An error occurred');
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="account-container">
      <h2>Account Settings</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newData.name || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={newData.email || ''}
          disabled
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={newData.password || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bio:</label>
        <textarea
          name="bio"
          value={newData.bio || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image Link:</label>
        <input
          type="text"
          name="imageLink"
          value={newData.imageLink || ''}
          onChange={handleChange}
        />
      </div>
      {/* Use the datalist to create the dropdown list of colleges */}
      <input
        type="text"
        placeholder="College"
        name="college"
        list="colleges" // Bind to the colleges datalist
        value={newData.college || ''}
        onChange={handleChange}
      />
      <datalist id="colleges">
        {collegesList.map((college, index) => (
          <option key={index} value={college} />
        ))}
      </datalist>
      <div className="button-container">
        <button onClick={handleUpdate}>Update Profile</button>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
}

export default Account;