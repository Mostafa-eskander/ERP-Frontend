import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "../../components/Layout/SideBar";
import Navbar from "../../components/Layout/NavBar";
import classes from './Root.module.css';

export default function RootPage() {
    const [sidebarOpen,setSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 750) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function toggleSidebar() {
        setSidebarOpen((prevSidebar) => !prevSidebar)
    }
    return(
        <div className={classes.layout}>
            <Sidebar sideBarMode={sidebarOpen} onSideBarOpen={toggleSidebar} />
            <div className={classes.mainContent}>
                <Navbar onSideBarOpen={toggleSidebar}  />
                <div className={sidebarOpen ? classes.pageContent : classes.pageAllWidth}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
