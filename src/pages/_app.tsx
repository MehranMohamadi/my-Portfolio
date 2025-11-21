import type { AppProps } from 'next/app'
import '../styles/global.css'
import { AppProvider } from "../contexts/AppContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}