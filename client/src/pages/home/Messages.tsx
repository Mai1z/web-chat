import React, {useEffect} from 'react'
import {Col} from 'react-bootstrap'
import {gql, useLazyQuery} from "@apollo/client";

const GET_MESSAGES = gql`
    query getMessages($from: String!) {
        getMessages(
            from: $from
        ) {
            from to content createdAt uuid
        }
    }
`

export const Messages:React.FC<{selectedUser: string | null}> = ({selectedUser}) => {
    const [getMessages, { loading: messagesLoading, data: messagesData}] = useLazyQuery(GET_MESSAGES)

    useEffect(()=> {
        if (selectedUser) {
            getMessages({ variables: { from: selectedUser}})
        }
    }, [selectedUser])
    return (
        <Col xs={8}>
            {messagesData && messagesData.getMessages.length > 0 ? (
                messagesData.getMessages.map((message: { uuid: string; content: React.ReactNode }) => (
                    <p key={message.uuid}>{message.content}</p>
                ))
            ) : <p>You are in chat now!</p>}
        </Col>
    )
}