import { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './GlobalStyle'
import theme from './theme'

const Theme = props => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      <Fragment>{props.children}</Fragment>
    </Fragment>
  </ThemeProvider>
)

export default Theme
