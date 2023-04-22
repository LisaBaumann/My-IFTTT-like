import React, {createContext, useState} from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('Lisa')
    const [surname, setSurname] = useState('')
    const [accessToken, setAccessToken] = useState('')

    return (
        <AuthContext.Provider value={{ email, name, surname, accessToken, setEmail, setName, setSurname, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider