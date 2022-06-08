import "../styles/globals.css";
import NavBar from "../components/nav";
import Footer from "../components/footer";
import { Box, Container, ThemeProvider } from "@mui/material";
import customTheme from "../components/theme";

const PageGlobal = ({ Component, pageProps }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={customTheme}>
        <NavBar {...pageProps} />
        <Container sx={{ flexGrow: 1 }}>
          <Component {...pageProps} />
        </Container>
        <Footer {...pageProps} />
      </ThemeProvider>
    </Box>
  );
};

export default PageGlobal;
