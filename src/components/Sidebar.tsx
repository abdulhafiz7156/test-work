import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Input,
    List,
    ListItem,
    ListItemButton,
    ListItemContent,
    Sheet,
    Typography,
} from '@mui/joy';
import {
    SearchRounded as SearchIcon,
    HomeRounded as HomeIcon,
    ShoppingCartRounded as CartIcon,
    LogoutRounded as LogoutIcon,
} from '@mui/icons-material';

export default function Sidebar() {
    const [userData, setUserData] = useState<{ name?: string; email?: string; picture?: string; }>({});

    useEffect(() => {
        const savedData = Cookies.get('formData');
        setUserData(JSON.parse(savedData));

        console.log(userData);

    }, []);

    const handleLogout = () => {
        // Remove user data cookies
        Cookies.remove('formData');
        window.location.href = '/signup';
    };

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: { xs: 'fixed', md: 'sticky' },
                transform: { xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))', md: 'none' },
                transition: 'transform 0.4s, width 0.4s',
                zIndex: 10000,
                height: '100dvh',
                width: 'var(--Sidebar-width)',
                top: 0,
                p: 2,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRight: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Input size="sm" startDecorator={<SearchIcon />} placeholder="Search" />
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <List size="sm" sx={{ gap: 1, '--List-nestedInsetStart': '30px' }}>
                    <ListItem>
                        <ListItemButton>
                            <HomeIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Home</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton selected>
                            <CartIcon />
                            <ListItemContent>
                                <Typography level="title-sm">Orders</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Avatar
                    variant="outlined"
                    size="sm"
                    src={userData.picture}
                />
                <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography level="title-sm">
                        {userData.name || 'Guest User'}
                    </Typography>
                    <Typography level="body-xs">
                        {userData.email || 'No email provided'}
                    </Typography>
                </Box>
                <IconButton size="sm" variant="plain" onClick={handleLogout}>
                    <LogoutIcon />
                </IconButton>
            </Box>
        </Sheet>
    );
}