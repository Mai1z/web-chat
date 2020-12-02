import React from 'react'
import { Container } from 'react-bootstrap'
import './styles/index.scss'
import { Register } from './pages/Register'
import { Home } from './pages/home/Home'
import { Login } from './pages/Login'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { BrowserRouter, Switch } from 'react-router-dom'
import { AuthProvider } from './context/auth'
import { MessageProvider } from './context/message'
import { DynamicRoute }  from './util/DynamicRoute'

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink ({
    uri: 'http://localhost:4000/',
});

const authLink = setContext ((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient ({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


function App() {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <MessageProvider>
                    <BrowserRouter>
                        <Container>
                            <Switch>
                                <DynamicRoute exact path="/" component={Home} authenticated/>
                                <DynamicRoute path="/register" component={Register} guest/>
                                <DynamicRoute path="/login" component={Login} guest/>
                            </Switch>
                        </Container>
                    </BrowserRouter>
                </MessageProvider>
            </AuthProvider>
        </ApolloProvider>
    )
}

export default App;
