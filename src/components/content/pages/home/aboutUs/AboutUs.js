import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

export default () => {
    return (

    <Box sx={{
        width: '100%',
        height: '250px',
        position: 'relative',
        top: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }}>

        <Box>

            <Typography variant='h6' sx={{ml: '425px', width: '150px', display: 'flex', justifyContent: 'center', borderBottom: '2px solid #1565c0'}}>ABOUT US</Typography>

            <Typography sx={{display: 'flex', justifyContent: 'center', width: '1000px', pt: 1}}>
                Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
            </Typography>

        </Box>

    </Box>

    );
};