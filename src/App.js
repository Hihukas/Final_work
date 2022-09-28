import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import {BrowserRouter} from "react-router-dom";
import Box from "@mui/material/Box";
import store from "./store/store";
import {Provider} from "react-redux";

function App() {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <Box sx={{height: '100%'}}>
                <Header/>
                <Content/>
                <Footer/>
            </Box>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
