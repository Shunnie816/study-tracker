import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../index.css";

function Header() {
  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            color="inherit"
            variant="h6"
            component="a"
            href="/"
            sx={{
              textDecoration: "none",
            }}
          >
            Study Tracker
          </Typography>
          <div>
            <Button color="inherit">ログイン</Button>
            <Button color="inherit" href="/">
              記録する
            </Button>
            <Button color="inherit" href="/register">
              教材登録
            </Button>
            <Button color="inherit" href="/posts">
              学習記録
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
