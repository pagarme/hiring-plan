import NextApp from 'next/app'
import fetch from 'isomorphic-fetch'
import Theme from '../components/Theme'
import Head from '../components/Head'

class App extends NextApp {
  static async getInitialProps ({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    const spreadsheetData = await fetch(ctx.query.source)
      .then(res => res.json())

    pageProps.spreadsheetData = spreadsheetData
    pageProps.query = ctx.query

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Theme>
        <Head />
        <Component {...pageProps} />
      </Theme>
    )
  }
}

export default App