import React, {useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'


// Screens imports
import LoginScreen from './Components/Screens/LoginScreen'
import ForgotPassword from './Components/Screens/ForgotPassword'
import RegisterScreen from './Components/Screens/RegisterScreen'
import MyAreaScreen from './Components/Screens/MyAreaScreen'
import ServiceScreen from './Components/Screens/ServiceScreen'
import AppletScreen from './Components/Screens/AppletScreen'
import SearchScreen from './Components/Screens/SearchScreen'
import ProfileScreen from './Components/Screens/ProfileScreen'

import Home from './Components/Auth/authSpotify'
import AuthOutlook from './Components/Auth/authOutlook'
import AuthGoogle from './Components/Auth/authGoogle'

import AreaContextProvider from './Contexts/AreaContext'
import DiscoverScreen from './Components/Screens/DiscoverScreen';
import AuthGithub from './Components/Auth/authGithub';
import AuthSlack from './Components/Auth/authSlack';

function App() {

	return (
		<AreaContextProvider>
			<Router>
				<Routes>
					{/* Auth routes */}
					<Route path='/' element={<LoginScreen />} />
					<Route path='/forgotPassword' element={<ForgotPassword />} />
					<Route path='/register' element={<RegisterScreen />} />

					{/* Screens routes */}
					<Route path='/search' element={<SearchScreen />} />
					<Route path='/myArea' element={<MyAreaScreen />} />
					<Route path='/discover' element={<DiscoverScreen />} />
					<Route path='/services' element={<AppletScreen />} />
					<Route path='/services/:serviceName' element={<ServiceScreen />} />
          			<Route path='/profile' element={<ProfileScreen />} />

					{/* Auth services routes */}
					<Route path='/authSpot' element={<Home />} />
					<Route path='/outlookauth' element={<AuthOutlook />} />
					<Route path='/githubAuth' element	={<AuthGithub />} />
					<Route path='/authslack' element={<AuthSlack />} />
					<Route path='/auth' element={<AuthGoogle />} />
				</Routes>
			</Router>
		</AreaContextProvider>
	)
}

export default App;
