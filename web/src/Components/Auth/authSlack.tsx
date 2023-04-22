import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthSlack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token')
  const [counter, setCounter] = useState(0);

  const effectRan = useRef(false)

  useEffect(() => {
    if (effectRan.current === false) {
      fetch(`http://localhost:8080/auth/slack?code=${location.search.split("=")[1]}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => {navigate('/services/slack')})
    }
    
    return () => {
      effectRan.current = true
    }
  }, []);

  return (
    <button onClick={() => setCounter(counter + 1)}>coucou</button>
  );
};

export default AuthSlack;
