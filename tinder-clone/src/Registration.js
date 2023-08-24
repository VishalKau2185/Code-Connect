import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

function Registration() {
  const [people, setPeople] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    imageLink: '',
    college: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [collegesList, setCollegesList] = useState([]); // Store colleges here
  const navigate = useNavigate();

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
    setPeople((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8800/people');
      const peopleData = response.data;
      const user = peopleData.find((person) => person.email === people.email);
      if (user == null) {
        console.log(people);
        await axios.post('http://localhost:8800/people', people);
        navigate('/');
      } else {
        setErrorMessage('Email already exists');
      }
    } catch (error) {
      console.error('Registration error', error);
      setErrorMessage('An error occurred');
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Name"
        name="name"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <textarea
        placeholder="Bio (Please add your languages here!)"
        name="bio"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Image Link (e.g., https://example.com/image.jpg)"
        name="imageLink"
        onChange={handleChange}
      />
      {/* Use the datalist to create the dropdown list of colleges */}
      <input
        type="text"
        placeholder="College"
        name="college"
        list="colleges" // Bind to the colleges datalist
        onChange={handleChange}
      />
      <datalist id="colleges">
        {collegesList.map((college, index) => (
          <option key={index} value={college} />
        ))}
      </datalist>
      <button className="register-button" onClick={handleRegistration}>
        Register
      </button>
    </div>
  );
}

export default Registration;
