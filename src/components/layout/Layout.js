import Head from "next/head";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styled from "@emotion/styled";

const LayoutWrapper = styled.div`
  background-color: #090917;
`;

export default function Layout({ title, desc, children }) {
  return (
    <LayoutWrapper>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>{children}</main>

      <Footer />
    </LayoutWrapper>
  );
}
