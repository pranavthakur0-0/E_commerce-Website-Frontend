import { useContext, useEffect, useRef, useState} from "react"
import { Usercontext } from "../../context/authlogin"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Product.scss"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function Product(){
    const {selected, navHeight, setselected, fav, setfav,setgetbagcount,cookie, cookiehead} = useContext(Usercontext);
    const navigate = useNavigate();
    const {productId} = useParams()
    const [size,setsize] = useState();
    const [showsize, setshowsize] = useState();
    const [sidebar, setsidebar] = useState();
    const [matchingProduct , setmatchingProduct] = useState();
    const contrainerRef = useRef(null);
    const arr = [1,2,3,4,5,6];
    const [index,setindex]  = useState(0);
    const [bagError, setbagError] = useState();
    // const [getrecommended, setgetrecommended] = useState();


      async function addToFav(id){
        const ItemId = id;
        const headers = { [cookiehead]: cookie };
        if(headers && cookie && cookiehead){
            try{
              const data = await axios.post(`http://localhost:4000/api/server/fav_products`,{ItemId},{headers});
              if(data){
                setfav(data.data.fav);
              }
            }catch(err){
              console.log(err);
            }
          }
        }
        
    useEffect(() => {

        if (sidebar) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
      }, [sidebar]);

    const fetchProduct = async ()=>{
        try{
            const product = await axios.get(`http://localhost:4000/api/server/getsingle/product/${productId}`);
            if(product){
                setselected(product.data[0])
            }
        }catch(err){
            console.log(err);
        }   
    }
    useEffect(()=>{
        if(selected === undefined && productId === undefined){
            navigate('/');
        }
        else if(productId){
            fetchProduct();
        }
        // eslint-disable-next-line
    },[navigate])


    function formatPrice(num) {
        const parts = num.toFixed(2).toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
      }

      const fetchSimilarProduct = async()=>{
        try{
            const matchingProduct =  await axios.get(`http://localhost:4000/api/server/admin/products/${selected.name}`)
            setmatchingProduct(matchingProduct.data);
        }catch(err){
        }
      }
      // const Recommended = async () => {
      //     try {
      //       const response = await axios.get(`http://localhost:4000/api/server/products/${selected.category}`);
      //       setgetrecommended(response.data);
      //     } catch (err) {
      //       console.log(err);
      //     }
      // }
      
      useEffect(()=>{
        if (selected && selected.category) { 
          fetchSimilarProduct();
          // Recommended();
        }
               // eslint-disable-next-line
      },[selected])




      function moveSlider(newdirection) {
        contrainerRef.current.style.transition = '0.8s ease-in-out';
        if(newdirection === 'left' && index !==0 )
        {
            setindex(curIndex => curIndex - 1)
        }
  
        else if(newdirection === 'right' && index <arr.length-4){
            setindex(curIndex => curIndex + 1)
            console.log(index);
        }
            contrainerRef.current.addEventListener('transitionend', () => {
            contrainerRef.current.style.transition = '0s';
            contrainerRef.current.removeEventListener('transitionend', () => { });
   
        });
      }

      useEffect(() => {
        if(contrainerRef.current){
            contrainerRef.current.style.transform = `translateX(-${index * 257}px)`;
        }
    
      }, [index]);

      function addtobag(e){
       if(size===undefined || size ==="Select size"){
          setbagError("Please select a valid size");
       }
       else{
            async function addItem(){
              const headers = { [cookiehead]: cookie };
              console.log(headers);
              const productId = selected._id;
              if(headers && cookie && cookiehead){
              try{
                const data = await axios.post('http://localhost:4000/api/server/bag_item',{size, productId},{headers});
                if(data){
                  setsize("Select Size");
                  setgetbagcount(cur=>!cur);
                }
                
               }catch(err){
                console.log(err);
               }
             }
            }
             addItem();
          }
      }


    return selected ? (
        <>
          <Navbar />
          <div className="pro_main" style={{ paddingTop: `${navHeight}px` }}>
            <div className="pro_con">
                <div className="pro_upper_con">
              <div className="img_desc">
              <img className="product_img" src={selected.image[0]} alt="" />
                <img className="product_img" src={selected.image[1]} alt="" />

              </div>
              <div className="pro_text">
                <div className="name_fav">
                <h1>{selected.name}</h1>
                <svg onClick={e=>addToFav(selected._id)} className="fav_icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false"><path className="innerElement" d="M17.376 1C21.476 1 24 3.556 24 7.748c0 1.614-.961 3.598-2.696 5.9-.89 1.183-1.97 2.425-3.196 3.705a71.38 71.38 0 0 1-3.987 3.832 71.307 71.307 0 0 1-1.816 1.566L12 23l-.305-.25a71.307 71.307 0 0 1-1.816-1.565 71.38 71.38 0 0 1-3.987-3.832c-1.227-1.28-2.305-2.522-3.196-3.704C.961 11.346 0 9.362 0 7.748 0 3.556 2.524 1 6.624 1c2.08 0 4.23 1.548 5.376 3.548C13.145 2.548 15.294 1 17.376 1z"
                  fill={fav && fav.includes(selected._id) ? '#e50010' : 'none'}
                   ></path>
                <path  className="outerElement" d="M17.376 1C21.476 1 24 3.578 24 7.807c0 1.628-.961 3.63-2.696 5.953-.89 1.192-1.97 2.446-3.196 3.737a71.66 71.66 0 0 1-3.987 3.865 71.495 71.495 0 0 1-1.816 1.58l-.305.251-.305-.252c-.093-.076-.264-.22-.503-.424-.396-.34-.838-.727-1.313-1.155a71.66 71.66 0 0 1-3.987-3.865c-1.227-1.291-2.305-2.545-3.196-3.737C.961 11.437 0 9.435 0 7.807 0 3.578 2.524 1 6.624 1c2.08 0 4.23 1.562 5.376 3.58C13.145 2.56 15.294 1 17.376 1zM12 21.79l.18-.154c.383-.329.812-.704 1.273-1.12a69.488 69.488 0 0 0 3.865-3.746c1.18-1.244 2.217-2.448 3.068-3.587 1.593-2.132 2.462-3.943 2.462-5.286 0-3.64-2.063-5.747-5.565-5.747-1.927 0-4.049 1.768-4.842 3.843L12 7.145l-.44-1.152C10.765 3.919 8.642 2.15 6.716 2.15c-3.502 0-5.565 2.107-5.565 5.747 0 1.343.87 3.154 2.462 5.286.85 1.14 1.887 2.343 3.068 3.587a69.488 69.488 0 0 0 3.865 3.747A69.313 69.313 0 0 0 12 21.789z"
                   fill={fav && fav.includes(selected._id) ? '#e50010' : 'black'}
                   ></path></svg>
                </div>
                <div className="price">
                    <p>Rs. {formatPrice(selected.price)}</p>
                </div>
                <div className="color">
                    <p>{selected.color}</p>
                </div>
              <div className="other_product">
                   { matchingProduct ? matchingProduct.map((item,index)=>{
                    return  <img key={index} onClick={e=>{setselected(item)}} style={item._id === selected._id ? {border : `1px solid black`} :{border : "none"} }  className="product_img" src={item.image[0]} alt="" />
                   }): ""}
              </div>

                <div className="size">
                        <button onClick={e=>{setshowsize(cur=>!cur);setsize("Select size"); setbagError("")}} className="size_button" value={size}>{size ? size : "Select size"} <MdOutlineKeyboardArrowDown className="button_down" /></button>
                       {showsize ?  <ul>
                                <li onClick={e=>{setsize('XS');setshowsize(cur=>!cur)}}>XS</li>
                                <li onClick={e=>{setsize('S');setshowsize(cur=>!cur)}}>S</li>
                                <li onClick={e=>{setsize('M');setshowsize(cur=>!cur)}}>M</li>
                                <li onClick={e=>{setsize('L');setshowsize(cur=>!cur)}}>L</li>
                                <li onClick={e=>{setsize('XL');setshowsize(cur=>!cur)}}>XL</li>
                        </ul> : null}
                </div>
                <div className="bag_error">{bagError}</div>
                <div className="add_to">
                    <button onClick={e=>addtobag(e)} className="button_add"><span>Add</span>
                    <svg className="add_icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false"><path d="M12 .1c2.9 0 4.9 1.4 4.9 3.8v.6h3.8v5.1c0 4.7 2.1 13.3.5 13.3-.7 0-5 1.1-9.2 1.1-4.6 0-9.2-1.1-9.2-1.1-1.5 0 .5-8.7.5-13.3V4.4h3.8v-.6c0-2.4 2-3.7 4.9-3.7zm7.6 5.4h-2.7v2.2h-1.1V5.5H8.2v2.2H7.1V5.5H4.4v4c0 1.3-.1 2.9-.4 5.3l-.1.9c-.4 3-.5 3.9-.5 5v1.2c.8.1 1.6.3 2.4.4 2.1.3 4.2.5 6.1.5h.5c1.6 0 3.3-.2 5.2-.5.2 0 2-.4 2.9-.5v-1.4c0-1-.2-1.9-.5-4.7 0-.3-.1-.6-.1-.9-.3-2.4-.4-4-.4-5.3v-4zM12 1.2c-2.3 0-3.8 1-3.8 2.6v.6h7.6v-.6c0-1.7-1.5-2.6-3.8-2.6z" fill="#fff"></path></svg>
                    </button>
                </div>
                <div className="details">
                    <p> <svg className="pro_delivery"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false"><path d="M17 1.5a.5.5 0 0 0-.5-.5h-9l-.09.008A.5.5 0 0 0 7 1.5V4H3.5l-.086.007a.5.5 0 0 0-.378.307l-2 5-.025.083A.5.5 0 0 0 1.5 10H2v11.5a.5.5 0 0 0 .5.5h19l.09-.008A.5.5 0 0 0 22 21.5V10h.5l.086-.007a.5.5 0 0 0 .379-.679l-2-5-.04-.077A.5.5 0 0 0 20.5 4H17V1.5ZM3 10h18v11h-2v-8.5a.5.5 0 0 0-.5-.5h-13l-.09.008A.5.5 0 0 0 5 12.5V21H3V10Zm8.5 3H6v8h5.5v-8Zm1 0H18v8h-5.5v-8ZM15 7h-1V6h-4v1H9V6H7.5a.5.5 0 0 1-.5-.5v-.501L3.838 5l-1.6 4h19.523l-1.6-4L17 4.999V5.5a.5.5 0 0 1-.41.492L16.5 6H15v1ZM8 2h8v3H8V2Z" 
                    fillRule="evenodd"></path></svg>
                    Find in store</p>
                    <p> <svg className="pro_delivery" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 1C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm0-14.688a1.01 1.01 0 0 1-1.024-1.024c0-.576.448-1.008 1.024-1.008.576 0 1.024.432 1.024 1.008A1.01 1.01 0 0 1 12 8.312zM11.248 17V9.56h1.504V17h-1.504z"></path></svg>
                    Standard delivery in 2-7 days</p>
                    <h2 onClick={e=>{setsidebar(cur=>!cur)}}>Delivery and Payment</h2>
                </div>
              </div>
              </div>
              <div className="pro_detail_con">
                <dl>{selected.description}</dl>
                <dl>
                <dt> <p> Fit - </p> {selected.fit}</dt>
                <dt> <p>Composition - </p>{selected.composition}</dt>
                </dl>
            
              </div>

              <div className="pro_upper_con">
              <div className="img_desc">
                {selected.image[2] ? <img className="product_img" src={selected.image[2]} alt="" /> : ""}
                {selected.image[3] ? <img className="product_img" src={selected.image[3]} alt="" /> : ""}
              </div>
              <div className="pro_text">
              </div>
              </div>

              <div className="heading_slider">
                <h1>Style with</h1>
              </div>

              <div className="same_category">
                        <div className="button_con _pro_Left">
                        <button className="button_cls _invert_button" onClick={e=>moveSlider('left')}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none">
                            <path className="button_arrow" d="M8.25 17.5625L9.32143 18.75L15.75 11.625L9.32143 4.5L8.25 5.6875L13.6071 11.625L8.25 17.5625Z"></path></svg></button>
                        </div>
                        <div className="container" ref={contrainerRef}>
                            {arr.map((item,index)=>{
                                return (<img key={index} className="product_img" src={selected.image[0]} alt="" />)
                            })}
                        </div>
                        <div className="button_con _pro_Right">
                        <button className="button_cls" onClick={e=>moveSlider('right')}>
                            <svg xmlns="http://www.w3.org/2000/svg"  width="25" height="25" viewBox="0 0 24 24" fill="none">
                            <path className="button_arrow" d="M8.25 17.5625L9.32143 18.75L15.75 11.625L9.32143 4.5L8.25 5.6875L13.6071 11.625L8.25 17.5625Z"></path></svg></button>
                        </div>
               
              </div>
             <div className="pro_page_offer">
                        <div className="offer_con">
                            <p>By 2030, we aim to only work with recycled, organic or other more sustainably sourced materials.</p>
                            <h2>Right now, we're at 80%.</h2>
                            <h5>Curious about what we're doing to lessen our environmental impact? Read more here</h5>
                        </div>
             </div>

              
            </div>

           
          </div>
          <Footer />
          {sidebar ? <div className="product_side_alert">

<div className="side" style={sidebar ? {right: "0px"} : {right : "30rem"}}>
    <div className="header">
        <h1>Delivery and Payment</h1>
    <svg onClick={e=>{setsidebar(cur=>!cur)}} className="side_icon" stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg"><g></g><path d="M9.207 8.5l6.646 6.646-0.707 0.707-6.646-6.646-6.646 6.646-0.707-0.707 6.646-6.646-6.647-6.646 0.707-0.707 6.647 6.646 6.646-6.646 0.707 0.707-6.646 6.646z"></path></svg>
    </div>
    <p>Due to additional health and safety measures to protect our logistics teams, your delivery may take a little longer. Please note, that we might not be able to deliver to all areas. You will be notified about the same during checkout. We deliver all days, except bank holidays.</p>
</div>
                
</div> : ""}
        </>
      ) : null;
      
}