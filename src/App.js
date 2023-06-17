import './App.scss'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login.jsx'
import Regsiter from './pages/Regsiter/Regsiter.jsx'
import MyAccount from './pages/MyAccount/MyAccount.jsx'
import Favourites from './pages/Favourites/Favourites.jsx'
import { Routes, Route} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Usercontext } from './context/authlogin';
import { useEffect, useState } from 'react';
import axios from 'axios'
import {useCookies} from "react-cookie";
import Admin from "./pages/Admin/Admin.jsx"
import GetAdmin from './pages/Admin/getAdmin';
import Addlinks from "./pages/Addlink/Addlinks.jsx"
import Index from './pages/Index/Index';
import UniversalPage from './pages/Universal/Universalpage';
import Product from './pages/Product/Product';
import Cart  from './pages/Cart/Cart.jsx'
import Search from './pages/Search/Search';
import DashBoard from './pages/DashBoard/DashBoard';
import Checkout from './pages/Checkout/Checkout.jsx'
import OrderConfirmed from "./pages/OrderConfirmed/OrderConfirmed.jsx"

function App() {
  const [loggedIn, setloggedIn] = useState(false);
  const [cookies] = useCookies(['Wedesgin_loggedIn_permanent','Wedesgin_tempID']);
  const [navHeight, setnavHeight] = useState(0);
  const [selected, setselected] = useState();
  const [link, setlink] = useState();
  const [fav,setfav] = useState();
  const [bagdata, setbagdata] = useState();
  const [favItems,setfavItems] = useState();
  const [bagcount, setbagcount] = useState();
  const [getbagcount, setgetbagcount] = useState(false);
  const [cartdata, setcartdata] = useState();
  const [colorArr, setcolorArr] = useState();
  const [cookiehead, setCookiehead] = useState('');
  const [cookie, setCookie] = useState('');
  const [searchValue, setSearchValue] = useState('');


   const location = useLocation(); // Use useLocation() hook within the <Router> component

  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    onTop();
  }, [location]);


  const getTempId = async() =>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getTempId`);
      const data = response.data.token;
      if(data){
        setCookiehead('temp-id');
        setCookie(data);
      }
      document.cookie = `Wedesgin_tempID=${data}; path=/`; // Set the cookie in the browser's cookie storage
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    if (!cookies.Wedesgin_loggedIn_permanent && !cookies.Wedesgin_tempID) {
      getTempId();
    }
  },[cookies.Wedesgin_loggedIn_permanent,cookies.Wedesgin_tempID])


  useEffect(()=>{
    if (cookies.Wedesgin_loggedIn_permanent) {
      setCookiehead('X-CSRF-Token'); // Update to match exact case of header key
      setCookie(cookies.Wedesgin_loggedIn_permanent);
    } else if (cookies.Wedesgin_tempID) {
      setCookiehead('temp-id');
      setCookie(cookies.Wedesgin_tempID);
    }
  // eslint-disable-next-line
  },[loggedIn]);


  useEffect(()=>{
    async function getBagCount(){
      const headers = { [cookiehead]: cookie };
      if(headers && cookie && cookiehead){
            try{
              const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bag_item/count`,{ headers });
              if(data){
                setbagcount(data.data.count);
              }
            }catch(err){
              console.log(err);
            }
         }
      }
      getBagCount();
      // eslint-disable-next-line
  },[getbagcount, cookies.Wedesgin_loggedIn_permanent, cookie, cookiehead, loggedIn]);



  useEffect(()=>{
    async function verifyUser () {
      if (cookies.Wedesgin_loggedIn_permanent) {
        try {
          const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/cookie`, {
            withCredentials: true, // This will send the cookie with the request
            headers: {
              'X-CSRF-Token': cookies.Wedesgin_loggedIn_permanent // Use the cookie name as the key to access its value
            }
          });
          if(data){
            setloggedIn(true);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    verifyUser();
  },[cookies.Wedesgin_loggedIn_permanent])

  useEffect(()=>{
    async function getAllLinks(){
      try{
      const Linklist = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getLinks/all`);
      if (Linklist) {
          setlink(Linklist.data.links);
      }}
     catch (err) {
      console.log(err);
    }
  }
  getAllLinks();
  async function getColor(){
    try{
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getcolor`);
      if(response){
        setcolorArr(response.data.colorArray);
      }
    }catch(err){console.log(err);}
  }
  getColor();
   // eslint-disable-next-line
},[]);
 




  return (
    <>
      <Usercontext.Provider value={{loggedIn, setloggedIn, navHeight, 
                                    setnavHeight, selected, setselected, 
                                    link, setlink, fav, setfav, bagdata, 
                                    setbagdata, setfavItems, favItems, 
                                    bagcount, setgetbagcount, cartdata, 
                                    setcartdata, colorArr, cookiehead, 
                                    cookie, searchValue, setSearchValue}}>
          <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/account' element={<MyAccount />}></Route>
              <Route exact path='/account/:menu' element={<MyAccount />}></Route>
              <Route exact path="/favourites" element={<Favourites />}> </Route>
              <Route exact path='/index/:gender' element={<Index />}></Route>
              <Route exact path='/login' element={<Login />}></Route>
              <Route exact path='/register' element={<Regsiter />}></Route>
              <Route exact path='/admin' element={<Admin />}></Route>
              <Route exact path='/adminimg' element={<GetAdmin />}></Route>
              <Route exact path='/addlinks' element={<Addlinks />}></Route>
              <Route exact path='/index/:gender/:headerlink/:item' element={<UniversalPage />}></Route>
              <Route exact path='/product/:productId' element={<Product />}></Route>
              <Route exact path='/in_cart' element={<Cart />}></Route>
              <Route exact path='/index/search' element={<Search />}></Route>
              <Route exact path='/dashboard' element={<DashBoard/>}></Route>
              <Route exact path='/checkout' element={<Checkout/>}></Route>
              <Route exact path='/orderconfirmed' element={<OrderConfirmed/>}></Route>
          </Routes>
        </Usercontext.Provider>
    </>
  );
}

export default App;


