import NextApp from 'next/app'
import fetch from 'isomorphic-fetch'
import Theme from '../components/Theme'

const SPREADSHEET_URL = 'https://spreadsheets.google.com/feeds/cells/1F5PSFy5tjWltWVfI0RFmgRgHTn_lyED4Opo_28cIjm8/1/public/full?alt=json'

class App extends NextApp {
  static async getInitialProps ({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    const spreadsheetData = await fetch(SPREADSHEET_URL)
      .then(res => res.json())

    pageProps.spreadsheetData = spreadsheetData
    pageProps.query = ctx.query

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Theme>
        <Component {...pageProps} />
      </Theme>
    )
  }
}

export default App