import { createContext, useReducer, useContext } from 'react'
import * as React from 'react'

const MessageStateContext = createContext<any>(undefined)
const MessageDispatchContext = createContext<any>(undefined)

const messageReducer = (state: {}, action: { type: string; payload: { token: string} }) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }
        default:
            throw new Error(`Unknown action type: ${action.type}`)
    }
}

export const MessageProvider:React.FC<{children: object}> = ({children}) => {
    const [state, dispatch] = useReducer<any>(messageReducer, { users: null })
    return (
        <MessageDispatchContext.Provider value={dispatch}>
            <MessageStateContext.Provider value={state}>
                {children}
            </MessageStateContext.Provider>
        </MessageDispatchContext.Provider>
    )
}

export const useMessageState = () => useContext(MessageStateContext)
export const useMessageDispatch = () => useContext(MessageDispatchContext)