import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import NotFound from "./pages/notfound";
import Table from "./pages/table";
import Reset from "./reset";
import DefaultPage from "./pages/defaultpage";
import InserPage from "./pages/insetPage";


export function AppRouter() {
    return(
        <BrowserRouter>
            <Reset/>
            <Routes>
                <Route path="/" element={<DefaultPage/>}>
                    <Route index element={<Home/>}/>
                    <Route path="tables" element={<Table/>}/>
                    <Route path="insert" element={<InserPage/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}