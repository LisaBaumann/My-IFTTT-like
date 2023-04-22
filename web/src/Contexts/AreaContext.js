import React, {createContext, useState} from 'react'

export const AreaContext = createContext()

const AreaContextProvider = ({children}) => {
    const [platforms, setPlatforms] = useState({})
    const [actionService, setActionService] = useState({})
    const [reactionService, setReactionService] = useState([])

    return (
        <AreaContext.Provider value={{ actionService, setActionService, reactionService, setReactionService, platforms, setPlatforms }}>
            {children}
        </AreaContext.Provider>
    )
}

export default AreaContextProvider