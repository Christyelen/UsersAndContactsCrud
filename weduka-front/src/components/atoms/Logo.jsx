// src/components/atoms/Logo.js
import React from "react";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box
      component="div"
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
    >
      <img src="/assets/weduka_logo.png" width={200} height={51} />
    </Box>
  );
};

export default Logo;
