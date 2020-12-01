import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'
import {Link} from 'react-router-dom'

const REGISTER_USER = gql`
    mutation register($username: String! $email: String! $password: String! $confirmPassword: String!) {
        register(username: $username email: $email password: $password confirmPassword: $confirmPassword) {
            username email createdAt
        }
    }
`;

export const Register = (props: { history: string[] }) => {

    const [variables, setVariables] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(_,__) {
            props.history.push('/login')
        },
        onError(err) {
            // @ts-ignore
            setErrors(err.graphQLErrors[0].extensions.errors)
        }
    })

    const submitRegisterForm = (e: any) => {
        e.preventDefault()
        registerUser({variables})
     }

    return (
        <Row className='justify-content-center'>
            <Col sm={8} md={6} lg={4}>
                <h1 className='text-center'>Register</h1>
                <Form onSubmit={submitRegisterForm}>
                    <Form.Group>
                        <Form.Label className={errors.username && 'text-danger'}>
                            {errors.username ?? 'User name'}
                        </Form.Label>
                        <Form.Control
                            type='text'
                            className={errors.username && 'is-invalid'}
                            value={variables.username}
                            onChange={e => setVariables({...variables, username: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={errors.email && 'text-danger'}>
                            {errors.email ?? 'Email'}
                        </Form.Label>
                        <Form.Control
                            type='email'
                            className={errors.email && 'is-invalid'}
                            value={variables.email}
                            onChange={e => setVariables({...variables, email: e.target.value})}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className={errors.password && 'text-danger'}>
                            {errors.password ?? 'Password'}
                        </Form.Label>
                        <Form.Control
                            type='password'
                            className={errors.password && 'is-invalid'}
                            value={variables.password}
                            onChange={e => setVariables({...variables, password: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={errors.confirmPassword && 'text-danger'}>
                            {errors.confirmPassword ?? 'Confirm password'}
                        </Form.Label>
                        <Form.Control
                            type='password'
                            className={errors.confirmPassword && 'is-invalid'}
                            value={variables.confirmPassword}
                            onChange={e => setVariables({...variables, confirmPassword: e.target.value})}
                        />
                    </Form.Group>
                    <div className='text-center'>
                        <Button variant='success' type='submit' disabled={loading} >
                            { loading ? 'Loading..' : 'Register'}
                        </Button>
                        <br/>
                        <small>Already have an account? <Link to="/login">Login</Link></small>
                    </div>

                </Form>
            </Col>
        </Row>
    );
}