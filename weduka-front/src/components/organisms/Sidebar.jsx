// src/components/organisms/Sidebar.js
import React, { useState } from "react";
import { Drawer, List, ListItem, Button, Toolbar, Box } from "@mui/material";
import { Person, Contacts } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [openUsers, setOpenUsers] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const handleUsersClick = (path) => {
    router.push(path);
  };

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.main,
          color: "white",
          width: 230,
        },
      }}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 100,
        width: 230,
        flexShrink: 0,
      }}
    >
      <Toolbar />
      <List>
        <ListItem>
          <Button
            disableRipple
            onClick={() => handleUsersClick('/')}
            startIcon={<Person fontSize="small" />}
            sx={{
              color: "black",
              justifyContent: "flex-start",
              pr: 3,
              textAlign: "left",
              textTransform: "none",
              width: "100%",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
              },
              "& .MuiButton-startIcon": {
                color: "black",
              },
            }}
          >
            <Box sx={{ flexGrow: 1, color: "black" }}>{"Usuarios"}</Box>
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
