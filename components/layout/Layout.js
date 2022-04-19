import Head from "next/head";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function Layout({ title, desc, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
