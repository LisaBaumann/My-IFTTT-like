import { StickyContainer, Sticky } from 'react-sticky';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/Header.css'

import React, {useState, useEffect, useRef} from "react";
import {Button} from "@mui/material";

const Logo = require('../assets/logo.png')
const SearchImage = require('../assets/searchImage.png')
const MyAreaImage = require('../assets/myAreaImage.png')
const DiscoverImage = require('../assets/discoverImage.png')
const Profile = require('../assets/profileIcon.png')
const Settings = require('../assets/settings.png')
const DisplayMode = require('../assets/displaymode.png')
const Help = require('../assets/help.png')
const Logout = require('../assets/logout.png')

const SearchImageHover = require('../assets/searchImageHover.png')
const MyAreaImageHover = require('../assets/myAreaImageHover.png')
const DiscoverImageHover = require('../assets/discoverImageHover.png')

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || document.getElementsByClassName("PanelBody")[0].contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}


function Tab({name, image, imageHover, onclick}) {
    const [chooseImage, setChooseImage] = useState(false)

    const getImage = () => {
        if (chooseImage === false)
            return image
        else
            return imageHover
    }

    return (
        <div className="header">
            <div className="tabs">
                <div className="tab">
                    <img src={getImage()} alt="Tab 1" className="tab-image"/>
                    <div className="tab-title" onClick={() => onclick()} onMouseEnter={() => setChooseImage(true)} onMouseLeave={() => setChooseImage(false)}>{name}</div>
                </div>
            </div>
        </div>
      );
}

export default function Header() {
    const ref = useRef();
    const navigate = useNavigate()
    const location = useLocation()
    const [Show, setShow] = useState(false);



    return (
        <div className='headerContainer'>
            <img src={Logo} className='headerLogo' onClick={() => { if (location.pathname != '/services') navigate('/services')}}/>
            <div className='tabsContainer'>
                <Tab name={"Search"} image={SearchImage} imageHover={SearchImageHover} onclick={() => { if (location.pathname != '/search') navigate('/search')}} />
                <Tab name={"Areas"} image={MyAreaImage} imageHover={MyAreaImageHover} onclick={() => { if (location.pathname != '/myArea') navigate('/myArea')}} />
                <Tab name={"Discover"} image={DiscoverImage} imageHover={DiscoverImageHover} onclick={() => { if (location.pathname != '/discover') navigate('/discover')}} />
            </div>
            <div style={{width: '10%'}}>
                <img className='profileImage' src={Profile} alt='ProfileIcon' style={{width: '45%', height: '90%', marginTop: '2.2%', marginLeft: '100%'}} onClick={() => { if (Show){ setShow(false)} else {setShow(true)}}} />
                <div className="PanelBody">
                    {
                        Show? <div className="Panel">
                            <div className="UserName">
                                <h3 className="UserNameStyle">{JSON.parse(Object(localStorage.getItem('user')))['name']}</h3>
                            </div>
                            <div className="ButtonList">
                                <div className="SettingButton" onClick={() => {if (location.pathname !== '/profile') navigate('/profile')}}>
                                    <div className="StyleImg">
                                        <img className="settingsImage" src={Settings} alt="SettingsIcon" style={{position: "relative", width: '95%', height: '85%', top: '8%', left: '2%'}}/>
                                    </div>
                                    <p className="Setting">Settings</p>
                                </div>

                                <div className="DisplayModeButton" onClick={() => console.log('test button DisplayMode')}>
                                    <div className="StyleImg">
                                        <img className="displayModeImage" src={DisplayMode} alt="DisplayModeIcon" style={{position: "relative", width: '90%', height: '80%', top: '10%', left: '2%'}}/>
                                    </div>
                                    <p className="DisplayMode">Display mode</p>
                                </div>

                                <div className="HelpButton" onClick={() => console.log('test button Help')}>
                                    <div className="StyleImg">
                                        <img className="helpImage" src={Help} alt="HelpIcon" style={{position: "relative", width: '95%', height: '85%', top: '8%', left: '2%'}}/>
                                    </div>
                                    <p className="Help">Help</p>
                                </div>

                                <div className="LogoutButton" onClick={() => {localStorage.removeItem('user'); localStorage.removeItem('access_token'); localStorage.removeItem('action'); localStorage.removeItem('reaction'); navigate('/')}}>
                                    <div className= "StyleImg">
                                        <img className="logoutImage" src={Logout} alt="LogoutIcon" style={{position: "relative", width: '95%', height: '85%', top: '10%', left: '4%'}}/>
                                    </div>
                                    <p className="Logout">Logout</p>
                                </div>
                            </div>

                        </div>:null

                    }
                </div>
            </div>
        </div>
    )
}
