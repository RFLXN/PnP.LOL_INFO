import "../styles/globals.css";
import NavBar from "../components/nav";
import Footer from "../components/footer";
import { ThemeProvider } from "@mui/material";
import customTheme from "../components/theme";

const PageGlobal = ({ Component, pageProps }) => {
  return (<>
    <ThemeProvider theme={customTheme}>
      <NavBar {...pageProps} />
      <Component {...pageProps} />
      <Footer {...pageProps} />
    </ThemeProvider>
  </>);
};

export default PageGlobal;
