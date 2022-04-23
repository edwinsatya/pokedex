import Head from "next/head";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styled from "@emotion/styled";
import Popup from "../Popup/Popup";
import { UseGlobalContext } from "../../store/context";

const LayoutWrapper = styled.div`
  background-color: #1b252f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
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
  min-height: 100vh;
`;

export default function Layout({ title, desc, children }) {
  const { state, dispatch } = UseGlobalContext();
  return (
    <LayoutWrapper>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="icon" href="/pokemon.png" />
      </Head>

      <Header />

      {state.showPopup.isShow && (
        <Popup
          title={state.showPopup.title}
          onClick={() =>
            dispatch({
              type: "SET_SHOW_POPUP",
              value: { isShow: false, children: <p></p>, title: "" },
            })
          }
        >
          {state.showPopup.children}
        </Popup>
      )}

      <MainWrapper>
        <main>{children}</main>
      </MainWrapper>

      <Footer />
    </LayoutWrapper>
  );
}
