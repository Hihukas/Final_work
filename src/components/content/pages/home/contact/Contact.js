import Box from "@mui/material/Box";
import Information from "./Information";
import Email from "./Email";
import Map from "./Map";

export default () => {
    return (

        <Box sx={{
            width: '100%',
            height: '500px',
            backgroundColor: '#fff',
            position: 'relative',
            bottom: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <Map/>

            <Information/>

            <Email/>

        </Box>

    );
};