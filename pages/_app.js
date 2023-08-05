import React from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import MainLayout from "../components/layout";
import { AuthProvider } from "../context/authProvider";

import "../styles/index.css";
import "../styles/loader.css";
import "../public/fonts/fonts.css";
import "react-image-gallery/styles/css/image-gallery.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <>
      <NextSeo
        title="Fathom Radiant"
        description="We are building a new type of computer to enable the future of machine intelligence"
      />
      <Head>
        <link
          rel="shortcut icon"
          href="/favicon.ico"
          sizes="16x16"
          type="image/x-icon"
        />
        <meta
          name="keywords"
          content="fathomradiant, fathomradiant.com, fathom, radiant"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          crossOrigin="true"
          src="https://mozilla.github.io/pdf.js/build/pdf.js"
        ></script>
      </Head>
      {router.pathname.slice(0, 6) === "/admin" ? (
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      ) : (
        <MainLayout children={<Component {...pageProps} />} />
      )}
    </>
  );
}

export default MyApp;
