import { useContext, useEffect, useState } from "react"
import "./Order.scss"
import OnlineOrder from "./OnlineOrder.jsx"
//import Receipts from "./Receipts.jsx"
import axios from "axios"
import { Usercontext } from "../../context/authlogin"
export default function Offers(){

    const {cookie, cookiehead} = useContext(Usercontext);
    const [menu, setmenu] = useState(false);
    const [order, setorder] = useState([]);
    async function getorder(){
        const headers = { [cookiehead]: cookie };
      
        if(headers && cookie && cookiehead){
            try{
                const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getOrder`,{ withCredentials: true, headers });
                if(res.data.order){
                    setorder(res.data.order);
                }
            }catch(err){
                console.log(err);
            }
        }
    }
    useEffect(()=>{
        getorder();
        // eslint-disable-next-line
    },[ cookie, cookiehead])

    return (<>
            <div className="my_acc_offer_main">
                <div className="header">
                    <h3>My purchases</h3>
                </div>
                <div className="order_con">
                    <div className={menu ? "options" : "options selected-option"} onClick={e=>{setmenu(false)}} >
                        Online orders ({order && order.length > 0 ? order.length : 0})
                    </div>
                    <div className={menu ? "options selected-option" : "options"} onClick={e=>{setmenu(true)}}>
                        Store receipts (0)
                    </div>
                </div>
                <div className="order_selected">
                  <OnlineOrder order={order}></OnlineOrder>
                </div>
            </div>
    </>)
}