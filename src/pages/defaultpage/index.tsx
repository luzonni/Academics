import { Outlet } from "react-router";


export default function DefaultPage() {
    return (
        <main>  
            <h1>HEADER</h1>
            <Outlet/>
        </main>
    )
}