import React from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Header.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';

function Header() {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Function to navigate to the account settings page
    const goToAccountSettings = () => {
        navigate('/account');
    };

    return (
        <div className="header">
            <IconButton onClick={goToAccountSettings}> {/* Add onClick to call the function */}
                <AccountCircleIcon className="header__icon" fontSize="large" />
            </IconButton>
            <img
                className="header__logo"
                src="https://www.pngmart.com/files/16/Partnership-Hand-Shake-PNG-Photos.png"
                alt="tinder logo"
            />
            <IconButton>
                <ForumIcon className="header__icon" fontSize="large" />
            </IconButton>
        </div>
    );
}

export default Header;
