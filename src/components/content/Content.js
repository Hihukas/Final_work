import {Route, Routes} from "react-router-dom";
import Login from "./pages/forms/Login";
import Project from "./pages/forms/Project";
import Registration from "./pages/forms/Registration";
import Box from "@mui/material/Box";
import Home from "./pages/home/Home";
import DetailedProject from "./pages/project/DetailedProject";
import SecuredRoute from "../security/SecuredRoute";

export default () => {
    return (
        <Box sx={{height: 'calc(100% - 150px)'}}>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/project" element={<SecuredRoute roles={['ADMIN']}/>}>
                    <Route path="/project" element={<Project/>}/>
                </Route>

                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/project/:projectId" element={<DetailedProject/>}/>
            </Routes>
        </Box>
    );
};