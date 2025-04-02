import { Outlet } from "react-router";
import MyHeader from "../../components/myHeader";


export default function DefaultPage() {
    return (
        <main>  
            <MyHeader/>
            <Outlet/>
        </main>
    )
}