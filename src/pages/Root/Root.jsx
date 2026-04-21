import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../../components/Layout/SideBar";
import Navbar from "../../components/Layout/NavBar";
import classes from './Root.module.css';

export default function RootPage() {
    const [sidebarOpen,setSidebarOpen] = useState(true);

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
