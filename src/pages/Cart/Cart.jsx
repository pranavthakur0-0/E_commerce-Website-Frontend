import './Cart.scss'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useContext, useEffect, useRef,useState} from 'react'
import { Usercontext } from '../../context/authlogin'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { HiOutlineChevronDown } from "react-icons/hi2";

export default function Cart(){
    const {navHeight, cartdata, setcartdata, cookie, cookiehead}= useContext(Usercontext);
    const [cookies] = useCookies(['Wedesgin_loggedIn_permanent']);
    const [isloading, setloading] = useState(false);
    const [totalAmt, setotalAmt] = useState(0);

    useEffect(()=>{
        if(cartdata && cartdata.length>0){
            let newTotalAmt = 0;
            cartdata.forEach((item)=>{
                newTotalAmt += (item.count * item.price);
            });
            setotalAmt(newTotalAmt);
        } else {
            setotalAmt(0);
        }
    },[cartdata]);

    useEffect(()=>{
        async function fetchBag(){
            const headers = { [cookiehead]: cookie };
            if(headers && cookie && cookiehead){
            try{
                const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bag_item`,{headers});
                if(data){
                    setcartdata(data.data);
                }
            }catch(err){
                console.log(err);
            }
        }
    }
        fetchBag();
    },[cookies.Wedesgin_loggedIn_permanent, setcartdata, cookie, cookiehead])


    useEffect(()=>{
            const timeout = setTimeout(()=>{
                if(cartdata){
                    setloading(true);
                }
            },700);
            return ()=>clearTimeout(timeout);
    },[cartdata])

    return (<>
        <Navbar></Navbar>
        <div className="main_in_cart"  style={{ paddingTop: `${navHeight}px` }}>
            <div className="in_cart_width">
            <div className="fav_con_page_msg">
                                <div className="fav_msg_con">Estimated delivery time: 2-7 days</div>
                                <div className="fav_msg_con">Download the H&M App</div>
            </div>
            <h1>Shopping bag</h1>
            <div className="in_cart_item_check">
                <div className="in_cart_items">
                    {isloading ? <ProductItems item={cartdata}/> : <SkeletonBag />}
                </div>
                <div className="in_cart_checkout">
                    <div className="discount">Discounts <div>Apply discount</div></div>
                    <div className="line_con">
                        <div className="line"></div>
                    </div>
                    {totalAmt ? <div className='order_Delivery'>
                    <div className="order">Order value  <div>{totalAmt}</div></div>
                    <div className="order">Delivery  <div>{totalAmt > 500 ? "Free" : "Rs. 50"}</div></div>
                    </div> : ""}
                    <div className="line_con" >
                        <div className="line"style={{backgroundColor : "black"}}></div>
                    </div>
                    <div className="total">Total <div>Rs. {(totalAmt === 0 || totalAmt > 500) ? totalAmt : totalAmt+50}</div></div>
                    <div className="checkOut">
                    <button>Continue to Checkout</button>
                    </div>
                    <div className="accept">
                    We accept 
                    </div>
                    <div className="text">
         
                    Cash on Delivery
                    <svg className="icon" viewBox="0 0 39 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false" role="img" aria-labelledby="id-mastercard"><title id="id-mastercard">Mastercard</title><path d="M32.1 17.12v-.39h-.076l-.089.268-.087-.268h-.077v.39h.054v-.294l.083.254h.056l.082-.255v.295h.054zm-.484 0v-.324h.098v-.066h-.25v.066h.098v.324h.054z" fill="#F79410"></path><path fill="#FF5F00" d="M22.82 18.08H16.1V5.92h6.72z"></path><path d="M16.456 12a7.864 7.864 0 0 1 2.99-6.183 7.773 7.773 0 0 0-4.839-1.682C10.284 4.135 6.78 7.656 6.78 12s3.505 7.864 7.828 7.864a7.773 7.773 0 0 0 4.839-1.681A7.864 7.864 0 0 1 16.456 12" fill="#EB001B"></path><path d="M32.42 12c0 4.343-3.553 7.864-7.936 7.864a7.951 7.951 0 0 1-4.905-1.681A7.825 7.825 0 0 0 22.61 12a7.825 7.825 0 0 0-3.031-6.183 7.951 7.951 0 0 1 4.905-1.682c4.383 0 7.936 3.521 7.936 7.865" fill="#F79E1B"></path></svg>
                    <svg className="icon" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false" role="img" aria-labelledby="id-visa"><title id="id-visa">VISA</title><path d="M15.67 6.21 11 17.82H7.88L5.56 8.56a1.26 1.26 0 0 0-.69-1A11.74 11.74 0 0 0 2 6.55l.07-.34H7A1.37 1.37 0 0 1 8.36 7.4l1.22 6.71 3-7.9Zm12 7.82c0-3.06-4.11-3.23-4.08-4.6 0-.42.4-.86 1.24-1a5.27 5.27 0 0 1 2.91.57l.51-2.46A7.42 7.42 0 0 0 25.53 6c-2.87 0-4.9 1.58-4.91 3.84 0 1.67 1.44 2.6 2.54 3.16s1.52.93 1.51 1.44c0 .78-.9 1.12-1.74 1.13a5.85 5.85 0 0 1-3-.73l-.52 2.54a8.32 8.32 0 0 0 3.23.62c3.06 0 5.06-1.56 5.07-4m7.59 3.79H38L35.65 6.21h-2.48a1.35 1.35 0 0 0-1.24.85l-4.37 10.76h3.06l.61-1.74H35Zm-3.25-4.11 1.53-4.36.89 4.36ZM19.82 6.21l-2.4 11.61h-2.91l2.41-11.61Z" fill="#1434cb"></path></svg>
                    <svg className='icon' viewBox="0 0 46 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false" role="img" aria-labelledby="id-rupay"><title id="id-rupay">RuPay</title><g fillRule="nonzero" fill="none"><path d="M42.97 7.488l2.509 4.981-5.274 4.984z" fill="#008C44"></path><path d="M41.233 7.488l2.505 4.981-5.27 4.984z" fill="#F47920"></path><path d="M1.01 15.64L3.511 6.63h4c1.25 0 2.084.198 2.509.605.422.405.503 1.065.249 1.993-.154.547-.388 1.005-.709 1.368-.318.363-.738.65-1.255.861.438.106.718.315.843.63.124.313.11.771-.041 1.372l-.305 1.258v.035c-.088.352-.062.54.08.556l-.091.334H6.085c.01-.212.026-.402.044-.561.02-.163.044-.29.068-.376l.252-.9c.127-.468.135-.794.017-.982-.119-.193-.385-.288-.806-.288H4.523l-.867 3.107H1.01zm4.076-5.137h1.218c.426 0 .741-.061.935-.187.195-.127.34-.342.425-.653.088-.315.067-.535-.06-.66-.126-.128-.427-.19-.901-.19H5.555l-.47 1.69zM17.693 8.99l-1.844 6.65h-2.24l.275-.974c-.394.388-.798.682-1.205.87-.403.191-.83.285-1.278.285-.37 0-.688-.067-.945-.2a1.293 1.293 0 01-.582-.602c-.115-.234-.165-.522-.146-.866.021-.34.14-.91.363-1.711l.955-3.451h2.451l-.953 3.434c-.14.503-.173.856-.105 1.049.07.194.26.294.566.294.31 0 .569-.112.783-.34.218-.226.386-.563.512-1.012l.946-3.425h2.447zM16.804 15.64l2.499-9.011h3.437c.759 0 1.346.045 1.764.143.418.094.746.247.99.462.304.282.491.631.568 1.05.073.419.03.906-.129 1.479-.28 1.007-.77 1.78-1.47 2.319-.701.532-1.569.8-2.605.8H20.25l-.764 2.759h-2.682zm4.055-4.96h.864c.559 0 .952-.068 1.182-.202.223-.134.381-.374.478-.715.096-.346.071-.587-.075-.722-.14-.134-.499-.202-1.073-.202h-.863l-.513 1.842zM28.817 15.64l.025-.63c-.395.295-.796.519-1.198.658-.401.143-.828.215-1.285.215-.694 0-1.178-.189-1.458-.554-.277-.366-.322-.89-.133-1.56.18-.662.501-1.149.965-1.46.46-.315 1.23-.54 2.31-.684.137-.023.32-.04.55-.068.798-.093 1.246-.305 1.343-.652.05-.19.02-.33-.098-.417-.114-.089-.327-.133-.634-.133-.255 0-.46.053-.628.163a.984.984 0 00-.378.5h-2.39c.216-.748.657-1.313 1.319-1.692.66-.385 1.529-.57 2.606-.57.506 0 .96.048 1.36.15.402.099.696.24.886.41.235.211.373.453.413.72.046.267-.004.65-.144 1.15l-1.028 3.707a.738.738 0 00-.022.328.395.395 0 00.135.232l-.055.188h-2.461zm.596-2.969c-.26.105-.599.205-1.02.315-.66.177-1.031.414-1.111.706-.056.188-.034.333.058.443.091.105.248.157.47.157.407 0 .734-.102.977-.306.245-.205.427-.528.555-.974.022-.095.042-.163.054-.214l.017-.127zM31.297 18.261l.544-1.968h.701c.235 0 .419-.046.55-.13.132-.088.222-.236.274-.435.026-.087.042-.18.053-.284.007-.111.007-.228 0-.364l-.374-6.09h2.48l-.038 4.036 2.166-4.035h2.308l-3.83 6.618c-.434.74-.75 1.247-.95 1.525a3.178 3.178 0 01-.568.63c-.237.2-.5.341-.785.424-.286.084-.72.126-1.305.126a16.507 16.507 0 01-1.227-.053" fill="#1B3281"></path></g></svg>
                    <svg className='icon' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false" role="img" aria-labelledby="id-upi"><title id="id-upi">UPI</title><g transform="matrix(.06375 0 0 -.06464 -1.864 18.621)"><path fill="#696a6a" d="M33.977 61.067h2.77l-2.574-10.75c-.382-1.596-.31-2.797.218-3.598.526-.802 1.505-1.203 2.936-1.203 1.422 0 2.588.401 3.499 1.203.912.801 1.559 2.002 1.94 3.597l2.574 10.751h2.806L45.509 50.05c-.573-2.394-1.594-4.186-3.056-5.374-1.463-1.19-3.381-1.784-5.754-1.784-2.375 0-4.004.593-4.891 1.778-.888 1.184-1.043 2.978-.468 5.38zm13.796-17.704 4.406 18.405 8.372-10.823a17.354 17.354 0 0 0 1.358-2.152l2.94 12.274h2.592l-4.403-18.39-8.548 11.015a10.15 10.15 0 0 0-1.189 1.982l-2.947-12.31zm19.439 0 4.238 17.704h2.804l-4.237-17.704zm6.837 0 4.238 17.704h9.63l-.585-2.442h-6.825l-1.057-4.414h6.825l-.604-2.527h-6.826l-1.991-8.32zm12.72 0 4.238 17.704h2.804l-4.237-17.704zm6.837 0 4.238 17.704h9.63l-.586-2.442h-6.825L99 54.187h6.825l-.604-2.528h-6.825l-1.37-5.72h6.825l-.616-2.576zm16.276 2.601h2.358c1.296 0 2.29.089 2.98.266a5.61 5.61 0 0 1 1.907.895 7.492 7.492 0 0 1 1.978 2.134c.529.85.93 1.84 1.2 2.97.269 1.129.343 2.117.22 2.966-.122.852-.44 1.563-.955 2.136-.387.418-.898.718-1.536.896-.64.176-1.68.265-3.125.265h-2.028zm-3.427-2.601 4.238 17.705h3.783c2.46 0 4.16-.126 5.102-.38.94-.255 1.717-.681 2.328-1.277.81-.782 1.327-1.786 1.549-3.01.22-1.226.143-2.625-.233-4.197s-.967-2.965-1.773-4.178a10.608 10.608 0 0 0-2.987-3.005 9.18 9.18 0 0 0-2.881-1.277c-1.025-.253-2.553-.381-4.59-.381h-.754zm30.425 10.303h.72c1.555 0 2.634.175 3.236.521.603.346 1.008.959 1.218 1.838.226.943.109 1.609-.353 1.995-.462.387-1.434.582-2.92.582h-.72zm-.741-2.356-1.902-7.947h-2.628l4.239 17.704h4.243c1.257 0 2.166-.07 2.726-.211.558-.14 1.019-.373 1.383-.696.443-.411.734-.965.874-1.662.139-.698.109-1.466-.091-2.303a7.135 7.135 0 0 0-1.016-2.323c-.476-.709-1.034-1.266-1.672-1.668a5.366 5.366 0 0 0-1.715-.689c-.627-.138-1.568-.205-2.825-.205h-.553zm12.307-.994h4.809l-.803 4.04a16.478 16.478 0 0 0-.167 2.008 19.99 19.99 0 0 0-1.105-2.008zm6.092-6.953-.867 4.56h-6.837l-3.095-4.56h-2.945l12.76 18.405 3.942-18.405zm6.978 0 1.938 8.103-3.512 9.601h2.947l2.18-6.01a15.967 15.967 0 0 0 .381-1.415c.176.282.357.55.538.8s.364.478.55.688l5.132 5.937h2.806l-8.24-9.6-1.939-8.104zm26.764 8.744c.001.137.041.515.12 1.136.06.516.106.944.14 1.283a11.214 11.214 0 0 0-.59-1.21 14.258 14.258 0 0 0-.784-1.234l-6.773-9.433-2.21 9.626c-.094.396-.166.78-.214 1.15s-.08.737-.097 1.101c-.096-.372-.218-.76-.367-1.168a15.425 15.425 0 0 0-.536-1.276l-3.938-8.719h-2.58l8.495 18.455 2.418-11.175c.035-.177.086-.472.148-.883.062-.41.135-.919.22-1.523.286.508.698 1.152 1.24 1.934.144.21.254.371.328.484l7.647 11.163-.245-18.455h-2.606zm4.662-8.744 4.239 17.704h9.63l-.585-2.442H199.4l-1.062-4.438h6.825l-.604-2.528h-6.826l-1.37-5.72h6.826l-.618-2.576zm12.849 0 4.406 18.405 8.372-10.823a17.354 17.354 0 0 0 1.358-2.152l2.939 12.274h2.594l-4.404-18.39-8.548 11.015a10.15 10.15 0 0 0-1.189 1.982l-2.947-12.31zm28.619 15.262-3.653-15.262h-2.805l3.652 15.262h-4.585l.585 2.442h11.952l-.584-2.442zm2.911-11.718 2.494 1.063c.025-.789.27-1.392.735-1.807.466-.416 1.14-.623 2.021-.623.832 0 1.552.238 2.156.714.605.475 1.004 1.112 1.195 1.91.25 1.041-.372 1.968-1.857 2.781-.208.121-.368.21-.478.267-1.675.951-2.737 1.812-3.185 2.582-.447.77-.539 1.711-.273 2.823.345 1.443 1.103 2.612 2.272 3.507 1.17.895 2.527 1.343 4.076 1.343 1.273 0 2.278-.252 3.013-.756.736-.505 1.156-1.228 1.26-2.17l-2.469-1.162c-.214.556-.496.963-.846 1.222-.35.258-.795.387-1.328.387-.754 0-1.402-.203-1.943-.604a2.776 2.776 0 0 1-1.054-1.622c-.254-1.064.483-2.055 2.212-2.974l.312-.17c1.513-.805 2.497-1.594 2.948-2.364.452-.77.541-1.732.264-2.884-.4-1.678-1.234-3.01-2.5-3.997s-2.776-1.48-4.527-1.48c-1.47 0-2.592.345-3.364 1.04-.774.692-1.152 1.683-1.134 2.974m20.725-3.544 4.238 17.704h2.805l-4.238-17.704zm6.837 0 4.406 18.405 8.372-10.823a17.354 17.354 0 0 0 1.358-2.152l2.939 12.274h2.593l-4.403-18.39-8.548 11.015a10.352 10.352 0 0 0-1.19 1.982l-2.946-12.31zm28.619 15.262-3.654-15.262h-2.804l3.652 15.262h-4.585l.585 2.442h11.952l-.584-2.442zm3.054-15.262 4.238 17.704h9.63l-.584-2.442h-6.825l-1.063-4.438h6.825l-.605-2.528h-6.825l-1.37-5.72h6.826l-.617-2.576zm18.086 10.16h.508c1.484 0 2.513.175 3.085.53.572.356.968.984 1.182 1.888.234.974.138 1.662-.291 2.06-.425.402-1.346.6-2.76.6h-.508zm-.712-2.238-1.897-7.921h-2.628l4.239 17.704h3.913c1.147 0 2.019-.076 2.614-.23.596-.153 1.076-.406 1.439-.762.432-.426.712-.98.842-1.657.127-.676.094-1.418-.098-2.223-.34-1.42-.94-2.53-1.8-3.333-.86-.801-1.961-1.284-3.304-1.444l4.014-8.055h-3.172l-3.844 7.922zm8.996-7.922 4.238 17.704h9.63l-.584-2.442h-6.826l-1.057-4.414h6.826l-.605-2.527h-6.825l-1.992-8.32zm17.119 6.953h4.81l-.803 4.04c-.04.257-.074.553-.105.888-.03.335-.05.708-.062 1.12a19.604 19.604 0 0 0-1.106-2.007zm6.093-6.953-.867 4.56h-6.837l-3.095-4.56h-2.946l12.76 18.405 3.943-18.405zm21.218 13.4a6.19 6.19 0 0 1-2.143 1.56c-.8.345-1.688.52-2.663.52-1.885 0-3.57-.621-5.048-1.862-1.481-1.242-2.457-2.85-2.93-4.826-.457-1.911-.258-3.486.596-4.727.854-1.242 2.158-1.864 3.909-1.864 1.023 0 2.039.186 3.05.557 1.012.37 2.033.93 3.06 1.682l-.779-3.254a10.776 10.776 0 0 0-2.76-1.245 10.762 10.762 0 0 0-2.987-.411c-1.32 0-2.488.22-3.5.665a6.046 6.046 0 0 0-2.484 1.959c-.638.846-1.047 1.843-1.222 2.993-.178 1.148-.111 2.372.199 3.67s.83 2.517 1.555 3.658a12.426 12.426 0 0 0 2.68 3.005 11.92 11.92 0 0 0 3.42 1.978c1.216.446 2.469.67 3.758.67 1.014 0 1.944-.151 2.79-.454a7.408 7.408 0 0 0 2.349-1.373zm.271-13.4 4.238 17.704h9.63l-.585-2.442h-6.824l-1.063-4.438h6.825l-.605-2.528h-6.825l-1.369-5.72h6.825l-.617-2.576z"></path><path fill="#66686c" d="M316.46 76.495h-19.283l26.818 96.855h19.284zm-10.011 93.793c-1.337 1.843-3.399 2.773-6.2 2.773h-106.04l-5.252-18.97h19.294v.011h77.17l-5.615-20.272h-77.17l.006.042h-19.286l-16.007-57.787h19.296l10.742 38.786h86.746c2.71 0 5.26.924 7.657 2.772 2.393 1.85 3.968 4.131 4.723 6.855l10.741 38.794c.784 2.815.513 5.151-.809 6.996m-150.33-87.747a8.86 8.86 0 0 0-8.538-6.488H48.085c-2.711 0-4.726.924-6.051 2.77-1.324 1.848-1.608 4.134-.851 6.857l24.276 87.387h19.3l-21.682-78.05h77.206l21.683 78.05h19.297z"></path><path fill="#27803b" d="m376.59 173.17 24.414-48.553-51.322-48.54z"></path><path fill="#e9661c" d="m359.47 173.17 24.396-48.553-51.343-48.54z"></path></g></svg>
                    </div>
                    <br />
                    <p>Prices and delivery costs are not confirmed until you've reached the checkout.</p>
                    <br />
                    <p>30 days withdrawal and free returns. Read more about return and refund policy.</p>
                    <br />
                    <p>Customers would receive an SMS/WhatsApp notifications regarding deliveries on the registered phone number</p>
                </div>
            </div>
            </div>
        </div>
        <Footer></Footer>
    </>)
}


function SkeletonBag(){
    return (<>
            <div className="skeleton_page_bag">
                <div className="skin_img"></div>
                <div className="skin_text">
                    <div className="name_delete">
                        <div className="skin_heading"></div>
                        <div className="skin_delete"></div>
                    </div>
                    <div className="price"></div>
                    <div className="details">
                        <div className="subdetails">
                            <div></div>
                            <div></div>
                        </div>
                        <div className="subdetails">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="details">
                        <div className="subdetails">
                            <div></div>
                            <div></div>
                        </div>
                        <div className="subdetails">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="fav_num">
                        <div className="fav"></div>
                        <div className="fav"></div>
                    </div>
                </div>
            </div>
            <div className="skeleton_page_bag">
                <div className="skin_img"></div>
                <div className="skin_text">
                    <div className="name_delete">
                        <div className="skin_heading"></div>
                        <div className="skin_delete"></div>
                    </div>
                    <div className="price"></div>
                    <div className="details">
                        <div className="subdetails">
                            <div></div>
                            <div></div>
                        </div>
                        <div className="subdetails">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="details">
                        <div className="subdetails">
                            <div></div>
                            <div></div>
                        </div>
                        <div className="subdetails">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className="fav_num">
                        <div className="fav"></div>
                        <div className="fav"></div>
                    </div>
                </div>
            </div>
    </>)
}




function ProductItems(props){
    return (<>
            {props.item.length!==0 ? props.item.map((item,index)=>{
                return (<Product key={index} item={item} index={index} props={props}></Product>)
            }) : <div className="In_cart_page_empty_cart">
                <h2>YOUR SHOPPING BAG IS EMPTY!</h2>
                <h4>Your shopping bag is empty</h4>
            </div>
             }
    </>)
}


function Product({item, index}){   
    const [hover, sethover] = useState();
    const {setfav, setgetbagcount, cartdata, setcartdata, cookie, cookiehead} = useContext(Usercontext);
    const [countval, secountval] = useState(item.count);
    const [show, setshow] = useState(false);
    const isInitialRender = useRef(true);

    useEffect(()=>{
        if (isInitialRender.current) {
            isInitialRender.current = false;
          } 
        else {  
            
            if(countval > 0 ){
                // Side effect code here
                async function changeProductCount()
                {
                    const size  = item.size;
                    const productId  = item._id;
                    const headers = { [cookiehead]: cookie };
                    if(headers && cookie && cookiehead){
                    try{
                         await axios.post(`${process.env.REACT_APP_SERVER_URL}/bag_item/count`,{productId,size, countval},{headers});
                    }catch(err){
                        console.log(err);
                    }
                  }
                }
               changeProductCount();
            const countchange = cartdata.map(product=>{
                if(product._id=== item._id && item.size === product.size){
                    return { ...product,  count: countval };
                }else {
                    return product;
                  }
                })
                setcartdata(countchange);
            }
        }

        // eslint-disable-next-line
    },[countval]);
    
   
    async function DeleteItem(){
        const size  = item.size;
        const productId  = item._id;
        const headers = { [cookiehead]: cookie };
        if(headers && cookie && cookiehead){
        try{
            const data = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/bag_item/${productId}/${size}`,{headers});
            if(data.status === 200){
                setgetbagcount(cur=>!cur);
                const filteredBagItems = cartdata.filter(item => {
                    return !(item._id === productId && item.size === size);
                  });
                setcartdata(filteredBagItems);
            }
           }catch(err){
            console.log(err);
           }
        }
         }
          async function addToFav(){
              const ItemId = item._id;
              const headers = { [cookiehead]: cookie };
              if(headers && cookie && cookiehead){
                  try{
                    const data = await axios.post(`${process.env.REACT_APP_SERVER_URL}/fav_products`,{ItemId},{headers});
                    if(data){
                      setfav(data.data.fav);
                      DeleteItem();
                    }
                  }catch(err){
                    console.log(err);
                  }
                }
              }
                
           function FavAndDelete (){
                    addToFav();
                    const filteredBagItems = cartdata.filter(product => product._id !== item.id && product.size !== item.size);
                    setcartdata(filteredBagItems);
            }

return (< div key={index} className="main_product_incart">
<img className='main_product_incart_image' src={item.image[0]} alt={index} />
<div className="main_product_incart_text">
    <div className="name_delete">
    <h2>{item.name}</h2>
    <svg onClick={e=>DeleteItem(item)} className="skin_delete" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false"><path fillRule="evenodd" d="M14 4v1h-1v10.455c0 .3-.224.545-.5.545h-11c-.276 0-.5-.244-.5-.545V5H0V4h14zm-2 1v10H2V5h10zM9.5 0a.5.5 0 01.5.5V2h4v1H0V2h4V.5a.5.5 0 01.5-.5h5zM9 1H5v1h4V1zM5 8h1v4H5V8zm3 0h1v4H8V8z"></path></svg>
    </div>

    <h4>Rs. {item.price}</h4>
    <div className="details">
        <p>Art No. : {item._id}</p> 
        <p>Size : {item.size}</p>
    </div>
    <div className="details">
        <p>Color : {item.color}</p> 
        <p>Total : {item.price*countval}</p>
    </div>
    <div className="button_wrapper">
        <button onClick={e=>FavAndDelete(item,item._id)} className='shift_fav' onMouseEnter={e=>sethover(true)} onMouseLeave={e=>sethover(false)}><svg className="uni_fav_icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false"><path className="innerElement" fill={hover ? "#e50010" : "none"} d="M17.376 1C21.476 1 24 3.556 24 7.748c0 1.614-.961 3.598-2.696 5.9-.89 1.183-1.97 2.425-3.196 3.705a71.38 71.38 0 0 1-3.987 3.832 71.307 71.307 0 0 1-1.816 1.566L12 23l-.305-.25a71.307 71.307 0 0 1-1.816-1.565 71.38 71.38 0 0 1-3.987-3.832c-1.227-1.28-2.305-2.522-3.196-3.704C.961 11.346 0 9.362 0 7.748 0 3.556 2.524 1 6.624 1c2.08 0 4.23 1.548 5.376 3.548C13.145 2.548 15.294 1 17.376 1z"></path>
        <path fill={hover ? "#e50010" : "black"} className="outerElement" d="M17.376 1C21.476 1 24 3.578 24 7.807c0 1.628-.961 3.63-2.696 5.953-.89 1.192-1.97 2.446-3.196 3.737a71.66 71.66 0 0 1-3.987 3.865 71.495 71.495 0 0 1-1.816 1.58l-.305.251-.305-.252c-.093-.076-.264-.22-.503-.424-.396-.34-.838-.727-1.313-1.155a71.66 71.66 0 0 1-3.987-3.865c-1.227-1.291-2.305-2.545-3.196-3.737C.961 11.437 0 9.435 0 7.807 0 3.578 2.524 1 6.624 1c2.08 0 4.23 1.562 5.376 3.58C13.145 2.56 15.294 1 17.376 1zM12 21.79l.18-.154c.383-.329.812-.704 1.273-1.12a69.488 69.488 0 0 0 3.865-3.746c1.18-1.244 2.217-2.448 3.068-3.587 1.593-2.132 2.462-3.943 2.462-5.286 0-3.64-2.063-5.747-5.565-5.747-1.927 0-4.049 1.768-4.842 3.843L12 7.145l-.44-1.152C10.765 3.919 8.642 2.15 6.716 2.15c-3.502 0-5.565 2.107-5.565 5.747 0 1.343.87 3.154 2.462 5.286.85 1.14 1.887 2.343 3.068 3.587a69.488 69.488 0 0 0 3.865 3.747A69.313 69.313 0 0 0 12 21.789z"></path></svg></button>
        <button className='button_amount' onClick={e=>setshow(true)} >{countval} 
        <HiOutlineChevronDown />
        <ul className={show ? "show" : "hide"} onClick={e=>{setshow(false);e.stopPropagation();}}>
            <li onClick={e=>secountval(1)}>1</li>
            <li onClick={e=>secountval(2)}>2</li>
            <li onClick={e=>secountval(3)}>3</li>
            <li onClick={e=>secountval(4)}>4</li>
            <li onClick={e=>secountval(5)}>5</li>
            <li onClick={e=>secountval(6)}>6</li>
            <li onClick={e=>secountval(7)}>7</li>
            <li onClick={e=>secountval(8)}>8</li>
        </ul>
        </button>    

    </div>
</div>
</div>)
}