import NextDocument, { Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import Head from '../components/Head'
import Theme from '../components/Theme'

class Document extends NextDocument {
  // This prevents FOUC while using styled-components
  // https://github.com/zeit/next.js/tree/master/examples/with-styled-components
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />))

    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="en-US">
        <Head>{this.props.styleTags}</Head>

        <body>
          <Theme>
            <Main />
            <NextScript />
          </Theme>
        </body>
      </html>
    )
  }
}

export default Document