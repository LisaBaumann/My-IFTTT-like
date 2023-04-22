import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {makeRedirectUri} from 'expo-auth-session';
import {startAsync} from 'expo-auth-session';

export default function LoginButton({ serviceName }) {
  
    const getServiceScopes = () => {
        if (serviceName === 'spotify') {
          return ['user-read-private', 'user-read-email', 'user-read-currently-playing', 'user-modify-playback-state'];
        } else if (serviceName === 'googledrive' || serviceName === 'gmail') {
          return ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/gmail.modify'];
        } else { // Outlook
          return ['Mail.Read', 'Mail.Send', 'Mail.ReadWrite'];
        }
      }
    
      const authUrlBase = (() => {
        if (serviceName === 'spotify') {
          return 'https://accounts.spotify.com/authorize';
        } else if (serviceName === 'googledrive' || serviceName === 'gmail') {
          return 'https://accounts.google.com/o/oauth2/v2/auth';
        } else { // Outlook
          return 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
        }
      })();
    
      const authUrl = new URL(authUrlBase);
      const scopes = getServiceScopes();
      const clientId = (() => {
        if (serviceName === 'spotify') {
          return '024109e93523411eab1259b128096e05';
        } else if (serviceName === 'googledrive' || serviceName === 'gmail') {
          return '569424510679-e4m5sdncrq8prplcgdbctlfc222r1t5f.apps.googleusercontent.com';
        } else { // Outlook
          return '978020c9-d437-4004-bbc7-b4f41d309bc5';
        }
      })();
      const redirectUri = makeRedirectUri({ path: 'redirect' }); // Replace 'redirect' with the actual path in your app
    
      authUrl.searchParams.append('scope', scopes.join(' '));
      authUrl.searchParams.append('access_type', 'offline');
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('redirect_uri', redirectUri);
      authUrl.searchParams.append('client_id', clientId);
    
      const handleLoginButtonPress = async () => {
        const result = await startAsync({ authUrl: authUrl.href });
        // Handle the result of the authentication here
      };

    return (
        <TouchableOpacity style={styles.button} onPress={handleLoginButtonPress}>
            <Text style={{color: '#D3DCFF', fontSize: '28px'}}>Login</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#62ABF0',
        marginVertical: '10%',
        marginLeft: '70%',
        width: '25%',
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContents: 'center',
        // top: '85%',
        // left: '80%',
        borderRadius: '25px',
    }
})