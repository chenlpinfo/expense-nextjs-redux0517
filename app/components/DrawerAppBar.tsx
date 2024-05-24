'use client';

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountMenu from './AccountMenu';
import { selectUserData } from '@/lib/features/user/userSlice';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const userData = useSelector(selectUserData);

  let navItems;

  userData
    ? (navItems = [
        { text: 'Home', href: '/' },
        { text: 'Expense', href: '/expense' },
        { text: 'Expense-Axios', href: '/expense-axios' },
        { text: 'Expense-useSWR', href: '/expense-useSWR' },
        { text: 'Others', href: '/others' },
        // { text: `${userData.username}`, href: '/user-detail' },
      ])
    : (navItems = [
        { text: 'Home', href: '/' },
        { text: 'Login', href: '/login' },
      ]);

  const menuStyle = {
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontWeight: 700,
    color: 'inherit',
    textDecoration: 'none',
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Expense App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} href={item.href}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component='nav'>
        <Toolbar>
          <IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Expense App
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'row' }}>
            {navItems.map((item) => (
              <Typography variant='h6' noWrap component='a' href={item.href} sx={menuStyle} key={item.text}>
                {item.text}
              </Typography>
            ))}
          </Box>

          {userData && <AccountMenu />}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component='main' sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
