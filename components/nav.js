import { AppBar, Toolbar } from "@mui/material";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <AppBar position="static">
        <Toolbar>
          <Toolbar variant="h6"><Link href="/"><a>PnPLoL</a></Link></Toolbar>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default NavBar;
