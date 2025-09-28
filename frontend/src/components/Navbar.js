import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { People, Add } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <People sx={{ mr: 2 }} />
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          Data Dock
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            startIcon={<People />}
            onClick={() => navigate('/users')}
            sx={{
              backgroundColor: isActive('/users') ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            {isMobile ? 'Users' : 'User List'}
          </Button>
          
          <Button
            color="inherit"
            startIcon={<Add />}
            onClick={() => navigate('/users/new')}
            sx={{
              backgroundColor: isActive('/users/new') ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            {isMobile ? 'Add' : 'Add User'}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
