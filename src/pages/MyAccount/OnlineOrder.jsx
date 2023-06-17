import { Link } from "react-router-dom";
import "./OnlineOrder.scss";

export default function OnlineOrder({ order }) {
  return (
    <>
      {order && order.length > 0 ? (
        <div className="main_order_list">
          {order.map((item) => {
            console.log(item.cartdata);
            const lastElement = item.progress[item.progress.length - 1];
            const date = new Date(lastElement.timestamp);
            const formattedDate = date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            return (
              <article className="order_list_wrapper">
                <header className="header">
                  <h4>{lastElement && lastElement.status ? lastElement.status : ""}</h4>
                  <time dateTime={date.toISOString()}>
                    {lastElement && lastElement.status === "Cancelled" ? (
                      <s>{formattedDate}</s>
                    ) : (
                      formattedDate
                    )}
                  </time>
                </header>
                <header className="sub_header">
                        <h4>{item && item.cartdata ? item.cartdata.length : ""} items</h4>
                        <div className="price">{item && item.total ? lastElement.status ==="Cancelled" ? <s>item.total</s>  : item.total : ""}</div>
                </header>
                <div className="imager">
                              {item.cartdata && item.cartdata.map((cartItem, index) => {
                                    console.log(cartItem.image[0]);
                                    return <img src={cartItem.image[0]} alt={index} />;
                                })}

                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <>
          <h1>We're sorry</h1>
          <p>When you have bought something online, you'll find it here.</p>
          <Link to="/" className="universal_link">
            <button className="online_order_button">Continue shopping</button>
          </Link>
        </>
      )}
    </>
  );
}
