import NextHead from 'next/head'

const Head = ({ children }) => (
  <NextHead>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono:300,400,500,700&display=swap" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <title>Hiring Plan</title>
    {children}
  </NextHead>
)

export default Head