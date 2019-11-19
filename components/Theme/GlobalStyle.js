import { normalize } from 'polished'
import { createGlobalStyle } from 'styled-components'
import theme from './theme'

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    box-sizing: border-box;
    font-size: 62.5%; // After this, 1rem = 10px
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 2rem;
    font-size: ${theme.global.font.size};
    font-family: ${theme.global.font.family};
  }

  input,
  select,
  textarea
  button {
    font-size: ${theme.global.font.size};
  }

  a,
  p {
    font-size: 2rem;
  }

  h1,
  h2,
  h3 {
    font-weight: bold;
  }

  h1 {
    font-size: 4.8rem;
  }

  h2 {
    font-size: 3.6rem;
  }

  h3 {
    font-size: 2.4rem;
  }
`

export default GlobalStyle
