import NextDocument, { Head, Main, NextScript } from 'next/document'

class Document extends NextDocument {
  render() {
    return (
      <html lang="en-US">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500,700&display=swap" />
          <title>Hiring Plan</title>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default Document