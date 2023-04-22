import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet} from 'react-native';


import LoginScreen from './src/Components/Screens/LoginScreen';
import RegisterScreen from './src/Components/Screens/RegisterScreen';
import ProfileScreen from "./src/Components/Screens/ProfileScreen";
import ForgottenPasswordScreen from './src/Components/Screens/ForgottenPasswordScreen';
import DrawerComponent from "./src/Components/DrawerComponent";
import DiscoverScreen from "./src/Components/Screens/DiscoverScreen";

import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import AppletScreen from './src/Components/Screens/AppletScreen';
import ServiceScreen from './src/Components/Screens/ServiceScreen';
import MyAreaScreen from './src/Components/Screens/MyAreaScreen';
import SearchScreen from './src/Components/Screens/SearchScreen';
import AuthContextProvider from './src/Contexts/AuthContext';
import AreaContextProvider from './src/Contexts/AreaContext';
import { useFonts } from 'expo-font';


const Drawer = createDrawerNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
		Amoreiza: require('./assets/fonts/amoreiza-regular.ttf'),
	});

	if (!fontsLoaded)
		return null
	return (
    <AuthContextProvider>
			<AreaContextProvider>
        <NavigationContainer>
          <Drawer.Navigator screenOptions={{
            headerShown: false,

          }} drawerContent={(props) => <DrawerComponent {...props} />}>
            <Drawer.Screen name="Login" component={LoginScreen} options={{drawerItemStyle: { height: 1 }}} />
            <Drawer.Screen name="Register" component={RegisterScreen} options={{drawerItemStyle: { height: 0 }}} />
            <Drawer.Screen name="Forgot" component={ForgottenPasswordScreen} options={{drawerItemStyle: { height: 0 }}} />
            <Drawer.Screen name="Home" component={AppletScreen} options={{drawerItemStyle: { height: 0 }}} />
            <Drawer.Screen name="Search" component={SearchScreen} options={{drawerItemStyle: { height: 0 }}} />
            <Drawer.Screen name="Service" component={ServiceScreen} options={{drawerItemStyle: { height: 0 }}} />
            <Drawer.Screen name="MyArea" component={MyAreaScreen} options={{drawerItemStyle: { height: 0 }}} />
            <Drawer.Screen name="Profile" component={ProfileScreen} options={{drawerItemStyle: { height: 0 }}} />
            <Drawer.Screen name="Discover" component={DiscoverScreen} options={{drawerItemStyle: { height: 0 }}} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AreaContextProvider>
  </AuthContextProvider>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
