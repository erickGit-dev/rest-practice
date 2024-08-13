import React from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from "../config";
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import style from '../styles/logout.module.css'

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();
    const logOutURL: string = config.logOutURL;
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await fetch(logOutURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    mode: 'cors',
                    credentials: 'include'
                });

                if (response.ok) {
                    localStorage.removeItem('token');
                    navigate('/login');
                } else {
                    console.error('Error logging out:', response.statusText);
                }
            } catch (error) {
                console.error('No token reconized:', error);
            }
        }
    }

    return <button onClick={handleLogout} title='Log out' className={style['log-out']}>
        <FaArrowRightFromBracket size={'13pt'}/>
    </button>;
};

export default LogoutButton;