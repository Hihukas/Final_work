import Box from "@mui/material/Box";
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';

export default () => {
    return (

        <Box sx={{
            width: '100%',
            height: '1000px',
        }}>

            <Card sx={{minWidth: 300, flexGrow: 1, height: '1000px'}}>

                <CardCover>

                    <video
                        autoPlay
                        loop
                        muted
                    >

                        <source
                            src={require('../../../../../static/video/banner/banner.mp4')}
                            type="video/mp4"
                        />

                    </video>

                </CardCover>

            </Card>

        </Box>

    );
};