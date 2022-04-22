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
// 091829
export default function Layout({ title, desc, children }) {
  return (
    <LayoutWrapper>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div
        className="w-full p-8"
        style={{ backgroundColor: "#091829", maxWidth: "1440px" }}
      >
        <main>{children}</main>

        <Footer />
      </div>
    </LayoutWrapper>
  );
}
