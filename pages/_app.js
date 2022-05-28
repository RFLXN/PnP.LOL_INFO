import "../styles/globals.css";
import NavBar from "../components/nav";
import Footer from "../components/footer";
import { Container, ThemeProvider } from "@mui/material";
import customTheme from "../components/theme";

const PageGlobal = ({ Component, pageProps }) => {
  return (<>
    <ThemeProvider theme={customTheme}>
      <NavBar {...pageProps} />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer {...pageProps} />
    </ThemeProvider>
  </>);
};

export default PageGlobal;
