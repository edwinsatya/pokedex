import Head from "next/head";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styled from "@emotion/styled";

const LayoutWrapper = styled.div`
  background-color: #1b252f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  overflow: hidden;
  @media (min-width: 768px) {
    padding: 2rem;
  }
  background-color: #091829;
  max-width: 1440px;
`;

export default function Layout({ title, desc, children }) {
  return (
    <LayoutWrapper>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="icon" href="/pokemon.png" />
      </Head>

      <Header />

      <MainWrapper>
        <main>{children}</main>

        <Footer />
      </MainWrapper>
    </LayoutWrapper>
  );
}
