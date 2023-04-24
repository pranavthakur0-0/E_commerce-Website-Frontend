import { Link } from "react-router-dom"
export default function OnlineOrder(){
    return (<>
            <h1>We're sorry</h1>
            <p>When you have bought something online you´ll find it here.</p>
            <Link to="/" className="universal_link">
            <button className="online_order_button">Continue shopping</button>
            </Link>
    </>)
}