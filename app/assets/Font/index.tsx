

import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadFont() {
    useEffect (() => {
        async function loading() {
            try {
                await Font.loadAsync({
                    ...FontAwesome.font,
                    "Amoreiza": require('amoreiza-regular.ttf')
                });
            } catch (e) {
                console.log(e)
            }
        }
    })

}
