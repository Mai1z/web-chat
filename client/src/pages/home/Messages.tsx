import React, {useEffect, useState} from 'react'
import { Col, Form } from 'react-bootstrap'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Message } from './Message'
import {useMessageDispatch, useMessageState} from "../../context/message";

const SEND_MESSAGE = gql`
    mutation sendMessage($to: String!, $content: String!) {
        sendMessage(to: $to, content: $content) {
            to content uuid from
        }
    }
`

const GET_MESSAGES = gql`
    query getMessages($from: String!) {
        getMessages(
            from: $from
        ) {
            from to content createdAt uuid
        }
    }
`

export const Messages:React.FC = () => {
    const { users } = useMessageState()
    const selectedUser = users?.find((u:any) => u.selected === true)
    const [getMessages, { loading: messagesLoading, data: messagesData}] = useLazyQuery(GET_MESSAGES)
    const [content, setContent] = useState<React.SetStateAction<any>>('')
    const dispatch = useMessageDispatch()
    const messages = selectedUser?.messages

    const [sendMessage] = useMutation(SEND_MESSAGE, {
        onCompleted: data => dispatch({ type: 'ADD_MESSAGE', payload: {
                username: selectedUser.username,
                message: data.sendMessage
            }}),
        onError: err => console.log(err)
    })

    const handleChange = (e: any) => {
        setContent(e.target.value)
    }

    useEffect(()=> {
        if (selectedUser && !selectedUser.messages) {
            getMessages({ variables: { from: selectedUser.username}})
        }
    }, [selectedUser])

    useEffect(() => {
        if(messagesData) {
            dispatch( { type: 'SET_USER_MESSAGES', payload: {
                username: selectedUser.username,
                messages: messagesData.getMessages,
            }})
        }
    }, [messagesData])

    let selectedChatMarkup

    if (!messages && !messagesLoading) {
        selectedChatMarkup = <p>Select a friend</p>
    } else if (messagesLoading) {
        selectedChatMarkup = <p>Loading..</p>
    } else if (messages.length > 0) {
        selectedChatMarkup = messages.map((message: { uuid: string; content: React.ReactNode, from: string }) => (
            <Message key={message.uuid} message={message}/>
        ))
    } else if (messages.length === 0) {
        selectedChatMarkup = <p>You now in the chat!</p>
    }

    const submitMessage = (e:any) => {
        e.preventDefault()

        if (content === '' || !selectedUser) return

        sendMessage({ variables: { to: selectedUser.username, content}})

    }

    return (
        <Col xs={8}>
            <div className='messages-block d-flex flex-column-reverse'>
                {selectedChatMarkup}
            </div>
            <Form onSubmit={submitMessage}>
                <Form.Group>
                    <Form.Control
                        type='text'
                        className='message-input rounded-pill p-4 bg-secondary border-0'
                        placeholder='Type a message..'
                        value={content}
                        onChange={handleChange}
                    >

                    </Form.Control>
                </Form.Group>
            </Form>
        </Col>
    )
}