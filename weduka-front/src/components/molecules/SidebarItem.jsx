import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const SidebarItem = ({ text, onClick }) => {
  return (
    <ListItem button onClick={onClick}>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default SidebarItem;
