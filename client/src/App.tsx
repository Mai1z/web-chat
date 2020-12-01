import React from 'react'
import { Container } from 'react-bootstrap'
import './styles/index.scss'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter, Route } from 'react-router-dom'

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});


function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Container>
                    <Route exact path="/" component={Home}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                </Container>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App;
