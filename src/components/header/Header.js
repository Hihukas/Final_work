import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {NavLink} from "react-router-dom";
import {Avatar} from "@mui/material";
import {useState} from "react";
import LanguageSwitcher from "../languages/Languages";
import {useTranslation} from "react-i18next";

export default function NavTabs() {
    const logo = require('../../static/images/logo/construction.png');
    const [value, setValue] = useState(0);
    const {t} = useTranslation('header');

    const handleChange = (event, value) => {
        setValue(value)
    };

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
                    sx={{height: '48px', pl: '20px', ":hover": {transform: 'scale(1.05)'}}}
                    onClick={() => setValue(0)}/>

            <Box sx={{width: '100%', pr: '60px', pl: '88px'}}>

                <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" indicatorColor="primary"
                      textColor="inherit" centered>
                    <Tab label={t('home')} to="/" component={NavLink}/>
                    <Tab label={t('addNewProject')} to="/project" component={NavLink}/>
                    <Tab label={t('login')} to="/login" component={NavLink}/>
                </Tabs>

            </Box>

            <LanguageSwitcher/>

        </Box>

    );
}