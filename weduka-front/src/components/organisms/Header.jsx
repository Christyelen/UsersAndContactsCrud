// src/components/organisms/Header.js
import React from "react";
import { AppBar, Toolbar, Container, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Logo from "../atoms/Logo";

const ConsoleNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderBottomColor: theme.palette.divider,
  borderBottomStyle: "solid",
  borderBottomWidth: 1,
  boxShadow: "none",
}));

const Header = () => {
  return (
    <ConsoleNavbarRoot>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 64 }}>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            sx={{ flexGrow: 1 }}
          >
            <Logo />
          </Box>
        </Toolbar>
      </Container>
    </ConsoleNavbarRoot>
  );
};

export default Header;
