import * as React from "react";
import { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import Link from "next/link";
import { Container } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.secondary.light, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.light, 0.25)
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  },
  autoComplete: "nickname"
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: "static"
}));


const NavBar = ({ theme }) => {
  const [summonerName, setSummonerName] = useState("");
  const [host, setHost] = useState("kr");
  const router = useRouter();
  const summonerSearchOnChange = (e) => {
    setSummonerName(e.target.value);
  };

  const summonerSearchOnEnter = (e) => {
    if (e.key.toLowerCase() === "enter") {
      if (summonerName.replaceAll(" ", "") !== "") {
        router.push(`/user/${summonerName}?host=${host}`);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar>
        <Container>
          <Toolbar>
            <>{/* ADD ICON HERE */}</>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: "block" }}
            >
              <Link href="/" passHref>
                <a>PnPLoL</a>
              </Link>
            </Typography>

            {/* Search Input. Hide on xs. */}
            <Search sx={{ display: { xs: "none", sm: "block" } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="소환사명..."
                inputProps={{ "aria-label": "search" }}
                onChange={summonerSearchOnChange}
                onKeyPress={summonerSearchOnEnter}
              />
            </Search>
          </Toolbar>
        </Container>
      </StyledAppBar>
    </Box>
  );
};

export default NavBar;
