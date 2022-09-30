import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";

export default () => {
    const {t} = useTranslation('footer');

    return (

        <Box sx={{width: '100%', height: '50px', backgroundColor: '#1565c0', position: 'relative', bottom: '0'}}>

            <Typography align='center' sx={{pt: '10px', fontSize: "10px", color: "white"}}>
                {t('copyright')} © Construction.
            </Typography>

            <Typography align='center' sx={{fontSize: "10px", color: "white"}}>
                {t('allRightsReserved')}
            </Typography>

        </Box>

    );
};