import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './TinderCards.css';
import axios from 'axios';

function TinderCards() {
    const [people, setPeople] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [collegesList, setCollegesList] = useState([]); // Store colleges here
    const [selectedCollege, setSelectedCollege] = useState('');
    const [defaultToPicture, setDefaultToPicture] = useState(true);

    useEffect(() => {
        // Fetch data from your backend when the component mounts
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8800/people');
                const shuffledPeople = shuffleArray(response.data);
                setPeople(shuffledPeople);
                setFlippedCards(Array(shuffledPeople.length).fill(false));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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

    useEffect(() => {
        // Reset flippedCards array when the selectedCollege changes
        setFlippedCards(Array(people.length).fill(false));
    }, [selectedCollege, people]);

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            navigate('/');
        }
        catch (error) {
            console.error('Logout error', error);
        }
    };

    const handleChange = (e) => {
        setSelectedCollege(e.target.value);
        setDefaultToPicture(true);
    };

    return (
        <div>
            <h1>Code Connect</h1>

            <Button onClick={handleLogout} variant="outlined" color="primary">Logout</Button>

            <div className="tinderCards__cardContainer">
                <input
                    type="text"
                    placeholder="Search by College"
                    name="college"
                    list="colleges"
                    value={selectedCollege}
                    onChange={handleChange}
                />
                <datalist id="colleges">
                    {collegesList.map((college, index) => (
                        <option key={index} value={college} />
                    ))}
                </datalist>

                {people
                    .filter(person => selectedCollege === '' || person.college === selectedCollege)
                    .map((person, index) => (
                        <TinderCard
                            className="swipe"
                            key={person.name}
                            preventSwipe={['up', 'down']}
                            onSwipe={(direction) => {
                                if (direction === 'right') {
                                    // Handle swipe right action if needed
                                }
                            }}
                            onCardLeftScreen={() => setDefaultToPicture(true)}
                        >
                            <div
                                className={`card ${flippedCards[index] ? 'flipped' : ''}`}
                                onClick={() => {
                                    const newFlippedCards = [...flippedCards];
                                    newFlippedCards[index] = !newFlippedCards[index];
                                    setDefaultToPicture(false);
                                    setFlippedCards(newFlippedCards);
                                }}
                            >
                                <div className={`card__content ${defaultToPicture ? 'visible' : 'hidden'}`}>
                                    <div className="card__front" style={{ backgroundImage: `url(${person.imageLink})` }}></div>
                                </div>
                                <div className={`card__content card__bio ${flippedCards[index] ? 'visible' : 'hidden'}`}>
                                    <h3>{person.name}</h3>
                                    <p>{person.bio}</p>
                                    <p>{person.email}</p>
                                    <p>{person.college}</p>
                                </div>
                            </div>
                        </TinderCard>
                    ))}
            </div>
        </div>
    );
}

export default TinderCards;