import { useContext, useEffect, useState } from "react"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import "./fav_page.scss"
import { Usercontext } from "../../context/authlogin"
import axios from "axios"
import {MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./skeletonFav.scss"

export default function Favourites(){
    const navigate = useNavigate();
    const {navHeight, fav, setfavItems, setfav ,favItems, cookie, cookiehead} = useContext(Usercontext);
    const [loading, setloading] = useState(false);
    useEffect(()=>{
        async function getFav(){
 
            if(fav){
                try{
                    const product = await axios.post(`${process.env.REACT_APP_SERVER_URL}/fav_products/all`,{fav});
                    if(product){
                        setfavItems(product.data.Allproduct);
                    }
                }catch(err){
                    console.log(err);
                }
            }
        }
        getFav();
        // eslint-disable-next-line
    },[fav])


    async function getFav() {
      const headers = { [cookiehead]: cookie };
      if(headers && cookie && cookiehead){
        try {
          const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/fav_products`, { headers });
          console.log(data);
          if (data.data.fav.length!==0) {
                setfav(data.data.fav);
          }
          else{
            setfavItems([]);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    
    useEffect(() => {
      getFav();
      // eslint-disable-next-line
        }, [cookiehead, cookie]);
        
    useEffect(()=>{

        const timeout = setTimeout(()=>{
            if(favItems){
                setloading(true);
            }
        },700);
        return ()=>clearTimeout(timeout);
},[favItems])

    return (<>

   
             <Navbar ></Navbar>
             <div className="fav_page" style={{paddingTop : `${navHeight}px`}}>
                    <div className="fav_con">
                            <div className="fav_con_page_msg">
                                <div className="fav_msg_con">Estimated delivery time: 2-7 days</div>
                                <div className="fav_msg_con">Download the H&M App</div>
                            </div>
                            <h1>Favourites</h1>
                            <div className={favItems && favItems.length!==0 ? "fav_pro_con" : "fav_pro_empty"}>
                                {loading ? favItems && favItems.length!==0 ? favItems.map((item, index)=>{        
                                return <Product item={item} key={index} />
                                    }) :   <div className="no_fav_items">
                                <h3>SAVE YOUR FAVOURITE ITEMS</h3>
                                <p>Want to save the items that you love? Just click on the heart symbol beside the item and it will show up here.</p>
                                <button onClick={e=>navigate("/")} className="fav_browse_now">Browse now</button></div>
                                : <SkeletonFav></SkeletonFav>}
                            </div>
                    </div>
             </div>
             <Footer></Footer>
    </>)
}


function SkeletonFav(){
    const arr = [1,2,3,4]
    
    return (<>
    {arr.map((index)=>{
        return <div key={index} className="main_skeletonFav">
        
        </div>
    })}
        </>)
}

function Product(props)
{
    const {setfavItems, favItems, setfav, setgetbagcount ,cookie, cookiehead} = useContext(Usercontext);
    const [size,setsize] = useState();
    const [showsize, setshowsize] = useState(); 
    const [bagError, setbagError] = useState();    
    const [imghover, setimgHover] = useState(false);

    const handleHover = () => {
      setimgHover(!imghover);
    }

  
    async function DeleteItem(item){
        const productId  = item._id;
        const filteredFavItems = favItems.filter(product => product._id !== productId);
        setfavItems(filteredFavItems);
        const headers = { [cookiehead]: cookie };
        if(headers && cookie && cookiehead){
        try{
            const data =  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/fav_products/${productId}`,{ headers });
            if(data){
                getFav()
            }
           }catch(err){
            console.log(err);
           }
          }
      }
     

         async function getFav() {
          const headers = { [cookiehead]: cookie };
          console.log(headers);
          if(headers && cookie && cookiehead){
            try {
              const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/fav_products`, { headers });
              if (data) {
                console.log(data);
                setfav(data.data.fav);
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
      
           function addtobag(item){
            if(size===undefined || size ==="Select size"){
               setbagError("Please select a valid size");
            }
            else{
                 async function addItem(){
                   const headers = { [cookiehead]: cookie };
                   const productId = item._id;
                   if(headers && cookie && cookiehead){
                   try{
                     const data = await axios.post(`${process.env.REACT_APP_SERVER_URL}/bag_item`,{size, productId},{headers});
                     if(data){
                       setsize("Select Size");
                       setgetbagcount(cur=>!cur);
                       DeleteItem(item);
                     }
                     
                    }catch(err){
                     console.log(err);
                    }
                  }
                 }
                  addItem();
               }
           }
         
        return <div className="fav_pro_main">
            <div className="fav_product">
          
  <div className="fav_img_container">
  <Link to={`/product/${props.item._id}`}>
    <img className="fav_product_img"
              onMouseEnter={handleHover} // Call handleHover when mouse enters the image
              onMouseLeave={handleHover}  
              src={imghover ? props.item.image[1] : props.item.image[0]} alt="product_img" />
    </Link>
    <div className="fav_product_delete_icon">
      <svg
        onClick={(e) => DeleteItem(props.item)}
        className="skin_delete"
        viewBox="0 0 14 16"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        focusable="false"
      >
        <path
          fillRule="evenodd"
          d="M14 4v1h-1v10.455c0 .3-.224.545-.5.545h-11c-.276 0-.5-.244-.5-.545V5H0V4h14zm-2 1v10H2V5h10zM9.5 0a.5.5 0 01.5.5V2h4v1H0V2h4V.5a.5.5 0 01.5-.5h5zM9 1H5v1h4V1zM5 8h1v4H5V8zm3 0h1v4H8V8z"
        ></path>
      </svg>
    </div>
  </div>


                <div className="fav_product_text">
                <Link className="universal_link" to={`/product/${props.item._id}`}>
                <h3>{props.item.name}</h3>
                </Link>
                <h4>Rs.{props.item.price}</h4>
                <p>Color : {props.item.color}</p>
                <div className="fav_size">
               <button onClick={e=>{setshowsize(cur=>!cur);setsize("Select size")}} className="size_button" value={size}>{size ? size : "Select size"}
               <MdOutlineKeyboardArrowDown className="button_down" />

               </button>
                           {showsize ?  <ul>
                                    <li onClick={e=>{setsize('XS');setshowsize(cur=>!cur)}}>XS</li>
                                    <li onClick={e=>{setsize('S');setshowsize(cur=>!cur)}}>S</li>
                                    <li onClick={e=>{setsize('M');setshowsize(cur=>!cur)}}>M</li>
                                    <li onClick={e=>{setsize('L');setshowsize(cur=>!cur)}}>L</li>
                                    <li onClick={e=>{setsize('XL');setshowsize(cur=>!cur)}}>XL</li>
                            </ul> : null}
                            <p className="bagError">{bagError}</p>
               
                            <button onClick={e=>addtobag(props.item)} className="size_addtocart">
                            <svg className="add_icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false"><path d="M12 .1c2.9 0 4.9 1.4 4.9 3.8v.6h3.8v5.1c0 4.7 2.1 13.3.5 13.3-.7 0-5 1.1-9.2 1.1-4.6 0-9.2-1.1-9.2-1.1-1.5 0 .5-8.7.5-13.3V4.4h3.8v-.6c0-2.4 2-3.7 4.9-3.7zm7.6 5.4h-2.7v2.2h-1.1V5.5H8.2v2.2H7.1V5.5H4.4v4c0 1.3-.1 2.9-.4 5.3l-.1.9c-.4 3-.5 3.9-.5 5v1.2c.8.1 1.6.3 2.4.4 2.1.3 4.2.5 6.1.5h.5c1.6 0 3.3-.2 5.2-.5.2 0 2-.4 2.9-.5v-1.4c0-1-.2-1.9-.5-4.7 0-.3-.1-.6-.1-.9-.3-2.4-.4-4-.4-5.3v-4zM12 1.2c-2.3 0-3.8 1-3.8 2.6v.6h7.6v-.6c0-1.7-1.5-2.6-3.8-2.6z" fill="#fff"></path></svg>
                                Add</button>
                    </div>
                </div>
              
            </div>
        </div>
}
