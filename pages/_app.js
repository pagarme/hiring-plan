import NextApp from 'next/app'
import Store from '../store'
import Theme from '../components/Theme'
import Head from '../components/Head'

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
      <Store>
        <Theme>
          <Head />
          <Component {...pageProps} />
        </Theme>
      </Store>
    )
  }
}

export default App