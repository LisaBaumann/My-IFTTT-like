import React, {createContext, useState} from 'react'

export const AreaContext = createContext()

const AreaContextProvider = ({children}) => {
    const [platforms, setPlatforms] = useState([])
    const [currentPlatform, setCurrentPlatform] = useState('')
    const [isAction, setIsAction] = useState(0) // 0 : Les deux ; 1 : Action ; 2 : Reaction
    const [action, setAction] = useState({})
    const [reaction, setReaction] = useState([])
    const [modify, setModify] = useState('')


    return (
        <AreaContext.Provider value={{ platforms, currentPlatform, isAction, action, reaction, modify, setPlatforms, setCurrentPlatform, setIsAction, setAction, setReaction, setModify }}>
            {children}
        </AreaContext.Provider>
    )
}

export default AreaContextProvider