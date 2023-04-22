import React, {useState} from "react";
import "../../Styles/ProfileScreen.css"
import Header from '../Header';
import TextInput from '../TextInput'

const DisplayMode = require('../../assets/displaymode.png')
const Help = require('../../assets/help.png')
const Logout = require('../../assets/logout.png')
const Modif = require('../../assets/modif.png')
export default function ProfileScreen() {
    const [ShowName, setShowName] = useState(false);
    const [ShowSurName, setShowSurName] = useState(false);
    const [ShowEmail, setShowEmail] = useState(false);
    const [ShowPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [surName, setSurName] = useState('');
    const [surNameError, setSurNameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passWord, setPassWord] = useState('');
    const [passWordError, setPassWordError] = useState(false);
    return(

        <div className="container">
            <Header/>
            <div style={{paddingTop: '5%'}}>
                <h1 className="title">Settings</h1>
                <p className="info" style={{paddingTop: '3%'}}>See here your informations about your account and change them. Choose your visual preferences for the application.</p>

                <div style={{paddingTop: '3%'}}>
                    <div className="inputName">
                        <p className="Name">Name</p>
                        <img onClick={() => { if (ShowName){ setShowName(false); setName(''); console.log(name)} else {setShowName(true)}}} className="ModifImg" src={Modif} style={{position: "relative", width: '5%', height: '60%', top: "-55%", left: "94%"}} />
                        {
                            ShowName? <TextInput
                            title={''} topP={'20%'} left={'10%'} topInput={'2%'} topError={'38%'}
                            setText={setName} setTextError={setNameError} text={name}
                            textError={nameError} errorMessage={'Error in e-mail'} height={'85%'}
                            pass={'text'} fontSize={'120%'}
                            />:null
                        }
                    </div>

                    <div className="inputSurname">
                        <p className="Surname">Surname</p>
                        <img onClick={() => { if (ShowSurName){ setShowSurName(false); setSurName(''); console.log(surName)} else {setShowSurName(true)}}} className="ModifImg" src={Modif} style={{position: "relative", width: '5%', height: '60%', top: "-55%", left: "94%"}} />
                        {
                            ShowSurName? <TextInput
                                title={''} topP={'20%'} left={'10%'} topInput={'2%'} topError={'38%'}
                                setText={setSurName} setTextError={setSurNameError} text={surName}
                                textError={surNameError} errorMessage={'Error in e-mail'} height={'85%'}
                                pass={'text'} fontSize={'120%'}
                            />:null
                        }
                    </div>

                    <div className="inputEmail">
                        <p className="Email">Email</p>
                        <img onClick={() => { if (ShowEmail){ setShowEmail(false); setEmail(''); console.log(email)} else {setShowEmail(true)}}} className="ModifImg" src={Modif} style={{position: "relative", width: '5%', height: '60%', top: "-55%", left: "94%"}} />
                        {
                            ShowEmail? <TextInput
                                title={''} topP={'20%'} left={'10%'} topInput={'2%'} topError={'38%'}
                                setText={setEmail} setTextError={setEmailError} text={email}
                                textError={emailError} errorMessage={'Error in e-mail'} height={'85%'}
                                pass={'text'} fontSize={'120%'}
                            />:null
                        }
                    </div>

                    <div className="inputPassword">
                        <p className="Password">Password</p>
                        <img onClick={() => { if (ShowPassword){ setShowPassword(false); setPassWord(''); console.log(passWord)} else {setShowPassword(true)}}} className="ModifImg" src={Modif} style={{position: "relative", width: '5%', height: '60%', top: "-55%", left: "94%"}} />
                        {
                            ShowPassword? <TextInput
                            title={''} topP={'20%'} left={'10%'} topInput={'2%'} topError={'38%'}
                            setText={setPassWord} setTextError={setPassWordError} text={passWord}
                            textError={passWordError} errorMessage={'Error in e-mail'} height={'85%'}
                            pass={'text'} fontSize={'120%'}
                            />:null
                        }
                    </div>

                    <div className="icon">

                        <div className="ImgStyle">
                            <img onClick={() => console.log('test button DisplayMode')} className="DisplayModeImage" src={DisplayMode} alt="DisplayModeIcon" style={{position: "relative", width: '95%', height: '85%', top: '6%', left: '-1%'}}/>
                        </div>

                        <div className="ImgStyle">
                            <img onClick={() => console.log('test button Help')} className="HelpImage" src={Help} alt="HelpIcon" style={{position: "relative", width: '95%', height: '85%', top: '5.5%', left: '-1%'}}/>
                        </div>

                        <div className="ImgStyle">
                            <img onClick={() => console.log('test button Disconnect')} className="LogoutImage" src={Logout} alt="LogoutIcon" style={{position: "relative", width: '95%', height: '85%', top: '9.1%', left: '4.3%',}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
