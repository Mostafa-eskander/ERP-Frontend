import { Outlet } from "react-router-dom";

export default function RootPage() {
    return(
        <>
            <h1>Main Header</h1>
            <Outlet />
        </>
    )
}