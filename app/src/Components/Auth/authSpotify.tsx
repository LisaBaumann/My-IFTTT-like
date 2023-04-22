import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { RouteProp, useRoute } from '@react-navigation/native';

type RootStackParamList = {
    AuthSpotify: { code: string };
    // Define other screens here...
};
  
type AuthSpotifyRouteProp = RouteProp<RootStackParamList, 'AuthSpotify'>;

const AuthSpotify = ({navigation}) => {
  const route = useRoute<AuthSpotifyRouteProp>()
  const {accessToken} = useContext(AuthContext)
  const [counter, setCounter] = useState(0);

  const effectRan = useRef(false)

  useEffect(() => {
    if (effectRan.current === false) {
      console.log(accessToken)
      fetch(`http://localhost:8080/auth/spotify?code=${route.params.code}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(() => {navigation.navigate('Service')})
    }
    
    return () => {
      effectRan.current = true
    }
  }, []);

  return (
    <button onClick={() => setCounter(counter + 1)}>coucou</button>
  );
};

export default AuthSpotify;