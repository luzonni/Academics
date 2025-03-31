import { Outlet } from "react-router";


export default function DefaultPage() {
    return (
        <>  
            <h1>HEADER</h1>
            <Outlet/>
        </>
    )
}