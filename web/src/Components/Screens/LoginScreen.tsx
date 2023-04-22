import '../../Styles/LoginScreen.css'

import {useContext, useEffect, useState} from 'react'
import {getPlatforms, getUser, login} from '../../Api/index'
import { useNavigate } from 'react-router-dom';

import LogoAndDescription from '../LogoAndDescription'
import TextInput from '../TextInput'
import { AreaContext } from '../../Contexts/AreaContext';


export default function LoginScreen() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const {platforms, setPlatforms} = useContext(AreaContext)

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    const tryConnexion = async () => {
        if ((email && re.test(email)) && password) {
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
        } else {
            if ((!email || !re.test(email)) && password) {
                setEmailError(true)
            } else if (re.test(email) && !password) {
                setPasswordError(true)
            } else {
                setEmailError(true)
                setPasswordError(true)
            }
        }
    }

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null)
            navigate('/services')
    })


    return (
        <div className='loginPageContainer'>
            <LogoAndDescription />

            <div className='rightContainer'>
                <div className='loginContainer'>
                    <p className='loginTitle'>Login</p>
                    

                    <TextInput
                        title={'E-mail'} topP={'20%'} left={'10%'} topInput={'30%'} topError={'38%'}
                        setText={setEmail} setTextError={setEmailError} text={email}
                        textError={emailError} errorMessage={'Error in e-mail'} height={'8%'}
                        pass={'text'} fontSize={'120%'}
                    />
                    <TextInput
                        title={'Password'} topP={'45%'} left={'10%'} topInput={'55%'}
                        topError={'63%'} setText={setPassword} setTextError={setPasswordError}
                        text={password} textError={passwordError}
                        errorMessage={'Error in password'} height={'8%'} pass={'password'}
                        fontSize={'200%'}
                    />


                    <div className='validate' onClick={() => tryConnexion()}> {/* Remplacer navigate par tryConnexion */}
                        <p className='connectText'>OK</p>
                    </div>

                    <div className='forgotPassword' onClick={() => navigate('/forgotPassword')}>
                        <p className='forgotText'>Forgot password ?</p>
                    </div>

                    <div className='register' onClick={() => navigate('/register')}>
                        <p className='registerText'>I don't have an account</p>
                    </div>
                </div>
            </div>
        </div>
    )
}