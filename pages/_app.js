import NextApp from 'next/app'
import Theme from '../components/Theme'

class App extends NextApp {
  static async getInitialProps ({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    pageProps.query = ctx.query

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      < Theme>
        <Component {...pageProps} />
      </Theme>
    )
  }
}

export default App