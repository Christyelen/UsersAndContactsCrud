import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../organisms/Sidebar";
import Header from "../organisms/Header";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const ConsoleLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  paddingLeft: 300,
}));

export const MainLayout = ({ children }) => {
  return (
    <div>
      <ConsoleLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </ConsoleLayoutRoot>
      <Header />
      <Sidebar />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};
