import React, { useEffect } from 'react'
import { Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from '../../context/auth'
import { Users } from './Users'
import { Messages } from './Messages'
import { useSubscription, gql } from '@apollo/client'
import { useMessageDispatch } from "../../context/message";

const NEW_MESSAGE = gql`
    subscription newMessage{
        newMessage {
            uuid from to content createdAt
        }
    }
`

export const Home = (props: { history: string[] }) => {

    const authDispatch = useAuthDispatch()

    const messageDispath = useMessageDispatch()

    const { data, error } = useSubscription(NEW_MESSAGE)

    const { user } = useAuthState()

    useEffect(() => {
        if ( data ) {
            const message = data.newMessage

            const otherUser = user.username === message.to ? message.from : message.to

            messageDispath ({ type: 'ADD_MESSAGE', payload: {
                    username: otherUser,
                    message,
                }})
        }
    }, [ error, data ])

    const logout = () => {
        authDispatch({type: 'LOGOUT'})
        window.location.href = '/login'
    }

    return (
        <>
            <Row className='justify-content-around'>
                <Link to='/login'>
                    <Button variant='link'>Login</Button>
                </Link>
                <Link to='/register'>
                    <Button variant='link'>Register</Button>
                </Link>
                <Button variant='link' onClick={logout}>Logout</Button>
            </Row>
            <Row>
                <Users />
                <Messages />
            </Row>
        </>
    )
}