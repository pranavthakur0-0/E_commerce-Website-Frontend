//import { useState } from "react";
import "./Dashboard.scss"
import { RxDashboard } from "react-icons/rx";
export default function DashBoard(){
   // const [tab, settab] = useState('dashboard');
    const tab = 'dashboard';
    return (<>
        <div className="main_DashBoard_wrapper">
            <div className="nav">
                <div className="logo">We.</div>
                <div className="side_bar_logo">
                    <div className={tab === "dashboard" ? "selected_icon icons" : "icons"}  title="Dashboard">
                        <RxDashboard />
                    </div>
               
                </div>
            </div>
            <div className="dash"></div>
        </div>
    </>)
}