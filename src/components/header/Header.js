import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {NavLink, useNavigate} from "react-router-dom";
import {Avatar} from "@mui/material";
import LanguageSwitcher from "../languages/Languages";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../store/slices/user/userSlice";

export default function NavTabs() {
    const logo = require('../../static/images/logo/construction.png');
    const {t} = useTranslation('header');
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(removeUser());
        navigate("/");
    }

    return (

        <Box sx={{
            height: '100px',
            width: '100%',
            minWidth: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            position: 'fixed',
            opacity: '0.9',
            zIndex: 1
        }}>

            <Avatar variant="square" src={logo} to="/" component={NavLink}
                    sx={{height: '48px', pl: '20px', ":hover": {transform: 'scale(1.05)'}}}/>

            <Box sx={{
                width: '100%',
                pr: '60px',
                pl: '88px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>

                <Tab label={t('home')} to="/" component={NavLink} sx={{color: '#000000'}}/>
                {user?.roles.includes('ADMIN') &&
                    <Tab label={t('addNewProject')} to="/project" component={NavLink} sx={{color: '#000000'}}/>}
                {user ? <Tab label={t('logout')} onClick={onLogout} sx={{color: '#b71c1c'}}/> :
                    <Tab label={t('login')} to="/login" component={NavLink} sx={{color: '#009624'}}/>}

            </Box>

            <LanguageSwitcher/>

        </Box>

    );
}