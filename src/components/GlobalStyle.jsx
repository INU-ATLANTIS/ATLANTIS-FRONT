import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard' !important;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.color};
    margin: 0;
  }
`

export default GlobalStyle
