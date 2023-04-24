import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Navbar.scss'
import { BsPerson,BsHeart } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import './Login.scss'
import {TfiClose } from "react-icons/tfi";
import axios from 'axios'
import {Link, useNavigate, useParams} from "react-router-dom"
import Navlink from "./Navlinks"
import { Usercontext } from '../context/authlogin';
import { BsChevronDown } from "react-icons/bs";
import { useCookies } from 'react-cookie';


export default function Navbar()
{
    const [bag ,setbag] = useState(false);
    const [login ,setlogin] = useState('')
    const [links, setlinks] = useState(false);
    const [navlink, setnavlink] = useState();
    const {loggedIn, setloggedIn, setnavHeight, setbagdata, bagdata, bagcount,  cookie, cookiehead } = useContext(Usercontext);
    const navref = useRef();
    const {gender, item} = useParams();
    const [changecss, setchangecss] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cookies , , removeCookie] = useCookies(["Wedesgin_tempID"]);
    
    
    useEffect(() => {
      const parallax = e => {
        const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollPos < 100) {
          setchangecss(true);
        }
        else{
          setchangecss(false);
        }
      }
      window.addEventListener("scroll", parallax);
      return () => {
        window.removeEventListener("scroll", parallax);
      }
    }, []);
    
    useEffect(() => {
      const links = document.querySelector('.nav_cl_links');
      const nav1 = document.querySelector(".nav_cl_1");
      if(gender){
        if (changecss) { 
          links.style.display = 'none'; 
          nav1.style.backgroundColor = "transparent";
          nav1.style.boxShadow = "none";
          nav1.style.color = "white";
        }else {
          links.style.display = "flex";  
          nav1.style.backgroundColor = "white";
          nav1.style.color = "black";
          nav1.style.boxShadow = "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;";
        }
      }     
     else{
      nav1.style.backgroundColor = "white";
      nav1.style.boxShadow = "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;";
     }

     if(gender && item){
      links.style.display = "flex";  
      nav1.style.backgroundColor = "white";
      nav1.style.color = "black";
      nav1.style.boxShadow = "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;";
     }
    }, [changecss,gender, item]);
    
    useLayoutEffect(() => {
      const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollPos < 100) {
        setchangecss(true);
      }
      else {
        setchangecss(false);
      }
    }, []);
    
    

    function Login() {
      const [info, setinfo] = useState({
        email:"",
        password:"",
        checked: false
      });
        const closelogin = (e) => {
          e.stopPropagation(); 
          setlogin('');
        }
        
        function SubmitLogin(e){
          e.preventDefault();
         async function LoginApi()
         {
          const tempId = cookies.Wedesgin_tempID;
          try{
            const data = await axios.post("http://localhost:4000/api/server/login", {info,  tempId},{withCredentials : true,}); 
            if(data.status===200)
            {
              if (cookies['Wedesgin_tempID']) {
                removeCookie('Wedesgin_tempID');
              }
              setloggedIn(true);
              setlogin('');
              e.target.reset();
              setinfo({
              email:"",
              password:"",
              checked: false,
            });
            window.location.reload(false);
            }
          }
            catch(err)
            {
              console.log(err);
            }
         }
         if(info.email && info.password)
         {
          LoginApi();
         }
        }

        const memberinfo = (e) => {
          setinfo((info) => ({
            ...info,
            [e.target.name]: e.target.value,
  
          }
        ));
                }

        return (
          <div className="nav_login">
            <div className="lg_box">
              <div className="lg_header">
                <h3>Sign in</h3>
                <TfiClose className="lg_icon" onClick={closelogin} />
              </div>
              <p>
                Become a member — don’t miss out on deals, offers, discounts and bonus
                vouchers.
              </p>
              <form className='sing_form' onSubmit={e=>SubmitLogin(e)}>
                <div className="box_wrap">
                <label className='sign_label' htmlFor="email">Email<div className="required">*</div> </label>
                <input className='input_box' id='email' name='email'  type="email" placeholder='info@email.com' onChange={e=>memberinfo(e)} value={info.email} />
                </div>
                <div className="box_wrap">
                <label className='sign_label' htmlFor="password">Password<div className="required">*</div> </label>
                <input className='input_box' id='password' name='password' placeholder='Password'  type="password" onChange={e=>memberinfo(e)} value={info.password} />
                </div>
                <div className="in_rem_for">
                    <div className="check_wrap">                    
                    <input type="checkbox" name='checked' id='check' checked={info.checked} 
                 onChange={e => {
                  setinfo(prevInfo => ({...prevInfo,
                   checked: !prevInfo.checked
                    }));
                    }
               } 
                 />
                    <label htmlFor="check">Remember me</label>
                    </div>
                    <div className="forgot">forgot password?</div>
                </div>
                <div className="box_wrap">
                    <input className='input_box in_button' type="Submit" defaultValue="Submit" />
                </div>
                <div className="box_wrap">
                    <div className='input_box in_button' onClick={e=>setlogin("member")} >Become a Member</div>
                </div>
              </form>
            </div>
          </div>
        );
      }
  




      function Member() {
      
        const [info, setinfo] = useState({
          email:"",
          password:"",
          date: "",
          month: "",
          year: "",
          checked: false
        });

        const formatdate  = (e, num) => {
          setinfo((info) => ({
            ...info,
            [e.target.name]: e.target.value.replace(/\D/g, '').slice(0, num),
          }));
      }
      
      const memberinfo = (e) => {
        setinfo((info) => ({
          ...info,
          [e.target.name]: e.target.value,

        }
      ));}

      function submitmember(e){
        e.preventDefault();
       async function memberapi()
       {
        try{
          const data = await axios.post("http://localhost:4000/api/server/register", info);  
          if(data.data.status)
          {
           setlogin('');
           e.target.reset();
           setinfo({
            email:"",
            password:"",
            date: "",
            month: "",
            year: "",
            checked: false
          });
          }
        }
          catch(err)
          {
            console.log(err);
          }
          
       }
       memberapi();
      }
        const closelogin = (e) => {
          e.stopPropagation(); 
          setlogin('');
        }
        return (
          <div className="nav_login">
            <div className="lg_box">
              <div className="lg_header">
                <h3>Member</h3>{" "}
                <TfiClose className="lg_icon" onClick={closelogin} />
              </div>
              <p>
                Become a member — don’t miss out on deals, offers, discounts and bonus
                vouchers.
              </p>
              <form className='sing_form' onSubmit={e=>submitmember(e)}>
                <div className="box_wrap">
                <label className='sign_label' htmlFor="email">Email<div className="required">*</div> </label>
                <input className='input_box' id='email' name='email'  type="email" placeholder='info@email.com' onChange={e=>memberinfo(e)} value={info.email} />
                </div>
                <div className="box_wrap">
                <label className='sign_label' htmlFor="password">Create a password<div className="required">*</div> </label>
                <input className='input_box' id='password' name='password' placeholder='Password'  type="password" onChange={e=>memberinfo(e)} value={info.password} />
                </div>
                <div className="box_wrap">
                <label className='sign_label' htmlFor="password">Date of birth<div className="required">*</div> </label>
                <div className="mb_dob_wrap">
                <input aria-label="DD" aria-required="true" name='date' placeholder='DD'  maxLength={2} value={info.date} onChange={e=>formatdate(e,2)} className='input_box' id='dobd' pattern="[0-9]*"  type="text" />
                /
                <input  aria-label="MM" aria-required="true" name='month' placeholder='MM'  maxLength={2} value={info.month}  onChange={e=>formatdate(e,2)} className='input_box' id='dobm' pattern="[0-9]*"  type="text" />
                /
                <input  aria-label="YYYY" aria-required="true" name='year' placeholder='YYYY'  maxLength={4} value={info.year}  onChange={e=>formatdate(e,4)} className='input_box' id='doby' pattern="[0-9]*"  type="text" />
                </div>
                <div className="updates">
                 <input type="checkbox" name='checked' checked={info.checked} 
                 onChange={e => {
                  setinfo(prevInfo => ({...prevInfo,
                   checked: !prevInfo.checked
                    }));
                    }
               } 
                 />
                  <p  className='terms'>Yes, email me offers, style updates, and special invites to sales and events.</p>
                </div>
                <p className='terms'>By clicking ‘Become a member’, I agree to the We.Desgin Membership <span className="link">Terms and conditions.</span></p>
                <p className='terms'>To give you the full membership experience, we will process your personal data in accordance with the We.Desgin <span className="link">Privacy Notice.</span></p>
                </div>
                <div className="box_wrap">
                    <input className='input_box in_button' type="Submit" defaultValue="Become a Member" />
                </div>
                <div className="box_wrap">
                    <div className='input_box in_button' onClick={e=>{
                      setlogin("login")
                      setinfo('');
                  }} >Back to sign in ?</div>
                </div>
              </form>
            </div>
          </div>
        );
      }

        const fetchData = async () => {
          const headers = { [cookiehead]: cookie };
          if(headers && cookie && cookiehead){
              try {
                let api = await axios.get("http://localhost:4000/api/server/bag_item",{headers});
                if (api) {
                  setbagdata(api)
                }
              } catch (err) {
                console.log(err);
              }
           }
        };
  

    useEffect(() => {

        if (login) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'unset';
        }
      }, [login]);



      useEffect(()=>{
        setnavHeight(navref.current.getBoundingClientRect().height);
        // eslint-disable-next-line
      },[])

      useEffect(()=>{
        const timeoutId = setTimeout(() => {
          if(bagdata){
            setIsLoading(true);
          }
        }, 700);
        // To clear the timeout, use clearTimeout with the timeoutId
        // clearTimeout will prevent the setIsLoading function from being called
        // if handleMouseLeave is called before the timeout completes
        return () => clearTimeout(timeoutId);
      },[bagdata])
    

      const handleMouseEnter = () => {
        fetchData();
        setbag(true);
      };

      const handleMouseLeave = () => {
        setIsLoading(false);
        setbag(false);
      };
    


    return <>
    <div className="nav_root">
        <div className="nav_cl_1" ref={navref}>
                <div className="nav_cl_grid">
                        <div className="nav_mod_1">
                            <ul>
                                <li>Customer Service</li>
                                <li>Newsletter</li>
                                <li>Find a store</li>
                            </ul>
                        </div>
                        <div className="nav_mod_2">
                        <Link to='/' className='nav_mod_2_home_link'>
                          <div className='nav_mod_2_home_link' style={changecss && gender && item===undefined ? {color : "white"} : gender===undefined ? {color : "black" } : {color : "black"} }><span>We.</span>Desgin</div>
                          </Link>
                         </div>
                        <div className="nav_mod_3">
                        {loggedIn

                        ?  <Link to="/account" className='universal_link'>
                              <div className="mod_3_opt nav_sign_in" style={changecss && gender && item===undefined ? {color : "white"} : {color : "black"}}>
                              <BsPerson className='icon' /> My Account
                              </div>
                            </Link>
                        
                        :   <div className="mod_3_opt nav_sign_in" style={changecss && gender && item===undefined ? {color : "white"} : {color : "black"}} onClick={e=>{setlogin('login');}}>
                            <BsPerson className='icon' /> Sign in
                            </div>}
                            {
                                (login === "login" ?  <Login></Login> : (login==="member") ? <Member></Member>: <></>)
                            }
                               <Link to='/favourites' className='universal_link'>
                            <div className="mod_3_opt" style={changecss && gender && item===undefined ? {color : "white"} : {color : "black"}}>
                            <BsHeart className='icon'  /> Favourites
                            </div>
                            </Link>
                            <div className="mod_3_opt nav_bag"
                                   onMouseEnter={e=>handleMouseEnter()}
                                   onMouseLeave={e=>handleMouseLeave()}
                              >
                            <Link to="/in_cart" className='universal_link' onClick={() => setbag(false)}>
                            <HiOutlineShoppingBag className='icon'  /> Bag ({bagcount ? bagcount : 0})   </Link>

                            <div className={bag ? "bag_box bag_box_open" : "bag_box"}>
                            {isLoading ?   <Bagitem item={bagdata.data}/>  :   <Skeletonbag />}
                                </div>
                             
                            </div>
                            </div>
                </div>
                <div className="nav_cl_links">
                    <ul>
                    <li onMouseEnter={e=>{setnavlink('women'); setlinks(true)}} onMouseLeave={e=>setlinks(false)}>
                    <Link to="/index/women" onClick={e=>{setlinks(false)}} className='universal_link'>Ladies</Link>
                    </li>
                    <li onMouseEnter={e=>{setnavlink('men'); setlinks(true)}} onMouseLeave={e=>setlinks(false)}>
                      <Link to="/index/men" onClick={e=>{setlinks(false)}} className='universal_link'>Men</Link>
                    </li>
                    <li onMouseEnter={e=>{setnavlink('baby'); setlinks(true)}} onMouseLeave={e=>setlinks(false)}>Baby</li>
                    <li onMouseEnter={e=>{setnavlink('kids'); setlinks(true)}} onMouseLeave={e=>setlinks(false)}>Kids</li>
                    <li onMouseEnter={e=>{setnavlink('sport'); setlinks(true)}} onMouseLeave={e=>setlinks(false)}>Sport</li>
                    <li onMouseEnter={e=>{setnavlink('sale'); setlinks(true)}} onMouseLeave={e=>setlinks(false)}>Sale</li>
                    <li onMouseEnter={e=>{setnavlink('sustain'); setlinks(true)}} onMouseLeave={e=>setlinks(false)}>Sustainability</li></ul>
                </div>
                <div className={links ? "content show_content" : "content"} onMouseEnter={e=>{setlinks(true)}} onMouseLeave={e=>setlinks(false)} >
                        <Navlink gender={navlink} ></Navlink>
                </div>
        </div>
        </div>
    </>
}



