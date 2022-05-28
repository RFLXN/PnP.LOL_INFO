import { createTheme } from "@mui/material";
import { blue, grey } from "@mui/material/colors";

const customTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
      dark: blue[900],
      light: blue[200],
      contrastText: "#ffffff"
    },
    secondary: {
      main: grey[500],
      dark: grey[900],
      light: grey[300],
      contrastText: "#ffffff"
    }
  }
});

export default customTheme;
