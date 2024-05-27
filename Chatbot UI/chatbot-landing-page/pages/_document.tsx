import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="canonical" href="https://serenityspace.vercel.app/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Serenity Space | Your Space for Mental Well-being"
        ></meta>
        <meta
          name="og:description"
          content="Welcome to Serenity Space, where we provide a supportive
          environment for your mental well-being."
        />
        <meta property="og:url" content="https://serenityspace.vercel.app" />
        <meta property="og:site_name" content="Serenity Space" />
        <meta name="theme-color" content="#51c054" />
        <meta
          property="og:image"
          content="https://serenityspace.vercel.app/images/meta-img.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
