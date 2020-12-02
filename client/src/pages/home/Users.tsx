import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {Col, Image} from 'react-bootstrap'
import { useMessageDispatch, useMessageState } from '../../context/message'
import classNames from 'classnames'

const GET_USERS = gql`
    query getUsers {
        getUsers {
            username createdAt imageUrl
            latestMessage {
                uuid content from to createdAt
            }
        }
    }
`

export const Users:React.FC<{ setSelectedUser: any, selectedUser: string | null }> = ({ setSelectedUser, selectedUser }) => {

    const dispatch = useMessageDispatch()
    const { users } = useMessageState()

    const { loading } = useQuery(GET_USERS, {
        onCompleted: data => dispatch({ type: 'SET_USERS', payload: data.getUsers }),
        onError: err => console.log(err)
    })

    let usersMarkup

    if(!users || loading) {
        usersMarkup = <p>Loading..</p>
    } else if (users.length === 0) {
        usersMarkup = <p>No users have joined yet</p>
    } else if (users.length > 0) {
        usersMarkup = users.map((user: {username: any, imageUrl: string, latestMessage: { content : string }}) => {
            const selected = selectedUser === user.username
            return (<div
                role='button'
                className={classNames('d-flex p-3 user-block', {'active': selected})}
                key={user.username}
                onClick={() => setSelectedUser(user.username)}
            >
                <Image
                    src={user.imageUrl ? user.imageUrl : 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'}
                    roundedCircle
                    className='mr-2'
                    style={{width: 50, height: 50, objectFit: 'cover'}}
                />
                <div>
                    <p className='text-success'>{user.username}</p>
                    <p className='font-weight-light'>
                        {user.latestMessage ? user.latestMessage.content : 'You are now in chat!'}
                    </p>
                </div>
            </div>)
        })
    }
    return (
        <Col xs={4} className='p-0 bg-secondary'>
            {usersMarkup}
        </Col>
    )
}