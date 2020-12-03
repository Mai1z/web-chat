import { createContext, useReducer, useContext } from 'react'
import * as React from 'react'

const MessageStateContext = createContext<any>(undefined)
const MessageDispatchContext = createContext<any>(undefined)

const messageReducer = (state: {users: []}, action: { type: string; payload: { token: string, username: string, message: string, messages: string} }) => {
    let usersCopy: any, userIndex
    const { username, message, messages } = action.payload

    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }

        case 'SET_USER_MESSAGES':

            usersCopy = [...state.users]

            userIndex = usersCopy.findIndex((u:any) => u.username === username)

            usersCopy[userIndex] = { ...usersCopy[userIndex], messages }

            return {
                ...state,
                users: usersCopy
            }

        case 'SET_SELECTED_USER':

            usersCopy = state.users.map((user: any) => ({
                ...user,
                selected: user.username === action.payload
            }))

            return  {
                ...state,
                users: usersCopy
            }

        case 'ADD_MESSAGE':

            usersCopy = [...state.users]

            userIndex = usersCopy.findIndex((u:{username:string}) => u.username === username)

            let newUser = {
                ...usersCopy[userIndex],
                messages: [message, ...usersCopy[userIndex].messages]
            }

            usersCopy[userIndex] = newUser

            return {
                ...state,
                users: usersCopy
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