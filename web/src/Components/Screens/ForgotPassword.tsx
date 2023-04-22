import '../../Styles/ForgotPassword.css'

import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {forgot} from '../../Api/index'

import LogoAndDescription from '../LogoAndDescription'
import TextInput from '../TextInput'


export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)

    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const tryForgotten = async () => {
        if ((email && re.test(email))) {
            console.log("email: " + email)
            forgot({email})
            .then(async (data) => {
                console.log(data.data)
            })
            .catch(err => console.log(err))
        } else {
            setEmailError(true)
        }
    }
    return (
        <div className='forgotPageContainer'>
            <LogoAndDescription/>

            <div className='boxContainerRight'>
                <div className='boxForgot'>
                    <p className='boxForgotTitle'>Forgotten Password</p>
                    <TextInput
                        title={'E-mail'} topP={'30%'} left={'10%'} topInput={'45%'} topError={'58%'}
                        setText={setEmail} setTextError={setEmailError} text={email}
                        textError={emailError} errorMessage={'Erreur dans l\'email'} height={'14%'}
                        pass={'text'} fontSize={'120%'}
                    />
                    <div className='boxForgotButtonSendEmail' onClick={() => tryForgotten()}>
                        <p className='boxForgotSendEmail'>Send E-mail</p>
                    </div>
                    <div className='boxForgotButtonRemember' onClick={() => navigate('/')}>
                        <p className='boxForgotRemember'>I remember!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}