import "../styles/globals.css";
import NavBar from "../components/nav";
import Footer from "../components/footer";

const PageGlobal = ({ Component, pageProps }) => {
  return (<>
    <NavBar {...pageProps} />
    <Component {...pageProps} />
    <Footer {...pageProps} />
  </>);
};

export default PageGlobal;
