import {Button} from "@mui/material";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";

export default () => {
    const {i18n} = useTranslation();

    return (
        <Box sx={{display: 'flex'}}>

            <Button sx={{maxHeight: '24px', minWidth: '24px', width: '24px', mr: '20px'}}
                    onClick={() => i18n.changeLanguage('en')}>
                <img src={require('../../static/images/languages/en.png')}/>
            </Button>

            <Button sx={{maxHeight: '24px', minWidth: '24px', width: '24px', pr: '20px'}}
                    onClick={() => i18n.changeLanguage('lt')}>
                <img src={require('../../static/images/languages/lt.png')}/>
            </Button>

        </Box>
    );
}