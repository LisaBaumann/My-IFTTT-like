import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AuthGoogle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token')
  const [counter, setCounter] = useState(0);

  const effectRan = useRef(false)

  useEffect(() => {
    if (effectRan.current === false) {
      fetch(`http://localhost:8080/auth/google?code=${location.search.split("=")[1]}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(() => { {/*sessionStorage.setItem('isConnectedSpotify', 'true'); */} navigate('/services/gmail')})
    }
    
    return () => {
      effectRan.current = true
    }
  }, []);

  return (
    <button onClick={() => setCounter(counter + 1)}>coucou</button>
  );
};

export default AuthGoogle;
