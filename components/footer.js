import * as React from "react";
import { Box, CssBaseline, Link, Typography } from "@mui/material";
import { Container } from "@mui/system";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://www.hufspnp.com/">
        Passion&Pioneer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <footer>
      <Box>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">This is footer for PnPLoL.</Typography>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </footer>
  );
}

export default Footer;
