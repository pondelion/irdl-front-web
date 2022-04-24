import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { GlobalContext } from '../contexts/Contexts';


interface Props {};

const Header: React.FC<Props> = (props: Props) => {
  const gContextValue = React.useContext(GlobalContext);
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" sx={{ backgroundColor: 'primary.light' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 10 }}>
            IRDL
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {if (gContextValue.isSignedIn) {gContextValue.signOut()}}}>
              {gContextValue.isSignedIn ? 'SIGN OUT' : 'SIGN IN'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
};

export default Header;
