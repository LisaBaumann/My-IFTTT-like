---
description: Documentation of Area web application
---

# 💻 Application

#### Web application available on :

{% embed url="http://localhost:8081" %}
Link to web site
{% endembed %}

#### Mobile application available on :

{% embed url="http://localhost:8081/client.apk" %}
Link to download application
{% endembed %}

## Outils

#### React JS

React JS is very cool

## Architecture

### Api

Every route used in the app are created here with axios

### Assets

All the assets needed by the app to display on the each screens

### Components

#### Auth

Every components necessary to make the authentication on every services available

#### Screens

Every component to display all of the pages of the app. One component displays one page

#### Misc

In this folder, there are all the components necessary to create multiple pages and avoid repeating code

### Contexts

Contexts are necessary to save data in order to use them later on the app. They are created in this folder

### Styles

Every css file needed by every component are in this folder

### Main files

* index.tsx: creates the app, import our fonts
* App.tsx: renders the app, creates the react router in order to move between screens

### Class diagram

{% embed url="https://lucid.app/lucidchart/81eb3fc3-c49b-4726-bbf7-1ba3586b419f/edit?invitationId=inv_2b16205a-d508-4ec2-8d13-5fef53634b48&view_items=Qu5BD_DB22K6,~PcCu27PGfiA,e6cCAqi4C5y8,OPcCNWMhGqAE,mC5B2RfSda0Z,OPcCiLzEHg8n,Qu5B2h26xSjv,EA5Bl6x.1.5z,.n5BrGbWYCpc,Ls5B71JJ80Rt,Np5BNSq4V-jo,Cr5BjuHVD.kW,Qu5BKxW.ns5z,fQcCk2k2sOog,KB5BMci5zVSc,OPcCZolxdaHY,zF5BMQBV-BJ6,To5BJMF08LXw,0q5BLfHj4cAl,U_EpME8WbxUL,0p5BgHi1iulK,Az5BS5CRGmZS,KQcCgNKk0yJc,KRcCS~Fg1uCr,j6cCSzE9weWl,XF5BTBZ89H1k,Ir5BS7w8DV.R,BQcCyoAL0kyr,UQcCu4fDA6uP,Ys5BMiuIZ~U8,FRcC~f3sgxdi,0o5BqfAdfT9H,2z5BhwuYXHtj,-z5Bkxco0yl_,qo5Bsu5YrMYn,8q5BSO.UK6VA,sB5BeZ71GGig,RB5BFTbMfB_M,VC5BF8WPj_nW" %}
class UML
{% endembed %}

## How it works ?

#### Web

The core of the app is App.tsx. In this file there is the react router necessary to move between screens (changing the url). There are every screens with their route in this react router

```tsx
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
		<Route path='/githubAuth' element={<AuthGithub />} />
		<Route path='/authslack' element={<AuthSlack />} />
		<Route path='/auth' element={<AuthGoogle />} />
	</Routes>
</Router>
```

#### Mobile

The core of the mobile app is App.tsx. In this file there is the react navigation necessary to move between screens. There are every screens with their route in this react router

```tsx
<NavigationContainer>
	<StatusBar style="auto" />
<Stack.Navigator screenOptions={{headerShown: false}}>
	<Stack.Screen name="Login" component={LoginScreen} />
	<Stack.Screen name="Register" component={RegisterScreen} />
	<Stack.Screen name="Forgot" component={ForgottenPasswordScreen} />
	<Stack.Screen name="Home" component={AppletScreen} />
	<Stack.Screen name="Search" component={SearchScreen} />
	<Stack.Screen name="Service" component={ServiceScreen} />
	<Stack.Screen name="MyArea" component={MyAreaScreen} />
</Stack.Navigator>
</NavigationContainer>
```

Every new screen needs to be added here. Each screen has his own file.&#x20;

Another important part of the app is the api: Axios is used to make requests to the server

```typescript
import axios from 'axios'
const urlAPI = "http://localhost:8080/"
const instance = axios.create({
    baseURL: urlAPI
})
const login = (email: string, password: string) =>    instance.post('auth/login', {email, password})
```

urlAPI: the url to access the server

instance: takes the urlAPI as baseURL and give access to requests as shown for login

login: takes two parameters : email and password. Uses the instance to make a POST request on 'auth/login' with email and password as data
