import { createContext, useReducer, useContext } from 'react'
import * as React from 'react'
import jwtDecode from 'jwt-decode'

const AuthStateContext = createContext<any>(undefined)
const AuthDispatchContext = createContext<any>(undefined)

const token = localStorage.getItem('token')

let user: null

if (token) {
    const decodedToken: any = jwtDecode(token)
    const expiresAt = new Date(decodedToken.exp * 1000)

    if(new Date() > expiresAt) {
        localStorage.removeItem('token')
    } else {
        user = decodedToken
    }

} else {
    console.log('No token')
}

const authReducer = (state: {}, action: { type: string; payload: { token: string} }) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            localStorage.removeItem('token')
            return {
                ...state,
                user: null
            }
        default:
            throw new Error(`Unknown action type: ${action.type}`)
    }
}

export const AuthProvider:React.FC<{children: object}> = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, { user })
    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    )
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)