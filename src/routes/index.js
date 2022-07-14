import {BrowserRouter, Route, Routes} from "react-router-dom";

import Login from "../pages/login";
import Dashboard from '../pages/dashboard';
import Register from "../components/Tabs/Register";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/dashboard/:walletAddress" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    );
}