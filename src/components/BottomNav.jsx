import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FolderIcon from '@mui/icons-material/Folder';
import DialpadIcon from '@mui/icons-material/Dialpad';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function BottomNav() {
  const [value, setValue] = React.useState('Recents');
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <Box className="bottom-nav">
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Recents" value="/" icon={<RestoreIcon />} />
        <BottomNavigationAction label="contacts" icon={<AccountCircleIcon />} />
        <BottomNavigationAction label="Keypad" icon={<DialpadIcon />} />
        <BottomNavigationAction label="Archive" value="/archive" icon={<FolderIcon />} />
      </BottomNavigation>
    </Box>
  );
}
