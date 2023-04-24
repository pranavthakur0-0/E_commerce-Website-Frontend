import { Link } from "react-router-dom"
export default function Receipts(){
    return (<>
     <h1>We're sorry</h1>
            <p>When you have bought or returned something in store you´ll find it here</p>
            <Link to="/" className="universal_link">
            <button className="online_order_button">Go Back</button>
            </Link>
    </>)
}