function EmptyBag(){
  return <div className="nav_bag_box">
  <h4>Your shopping bag is empty</h4>
  <div className="order">
    <span>Order value</span> <span>Rs. 0.00</span>
  </div>
  <div className="total">
    <span>Total</span> <span>Rs. 0.00</span>
  </div>
</div>
}


function Bagitem(props){
  const navigate = useNavigate();
  const [Price, setPrice] = useState();
  useEffect(() => {
    let totalPrice = 0;
    props.item.forEach((item) => {
      totalPrice += item.price * item.count;
    });
    setPrice(totalPrice);
  }, [props.item]);

  return <div className="nav_bag_box">
              {props.item.length !==0 ? <div className="main_nav_Bag_box">
                <div className="nav_bag_box_item">
                {props.item.map((item,index)=>{
                return <div className="product_container" key={index}>
                  <Link className='universal_link' to={`/product/${item._id}`} >
                  <div className="item_container">
                  <img src={item.image[0]} alt="" className="img_container" />
                  <div className="details_con">
                  <dl>
                      <dt>{item.name}</dt>
                      <dd className='price'>Rs. {item.price}</dd>
                      <dd><div>Quantity :</div> {item.count}</dd>
                      <dd><div>Color :</div> {item.color}</dd>
                      <dd><div>Size :</div> {item.size}</dd>
                    </dl>
                  </div>
                  </div>
                  </Link>
                </div>
              })}
                </div>

              <div className="nav_bag_box_price">
                  <div className="arrow">
                   <p>Scroll Down</p>
                    <BsChevronDown />
                    </div>
                  <div className="line"></div>
                  <dl>
                    <dd>
                      <dt className='heading'>Order Value : </dt>
                      <dt>Rs.{Price}</dt>
                    </dd>
                    <dd>
                      <dt className='heading'>Delivery : </dt>
                      <dt>{Price > 500 ? "Free" : "Rs. 50"}</dt>
                    </dd>
                  </dl>
                  <div className="line"></div>
                  <dl>
                    <dd>
                      <dt className='total_price'>Total : </dt>
                      <dt className='total_price'>Rs.{Price > 500 ? `${Price}` : `${Price+50}`}</dt>
                      </dd>
                  </dl>
                  <div className="button_wrapper">
                    <button className='checkout'>Checkout</button>
                        <button onClick={e=>navigate('/in_cart')} className='bag'>Shoping Bag</button>
                  </div>
              </div>
              </div> : <EmptyBag />}
         </div>
}

function Skeletonbag(){
  return <div className="skeleton_bag_nav">
    <div className="skel_one_bag"></div>
          <div className="skel_group">
            <div className="skel_sub_group">
              <div className="skel_sub_items"></div>
              <div className="skel_sub_items"></div>
              <div className="skel_sub_items"></div>
            </div>
            <div className="skel_sub_group">
              <div className="skel_sub_items"></div>
              <div className="skel_sub_items"></div>
              <div className="skel_sub_items"></div>
            </div>
          </div>
          <div className="skel_nav_line"></div>
          <div className="skel_one_bag skel_bottom_bag"></div>
          <div className="skel_one_bag skel_bottom_bag"></div>
  </div>
}