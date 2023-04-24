import { useState } from "react"
import "./Order.scss"
import OnlineOrder from "./OnlineOrder.jsx"
import Receipts from "./Receipts.jsx"
export default function Offers(){
    const [order, setorder] = useState(false);
    return (<>
            <div className="my_acc_offer_main">
                <div className="header">
                    <h3>My purchases</h3>
                </div>
                <div className="order_con">
                    <div className={order ? "options" : "options selected-option"} onClick={e=>{setorder(false)}} >
                        Online orders (0)
                    </div>
                    <div className={order ? "options selected-option" : "options"} onClick={e=>{setorder(true)}}>
                        Store receipts (0)
                    </div>
                </div>
                <div className="order_selected">
                    {order ? <Receipts></Receipts> :<OnlineOrder></OnlineOrder> }
                </div>
            </div>
    </>)
}