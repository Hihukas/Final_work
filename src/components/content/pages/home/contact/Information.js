import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default () => {
    return (

        <Box sx={{minWidth: '250px'}}>

                <Typography variant='h6' align='center' sx={{borderBottom: '2px solid #1565c0', width: '175px', ml: '37.5px'}}>CONTACT US</Typography>

                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2}}>

                    <PhoneIcon color='primary'/>

                    <Typography sx={{pl: 1}}>+370 600 00000</Typography>

                </Box>

                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2}}>

                    <EmailIcon color='primary'/>

                    <Typography sx={{pl: 1}}>info@construction.eu</Typography>

                </Box>

                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2}}>

                    <HomeIcon color='primary'/>

                    <Typography sx={{pl: 1}}>Klaipėda, Lithuania</Typography>

                </Box>

                <Typography variant='h6' align='center' sx={{borderBottom: '2px solid #1565c0', width: '175px', ml: '37.5px', mt: 2}}>FOLLOW US</Typography>

                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2}}>

                    <Button sx={{p: 0, minWidth: '24px'}} href={"https://www.linkedin.com/"}>
                        <LinkedInIcon sx={{height: '40px', width: '40px'}}/>
                    </Button>

                    <Button sx={{p: 0, minWidth: '24px'}} href={"https://www.facebook.com/"}>
                        <FacebookIcon sx={{height: '40px', width: '40px'}}/>
                    </Button>

                    <Button sx={{p: 0, minWidth: '24px'}} href={"https://www.youtube.com/"}>
                        <YouTubeIcon sx={{color: '#ba000d', height: '40px', width: '40px'}}/>
                    </Button>

                </Box>

        </Box>

    );
};