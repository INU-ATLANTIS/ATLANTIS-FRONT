import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './components/GlobalStyle'

const THEMES = {
  light: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  dark: {
    backgroundColor: '#03040c',
    color: '#ffffff',
  },
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ThemeProvider theme={THEMES['light']}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
