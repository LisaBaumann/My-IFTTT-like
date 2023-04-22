import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../../Styles/RegisterScreen.css'

import LogoAndDescription from "../LogoAndDescription"
import TextInput from '../TextInput'

import { getUser, login, register } from '../../Api'

const Logo = require('../../assets/logo.png')
const descriptionArea = "Automation platform of his digital life"

export default function RegisterScreen() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [nameError, setNameError] = useState(false)
    const [surnameError, setSurnameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const tryRegister = async () => {
        if ((name && surname && email && re.test(email)) && password && confirmPassword ) {
            register({name, surname, email, password, confirmPassword })
            .then(async (data) => {
                console.log(data)
                if (data.status === 201)
                    connect()
            })
            .catch(err => console.log(err))
        } else {
            if ((!re.test(email))) {
                setEmailError(true)
            } else {
                setEmailError(true)
            }
        }
        if (!name) {
            setNameError(true)
        }
        if (!surname) {
            setSurnameError(true)
        }
        if (!email) {
            setEmailError(true)
        }
        if (!password) {
            setPasswordError(true)
        }
        if (!confirmPassword) {
            setConfirmPasswordError(true)
        }
    }


    const connect = async () => {
        login(email, password)
            .then(async (data) => {
                console.log(data.data)
                if (data.data.access_token != null) {
                    localStorage.setItem('access_token', data.data.access_token)
                    getUser()
                        .then(async (data) => {
                            console.log(data.data)
                            localStorage.setItem('user', JSON.stringify(data.data))
                        })
                        .catch((err) => console.log(err))

                    navigate('/services')
                }
            })
            .catch(err => console.log(err))
    }

    // return (
    //     <div style={{flex: 1, backgroundColor: '', display: 'flex'}}> {/* Tout l'écran */}
    //         <div style={{backgroundColor: '', width: '45%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>  {/* Partie gauche */}
    //             <div style={{backgroundColor: '', width: '67%', paddingTop: '30%'}}> {/* Logo */}
    //                 <img src={Logo} alt='RegisterLogo' style={{width: '100%'}}/>
    //             </div>
    //             <div style={{backgroundColor: '', width: '40%', textAlign: 'center'}}>  {/* Description */}
    //                 <p style={{fontFamily: 'Amoreiza', color: '#D3DCFF', fontSize: '175%', fontWeight: 'bold', marginTop: '-10%'}}>{descriptionArea}</p>
    //             </div>
    //         </div>
    //         <div style={{flex: 1, backgroundColor: '', display: 'flex', alignItems: 'center', justifyContent: 'center'}}> {/* Partie droite */}
    //             <div style={{border: '2px solid #D3DCFF', width: '60%', borderRadius: '12px'}}>
    //                 <div style={{display: 'flex', justifyContent: 'center'}}>
    //                     <p style={{fontFamily: 'Amoreiza', fontSize: '200%', fontWeight: 'bold', color: '#D3DCFF'}}>Registration</p>
    //                 </div>
    //                 <div style={{}}>
    //                     {/* <TextInput
    //                         title={'Name'} setText={setName} setTextError={setNameError} text={name}
    //                         textError={nameError} errorMessage={'Error in name'} pass={'text'}
    //                     /> */}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )




    return (
        <div className='registerPageContainer'>
            <LogoAndDescription />

            <div className='rightContainer'>
                <div className='registerContainer'>
                    <p className='registerTitle'>Registration</p>


                    <TextInput
                        title={'Name'} topP={'8%'} left={'10%'} topInput={'13%'}
                        topError={'18%'} setText={setName} setTextError={setNameError} text={name}
                        textError={nameError} errorMessage={'Error in name'} height={'6%'}
                        pass={'text'} fontSize={'120%'}
                    />
                    <TextInput
                        title={'Surname'} topP={'23%'} left={'10%'} topInput={'28%'}
                        topError={'33%'} setText={setSurname} setTextError={setSurnameError} text={surname}
                        textError={surnameError} errorMessage={'Error in surname'} height={'6%'}
                        pass={'text'} fontSize={'120%'}
                    />
                    <TextInput
                        title={'E-mail'} topP={'38%'} left={'10%'} topInput={'43%'}
                        topError={'48%'} setText={setEmail} setTextError={setEmailError} text={email}
                        textError={emailError} errorMessage={'Error in e-mail'} height={'6%'}
                        pass={'text'} fontSize={'120%'}
                    />
                    <TextInput
                        title={'Password'} topP={'53%'} left={'10%'} topInput={'58%'}
                        topError={'63%'} setText={setPassword} setTextError={setPasswordError} text={password}
                        textError={passwordError} errorMessage={'Error in password'} height={'6%'}
                        pass={'password'} fontSize={'120%'}
                    />
                    <TextInput
                        title={'Confirm password'} topP={'68%'} left={'10%'} topInput={'73%'}
                        topError={'78%'} setText={setConfirmPassword} setTextError={setConfirmPasswordError} text={confirmPassword}
                        textError={confirmPasswordError} errorMessage={'Error in confirm password'} height={'6%'}
                        pass={'password'} fontSize={'120%'}
                    />

                    <div className='boxButtonRegister' onClick={() => tryRegister()}>
                        <p className='boxRegister'>OK</p>
                    </div>

                    <div className='boxButtonAccount' onClick={() => navigate('/')}>
                        <p className='boxAccount'>I have already an account</p>
                    </div>

                </div>
            </div>
        </div>
    )
}