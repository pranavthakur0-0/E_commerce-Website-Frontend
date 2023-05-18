import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Usercontext } from "../../context/authlogin";
import './Universal.scss';
import axios from "axios";
import { BsChevronDown } from "react-icons/bs";
import Sidelinks from "./Sidelinks.jsx"
import SearchSidelinks from "./SearchSidelinks.jsx"

export default function UniversalComponent({genderState, setgenderState, productCountByGender, setproductCountByGender}) {
  const { navHeight, fav, colorArr, searchValue} = useContext(Usercontext);
  let { gender, item, headerlink} = useParams();
  const [products, setproducts] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [wait, setwait] = useState(false);
  const [sorttoggle, setsorttoggle] =  useState(false);
  const [sort, setsort] = useState('{"_id": -1}');
  const [showcolor, setshowcolor] = useState(false);
  const [color, setcolor] = useState([]);
  const [img,setimg] = useState('product');
  const [totalProducts, settotalProducts] = useState();
  const [colsize, setcolsize] = useState(true);
  const [total, settotal] = useState();
  const [limit, setlimit] = useState(5);
  const [current, setcurrent] = useState(2);
  const location = useLocation();
  const hasSearch = location.pathname.includes("search");

  useEffect(() => {
    const fetchData = async () => {
      setproducts('');
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/products?&search=${true}&query=${searchValue}&sort=${sort}&color=${color}&limit=${limit}&gender=${genderState}`);
        if (response.data.products) {
          setwait(true);
          setproducts(response.data.products);
          settotalProducts(response.data.totalProducts);
          settotal(response.data.total);
          setproductCountByGender(response.data.productCountByGender);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    if (hasSearch) {
        fetchData();
    }
    setisLoading(false);
    // eslint-disable-next-line
  }, [searchValue, sort, color, limit, genderState]);


  useEffect(()=>{

    const fetchProducts = async () => {
      setproducts('');
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin/products?headerlink=${headerlink}&gender=${gender}&item=${item}&sort=${sort}&color=${color}&limit=${limit}`);
        if (response) {
          setwait(true);
          setproducts(response.data.products);
          settotalProducts(response.data.totalProducts);
          settotal(response.data.total);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if(!hasSearch){
      fetchProducts();
    }   // eslint-disable-next-line
  },[gender, item, headerlink, sort, color, limit])

  useEffect(()=>{
    const timeout = setTimeout(()=>{
        if(wait && products){
            setisLoading(true);
        }
    },800);
    return ()=>clearTimeout(timeout);
    // eslint-disable-next-line
},[products,isLoading, setproducts])

function hidedropdown() {
  if (sorttoggle) {
    setsorttoggle(false);
  }
  if (showcolor) {
    setshowcolor(false);
  }
}

  return (
    <>
      <div  className="uni_con"  style={{ paddingTop: `${navHeight}px` }}  onClick={(e) => hidedropdown()}>
        <div className="home_cl_products">
          {hasSearch ? products && products.length>0  ? searchValue ? <h2>SHOWING RESULTS FOR <b>"{searchValue}"</b></h2> :  <h2> </h2> : 
          isLoading ? 
          <div className="no_matching_item">
            <h2>NO MATCHING ITEMS</h2>
            <p>Your search <b>"{searchValue}"</b> did not match any results.</p>
            <p>Please check the spelling or try again with a less specific term</p>
          </div> : <h2> </h2> : ""}
          <div className="pdts_wrap">
            <div className="pdts_sd_lk">
              {hasSearch ? <SearchSidelinks settotal={settotal} setisLoading={setisLoading}  setgenderState={setgenderState} productCountByGender={productCountByGender} /> : <Sidelinks  setisLoading={setisLoading} setsort={setsort} ></Sidelinks>}
               
            </div>
            <div className="pdts_sd_lt">
            {hasSearch ? "" :  <h1>{item}</h1>}
             
                 {products && products.length>0 ?  <div className="query_items">
                    <div className="query_items_one">
                      <button className="sort_universal_componenet" onClick={e=>setsorttoggle(cur=>!cur)}>SORT BY <BsChevronDown className={sorttoggle ? "down_icon" : "none"} /></button>
                      <ul name="sorting" id="sorting" style={sorttoggle ? {display : "flex"} : {display : "none"}}  className="sort_menu">
                        <li onClick={e=>{setsort('{"_id": -1}');setsorttoggle(cur=>!cur)}}>   <div className="radio"><div style={sort==='{"_id": -1}' ? {backgroundColor:"black"} : {backgroundColor:"white"}} className="inner"></div></div>Recommended</li>
                        <li onClick={e=>{setsort('{ "createdAt": -1 }');setsorttoggle(cur=>!cur)}}>        <div className="radio"><div style={sort==='{ "createdAt": -1 }' ? {backgroundColor:"black"} : {backgroundColor:"white"}} className="inner"></div></div>Newest</li>
                        <li onClick={e => { setsort('{"price": 1 }'); setsorttoggle(cur => !cur) }}><div className="radio"> <div style={sort  === '{"price": 1 }' ? { backgroundColor: "black" } : { backgroundColor: "white" }} className="inner"></div></div>Lowest Price</li>
                        <li onClick={e=>{setsort('{"price": -1 }');setsorttoggle(cur=>!cur)}}> <div className="radio"><div style={sort  === '{"price": -1 }' ? {backgroundColor:"black"} : {backgroundColor:"white"}} className="inner"></div></div>Highest Price</li>
                      </ul>
                      <div className="color_universal">
                        <button onClick={e=>setshowcolor(true)} className="color_options">COLOR <BsChevronDown className={showcolor ? "down_icon" : "none"} /></button>
                        <ul className="color_list"  style={showcolor ? {display : "flex"} : {display : "none"}} >
                          {colorArr &&colorArr.length !==0 ? colorArr.map((item,index)=>{
                              const encodedColorCode = encodeURIComponent(JSON.stringify(item.colorCode));
                              const isColorCodeSelected = color.includes(encodedColorCode);
                               //one thing when passing anything that contains # does not pass so we have to use encodeURIcomponent to pass the value containing hash
                            return (<li 
                              style={{ backgroundColor: isColorCodeSelected ? '#dedede' : 'white' }}
                              onClick={e => {
                                setcolor(oldArr => {
                                  const unique = new Set(oldArr);
                                  unique.has(encodedColorCode) ? unique.delete(encodedColorCode) : unique.add(encodedColorCode);
                                  return Array.from(unique);
                                });setshowcolor(cur=>!cur)}} key={index}><div className="color_box" style={{backgroundColor:`${item.colorCode}`}} ></div>{item.color}</li>)

                          }): ""}
                        </ul>
                      </div>
                      </div>
                      <div className="query_items_two">
                      <div className="model_product_" style={img ==="model" ? {textDecoration : "underline"}: {textDecoration : "none"}} onClick={e=>setimg("model")}>Model</div>
                      <div className="model_product_" style={img ==="product" ? {textDecoration : "underline"}: {textDecoration : "none"}} onClick={e=>setimg("product")}>Product</div>
                      <div className="total_item_found">{totalProducts > 0 ? total : 0} Items</div>
                      <div onClick={e=>setcolsize(false)} style={colsize ? {backgroundColor:"transparent"}:{backgroundColor:"black"}} className="col_size_sin"></div>
                      <div onClick={e=>setcolsize(true)} className="col_size_mul">
                        <div className="min_row">
                          <div className="min_div" style={colsize ? {backgroundColor:"black"}:{backgroundColor:"transparent"}} ></div>
                          <div className="min_div" style={colsize ? {backgroundColor:"black"}:{backgroundColor:"transparent"}}></div>
                        </div>
                        <div className="min_row">
                          <div className="min_div" style={colsize ? {backgroundColor:"black"}:{backgroundColor:"transparent"}}></div>
                          <div className="min_div" style={colsize ? {backgroundColor:"black"}:{backgroundColor:"transparent"}}></div>
                        </div>
                      </div>
                      </div>
                  </div> : ""}

                  <div className="uni_item" style={colsize ? (products && products.length <= 0 ? {gridTemplateColumns: 'repeat(5, 1fr)', display: 'flex'} : {gridTemplateColumns: 'repeat(5, 1fr)'}) : {gridTemplateColumns: 'repeat(4, 1fr)'}}>

                  {isLoading ? (
                        products && products.length !== 0 ? (
                          <>
                            {genderState
                              ? products.map((item, index) => {
                                  if (item.gender === genderState) {
                                    const isFav = fav && fav.includes(item._id);
                                    return (
                                      <ProductItem
                                        item={item}
                                        key={index}
                                        isfav={isFav}
                                        colsize={colsize}
                                        img={img}
                                      />
                                    );
                                  }
                                  return null;
                                })
                              : products.map((item, index) => {
                                  const isFav = fav && fav.includes(item._id);
                                  return (
                                    <ProductItem
                                      item={item}
                                      key={index}
                                      isfav={isFav}
                                      colsize={colsize}
                                      img={img}
                                    />
                                  );
                                })}
                          </>
                        ) 
                         : (
                         ""
                        )
                      ) : (
                        <UniversalPageSkeleton />
                      )}
                      
            </div>
            </div>
          </div>
          {isLoading && products.length>0 ? <div className="next_prev_button">
            Showing {totalProducts} of {total} Items
                        {totalProducts === total ? "" : <button className="load_more_button" onClick={e => { setcurrent(cur=>cur+1); setlimit(limit *current); setisLoading(false);}}>Load more products</button>}
                  </div> : ""}
        </div>
      </div>
    </>
  );
}


function ProductItem (props){
  const { setselected, setfav, cookie, cookiehead  } = useContext(Usercontext);
  const navigate =useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [Fav, setFav] = useState(props.isfav );
  const [imghover, setimgHover] = useState(false);

  const handleHover = () => {
    setimgHover(!imghover);
  }

  const handleMouseEnter = () => {
    setIsHovering(true);
  }

  const handleMouseLeave = () => {
    const timeoutId = setTimeout(() => {
      setIsHovering(false);
    }, 50);
    return () => clearTimeout(timeoutId);
  }

 async function addToFav(ItemId){
  const headers = { [cookiehead]: cookie };
  if(headers && cookie && cookiehead){
      try{
        const data = await axios.post(`${process.env.REACT_APP_SERVER_URL}/fav_products`,{ItemId},{headers});
        if(data){
          setfav(data.data.fav);
        }
      }catch(err){
        console.log(err);
      }
    }
  }




return (<div onClick={e=>{ setselected(props.item); navigate(`/product/${props.item._id}`); }} className="uni_wrap">
    <div className="uni_img_con">
        <img style={props.colsize ? {width : "13.5rem"} : {width : "17rem"}}  onMouseEnter={handleHover} // Call handleHover when mouse enters the image
              onMouseLeave={handleHover}  
              className="uni_img"
              src={
                props.img === "product"
                  ? imghover
                    ? props.item.image[1]
                    : props.item.image[0]
                  : imghover
                  ? props.item.image[0]
                  : props.item.image[3]
              }
              alt="product_img"
            />
        <svg       onMouseEnter={handleMouseEnter}
                   onMouseLeave={handleMouseLeave}
         className="uni_fav_icon" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"  
            onClick={e => {
            setFav(curr=>!curr)
            e.stopPropagation();
            addToFav(props.item._id);
          }
          } focusable="false">
            <path className="innerElement" 
              fill={Fav || isHovering ? '#e50010' : 'white'} 
             d="M17.376 1C21.476 1 24 3.556 24 7.748c0 1.614-.961 3.598-2.696 5.9-.89 1.183-1.97 2.425-3.196 3.705a71.38 71.38 0 0 1-3.987 3.832 71.307 71.307 0 0 1-1.816 1.566L12 23l-.305-.25a71.307 71.307 0 0 1-1.816-1.565 71.38 71.38 0 0 1-3.987-3.832c-1.227-1.28-2.305-2.522-3.196-3.704C.961 11.346 0 9.362 0 7.748 0 3.556 2.524 1 6.624 1c2.08 0 4.23 1.548 5.376 3.548C13.145 2.548 15.294 1 17.376 1z">
              </path><path   
                  fill={Fav || isHovering ? '#e50010' : 'black'} 
                  className="outerElement"
                  d="M17.376 1C21.476 1 24 3.578 24 7.807c0 1.628-.961 3.63-2.696 5.953-.89 1.192-1.97 2.446-3.196 3.737a71.66 71.66 0 0 1-3.987 3.865 71.495 71.495 0 0 1-1.816 1.58l-.305.251-.305-.252c-.093-.076-.264-.22-.503-.424-.396-.34-.838-.727-1.313-1.155a71.66 71.66 0 0 1-3.987-3.865c-1.227-1.291-2.305-2.545-3.196-3.737C.961 11.437 0 9.435 0 7.807 0 3.578 2.524 1 6.624 1c2.08 0 4.23 1.562 5.376 3.58C13.145 2.56 15.294 1 17.376 1zM12 21.79l.18-.154c.383-.329.812-.704 1.273-1.12a69.488 69.488 0 0 0 3.865-3.746c1.18-1.244 2.217-2.448 3.068-3.587 1.593-2.132 2.462-3.943 2.462-5.286 0-3.64-2.063-5.747-5.565-5.747-1.927 0-4.049 1.768-4.842 3.843L12 7.145l-.44-1.152C10.765 3.919 8.642 2.15 6.716 2.15c-3.502 0-5.565 2.107-5.565 5.747 0 1.343.87 3.154 2.462 5.286.85 1.14 1.887 2.343 3.068 3.587a69.488 69.488 0 0 0 3.865 3.747A69.313 69.313 0 0 0 12 21.789z"></path></svg>
            </div>
                <div className="text_wrapp">
                <div>{props.item.name}</div><div>₹ {props.item.price}</div>
                </div>
                <div className="text_wrapp_color_tag">
                <div className="paragraph">
                      Color:{" "}
                      {props.item.AllcolorCode.map((code, index) => {
                        if (code === props.item.colorCode) {
                          return (
                            <div
                              className="color_circle"
                              style={{ backgroundColor: `${code}` }}
                              key={index}
                            ></div>
                          );
                        }
                        return null;
                      })}
                      {props.item.AllcolorCode
                        .filter(code => code !== props.item.colorCode)
                        .slice(0, 3)
                        .map((code, index) => (
                          <div
                            className="color_circle"
                            style={{ backgroundColor: `${code}` }}
                            key={index}
                          ></div>
                        ))}
                      {props.item.AllcolorCode.length > 4 && (
                        <>
                          +{props.item.AllcolorCode.length - 4}
                        </>
                      )}
                   
                    </div>
                    <p>{props.item.headlink === "New Arrivals" ? props.item.headlink : ""}</p>
                </div>
                    
            </div>)
}       



function UniversalPageSkeleton() {
  const arr = Array.from({length: 10}, (_, index) => index + 1);
  return (
    <>
      {arr.map((item) => (
        <div key={item} className="main_UniversalPageSkeleton">
          <div className="shell_struct"></div>
        </div>
      ))}
    </>
  );
}
