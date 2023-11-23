import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Sunset Festival - administracja</title>
        <meta name="author" content="Mikołaj Gawron" />
        <meta
          name="description"
          content="Praca inżynierska - strona administracyjna festiwalu muzycznego z sklepem internetowym"
        />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
