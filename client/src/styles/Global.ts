import { createGlobalStyle } from 'styled-components'
import { ThemeType } from './theme'

interface Props {
    theme: ThemeType
}

const GlobalStyle = createGlobalStyle<Props>`
  *, *:after, *:before {
    box-sizing: border-box;
    margin: 0;
    outline: none
  }
  body {
    font-size: calc(14px + .3vw);
    font-family: 'Fira Sans', 'Lato', sans-serif;
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.primary};
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.dark}
  }
  ul {
    list-style: none
  }
`

export default GlobalStyle
