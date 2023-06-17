import "./OrderConfirmed.scss"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useContext, useEffect } from "react";
import { Usercontext } from "../../context/authlogin";
import { useLocation } from "react-router-dom";
export default function OrderConfirmed(){
    const {navHeight, setgetbagcount} = useContext(Usercontext);
    const location = useLocation();
    const email = location.state;
    useEffect(()=>{
        setgetbagcount(cur=>!cur);
        // eslint-disable-next-line
    },[])
    return (<>
    <Navbar></Navbar>
        <div className="main_orderConfirmed" style={{paddingTop : `${navHeight}px`, paddingBottom : `${navHeight}px`}}>
            <div className="text">
            <h1>THANK YOU!</h1>
                <p>We are getting started on your order right away, and you will receive an order confirmation email shortly to <u>{email ? email : ""}</u>. In the meantime, explore the latest fashion and get inspired by new trends, just head over to We.Design Magazine</p>
                <div className="button_wrapper">
                    <button>VIEW ORDER CONFIRMATION</button>
                </div>

            </div>
               </div>
    <Footer></Footer>
    </>)
}