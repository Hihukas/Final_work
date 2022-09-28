import Box from "@mui/material/Box";
import Banner from "./banner/Banner";
import Contact from "./contact/Contact";
import AboutUs from "./aboutUs/AboutUs";
import Projects from "./projects/Projects";

export default () => {
    return (

        <Box>

            <Banner/>

            <AboutUs/>

            <Projects/>

            <Contact/>

        </Box>

    );
};