import '../Styles/TextInput.css'


export default function TextInput({title, topP, left, topInput, topError, setText, setTextError, text, textError, errorMessage, height, pass, fontSize} : 
    {title: string, topP: string, left: string, topInput: string, topError: string, setText: any, setTextError: any, text: string, textError: boolean, errorMessage: string, height: string, pass: string, fontSize: string} ) {


    return (
        <div>
            <p className='textInputText' style={{top: topP, left: left}}>{title}</p>
            <input
                // style={emailError === true ? {borderColor: 'red'} : {borderColor: 'transparent'}}
                className='textInputInput'
                style={{top: topInput, left: left, height: height, fontSize: fontSize, borderRadius: '18px'}}
                type={pass}
                value={text}
                onChange={e => {
                        setText(e.target.value)
                        if (textError == true)
                            setTextError(false)
                    }
                }
            />
            {textError === true ? <p className='textInputErrorText' style={{top: topError, left: left}}>{errorMessage}</p> : null}
        </div>
    )
}

{/*
import '../Styles/TextInput.css'


export default function TextInput({title, setText, setTextError, text, textError, errorMessage, pass} : 
    {title: string, setText: any, setTextError: any, text: string, textError: boolean, errorMessage: string, pass: string} ) {


    return (
        <div style={{backgroundColor: '', marginLeft: '5%'}}>
            <p style={{fontFamily: 'Amoreiza', fontWeight: 'bold', color: '#D3DCFF', fontSize: '120%', marginBottom: '1%'}}>{title}</p>
            <input
                className='textInputInput'
                style={{borderRadius: '18px'}}
                type={pass}
                value={text}
                onChange={e => {
                        setText(e.target.value)
                        if (textError == true)
                            setTextError(false)
                    }
                }
            />
            {textError === true ? <p className='textInputErrorText' style={{}}>{errorMessage}</p> : null}
        </div>
    )
}
 */}
