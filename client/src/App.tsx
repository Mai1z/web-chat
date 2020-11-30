import React from 'react'
import {ThemeProvider} from 'styled-components'
import defaultTheme from './styles/theme'
import GlobalStyle from './styles/Global'
import {SideNavBar} from './components/SideNavBar'

function App() {
  return (
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle/>
        <SideNavBar/>
      </ThemeProvider>
  );
}

export default App;
