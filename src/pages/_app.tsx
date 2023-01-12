import { Header } from "../components/header";
import { AppProps } from "../../node_modules/next/app"
import { SessionProvider } from "next-auth/react"

import '../styles/global.scss';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
  <Header/>
  <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp
