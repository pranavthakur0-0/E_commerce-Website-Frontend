import './Cart.scss'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useContext, useEffect, useState} from 'react'
import { Usercontext } from '../../context/authlogin'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { HiOutlineChevronDown } from "react-icons/hi2";

export default function Cart(){
    const {navHeight, cartdata, setcartdata, cookie, cookiehead}= useContext(Usercontext);
    const [cookies] = useCookies(['Wedesgin_loggedIn_permanent']);
    const [isloading, setloading] = useState(false);
    
    useEffect(()=>{
        async function fetchBag(){
            const headers = { [cookiehead]: cookie };
            if(headers && cookie && cookiehead){
            try{
                const data = await axios.get("http://localhost:4000/api/server/bag_item",{headers});
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
                <div className="in_cart_checkout"></div>
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


function Product({item, index, props}){   
    const [hover, sethover] = useState();
    const {setfav, setgetbagcount, cartdata, setcartdata, cookie, cookiehead} = useContext(Usercontext);
    const [countval, secountval] = useState(item.count);
    const [show, setshow] = useState(false);
   
    async function DeleteItem(){
        const size  = item.size;
        const productId  = item._id;
        const headers = { [cookiehead]: cookie };
        if(headers && cookie && cookiehead){
        try{
            const data = await axios.delete(`http://localhost:4000/api/server/bag_item/${productId}/${size}`,{headers});
            if(data.status === 200){
                setgetbagcount(cur=>!cur);
                const filteredBagItems = cartdata.filter(product => product._id !== item.id && product.size !== item.size);
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
                    const data = await axios.post(`http://localhost:4000/api/server/fav_products`,{ItemId},{headers});
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
                    console.log(filteredBagItems);
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
        </ul>
        </button>    

    </div>
</div>
</div>)
}