import React, { useState } from 'react'
import { Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthDispatch } from '../../context/auth'
import { Users } from './Users'
import { Messages } from './Messages'

export const Home = (props: { history: string[] }) => {

    const dispatch = useAuthDispatch()

    const [selectedUser, setSelectedUser] = useState(null)

    const logout = () => {
        dispatch({type: 'LOGOUT'})
        props.history.push('/login')
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
                <Users setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
                <Messages selectedUser={selectedUser}/>
            </Row>
        </>
    )
}