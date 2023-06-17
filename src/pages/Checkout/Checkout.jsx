import { useContext, useEffect, useState } from "react";
import "./Checkout.scss"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Usercontext } from "../../context/authlogin";
export default function Checkout(){
    const [cookies] = useCookies(["Wedesgin_loggedIn_permanent"]);
    const [getdata , setgetdata] = useState();
    const {cartdata, setcartdata, cookie, cookiehead}= useContext(Usercontext);
    const [totalAmt, setotalAmt] = useState(0);
    const [allValuesFilled, setAllValuesFilled] = useState(false);
    const [addinfo, setaddinfo] = useState({
      firstname : '',
      lastname : '',
      email : '',
      date : '',
      month: '',
      year : '',
      phonenumber : '',
      address1 : '',
      address2 : '',
      city : '',
      postal : '',
      state : '',
      paymentType :'',
    });

    const navigate = useNavigate();
    useEffect(()=>{
      if(cartdata && cartdata.length <= 0){
        navigate('/');
      }
      // eslint-disable-next-line 
    },[cartdata])



    useEffect(() => {
      console.log(addinfo);
      const {
        firstname,
        lastname,
        date,
        month,
        year,
        phonenumber,
        address1,
        address2,
        city,
        postal,
        state,
        paymentType
      } = addinfo || {};
    
      const isAnyValueMissing =
        !firstname ||
        !lastname ||
        !date ||
        !month ||
        !year ||
        !phonenumber ||
        !address1 ||
        !address2 ||
        !city ||
        !postal ||
        !state ||
        !paymentType;
    
      setAllValuesFilled(!isAnyValueMissing);
    }, [addinfo]);
    

    const [countryCode, setCountryCode] = useState("");

    useEffect(() => {
      // Function to get the country code based on the user's location
      const getCountryCodeFromLocation = async (latitude, longitude) => {
        const apiKey = "f8c945f8a64448db9c8797e3d369d638";
        const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
  
        try {
          const response = await fetch(geocodeUrl);
          const data = await response.json();
  
          // Extract the country from the response
          const country = data.results[0].components.country;
  
          // Map the country to the country code
          const countryCodes = {
            // Add more country codes as needed
            "United States": "+1",
            Canada: "+1",
            "United Kingdom": "+44",
            // ...
          };
  
          if (countryCodes.hasOwnProperty(country)) {
            setCountryCode(countryCodes[country]);
          } else {
            setCountryCode("");
          }
        } catch (error) {
          console.error("Error getting country code:", error);
          setCountryCode("");
        }
      };

  
      // Get the user's location using the geolocation API
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              getCountryCodeFromLocation(latitude, longitude);
            },
            (error) => {
              console.error("Error getting location:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      };
      getLocation();
    }, []);
  

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



      const getorderUsr = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/order/user`, {
            withCredentials: true,
            headers: {
              'X-CSRF-Token': cookies.Wedesgin_loggedIn_permanent
            }
          });
          const user = response.data.user;
          setaddinfo(user);
        } catch (error) {
          console.error(error);
        }
      };
  
      useEffect(() => {
        getorderUsr();
        // eslint-disable-next-line
      }, [getdata]);


      useEffect(()=>{
        async function fetchBag(){
            const headers = { [cookiehead]: cookie };
            if(headers && cookie && cookiehead){
            try{
                const data = await axios.get(`${process.env.REACT_APP_SERVER_URL}/bag_item`,{headers});
                if(data){
                    setcartdata(data.data);
                    setgetdata(cur=>!cur);
                }
            }catch(err){
                console.log(err);
            }
        }
    }
        fetchBag();
     
        // eslint-disable-next-line
    },[cookie,cookiehead])

  

    const handleChange = (e) => {
      const { name, value } = e.target;
      setaddinfo(prevAddInfo => {
        const updatedAddInfo = {
          ...prevAddInfo,
          [name]: value
        };
    
        return updatedAddInfo;
      });
    };
    const callApi = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/order`, {addinfo, cartdata, totalAmt},
        {headers: {
              'X-CSRF-Token': cookies.Wedesgin_loggedIn_permanent,},});
        if(response){
          setgetdata(cur=>!cur);
          if(response.data.email){
            const email = response.data.email;
            navigate('/orderconfirmed', {state : email});
          }
      
        }
      } catch (error) {
        console.error(error);
      }
    };
    


   
    return (<>
            <div className="main_checkout">
                    <div className="navbar">
                        <div className="nav_mod_2_home_link" style={{color: "black"}}><span>We.</span>Desgin</div>
                        <div className="go_back" onClick={e=>navigate('/in_cart')}>
                        <svg className="go_back_icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false"><path d="M12.001 3L2 12.496l10.001 9.501.688-.726L4 12.996h18.001v-1H4l8.689-8.271z"></path></svg>
                        <div className="text">Back to shopping bag</div>
                        </div>
                    </div>
                    <div className="checkOut_heading">
                    Checkout
                    </div>
                    <div className="checkOut_con">
                            <div className="checout_info">
                            <div className="check_user_info">
                              <div className="check_user_text">
                                 <div className="header">
                               <h2>My information</h2>
                               </div>
                             <div className="wrapper">
                               <label htmlFor="firstname">
                                 <span>
                                   First Name <span>*</span>{" "}
                                 </span>
                                 <input type="text" autoComplete="off"   defaultValue={addinfo && addinfo.firstname ? addinfo.firstname : ""} onChange={(e) => handleChange(e)} name="firstname" id="firstname"
                                 />
                               </label>
                               <label htmlFor="lastname">
                                 <span>
                                   Last Name <span>*</span>{" "}
                                 </span>
                                 <input type="text" autoComplete="off" defaultValue={addinfo && addinfo.lastname ? addinfo.lastname : ""}  onChange={(e) => handleChange(e)} name="lastname" id="lastname"
                                 />
                               </label>
                             </div>
                             <label htmlFor="lastname">
                               <span>
                                 Last Name <span>*</span>{" "}
                               </span>
                             </label>
                             <div className="mb_dob_wrap">
                               <input aria-label="DD" autoComplete="off" aria-required="true" name="date" placeholder="DD" maxLength={2} defaultValue={addinfo && addinfo.date ? addinfo.date : ""}  onChange={(e) => handleChange(e)} className="input_box" id="dobd" pattern="[0-9]*" type="text"
                               />
                               /
                               <input aria-label="MM" autoComplete="off" aria-required="true" name="month" placeholder="MM" defaultValue={addinfo && addinfo.month ? addinfo.month : ""} maxLength={2}  onChange={(e) => handleChange(e)} className="input_box" id="dobm" pattern="[0-9]*" type="text"
                               />
                               /
                               <input aria-label="YYYY" autoComplete="off" aria-required="true" name="year" placeholder="YYYY" defaultValue={addinfo && addinfo.year ? addinfo.year : ""} maxLength={4}  onChange={(e) => handleChange(e)} className="input_box" id="doby" pattern="[0-9]*" type="text"
                               />
                             </div>
                             <label htmlFor="town">
                               <span>
                                 Phone Number <span>*</span>{" "}
                               </span>
                               <div className="phone_number">
                                 <div className="code">{countryCode}</div>
                                                    
                                 <input
                                   type="number"
                                   autoComplete="off"
                                   onChange={(e) => handleChange(e)}
                                   defaultValue={addinfo && addinfo.phonenumber ? addinfo.phonenumber : ""}
                                   name="phonenumber"
                                   id="phonenumber"
                                 />
                               </div>
                             </label>
                                </div>
                            </div>
                            <div className="check_user_info">
                           <div className="header">
                              <h2>Billing address</h2>
                           </div>
                            <div className="check_user_text">
                       
                                    <label htmlFor="address1"><span>Address line 1 <span>*</span></span>
                                        <input type="text" autoComplete="off" onChange={e=>handleChange(e)} defaultValue={addinfo && addinfo.address1 ? addinfo.address1 : ""} name="address1" id="address1" />
                                    </label>
                                    <label htmlFor="address2"><span>Address line 2 </span>
                                        <input type="text" autoComplete="off" onChange={e=>handleChange(e)} defaultValue={addinfo && addinfo.address2 ?addinfo.address2 : ""} name="address2" id="address2" />
                                    </label>
                                    <div className="wrapper">
                                    <label htmlFor="city"><span>Town/City <span>*</span>  </span>
                                        <input type="text" autoComplete="off" onChange={e=>handleChange(e)} defaultValue={addinfo && addinfo.city ? addinfo.city : ""} name="city" id="city" />
                                    </label>
                                    <label htmlFor="postal"><span>Pincode <span>*</span> </span>
                                        <input type="number" autoComplete="off" onChange={e=>handleChange(e)} defaultValue={addinfo && addinfo.postal ? addinfo.postal : ""} name="postal" id="postal" />
                                    </label>
                                  
                                    </div>
                                   <select autoComplete="off" id="state" name="state" onChange={e=>handleChange(e)}>
                                    <option value="">Select state</option>
                                    <option value="AN">Andaman and Nicobar Islands</option>
                                    <option value="AP">Andhra Pradesh</option>
                                    <option value="AR">Arunachal Pradesh</option>
                                    <option value="AS">Assam</option>
                                    <option value="BR">Bihar</option>
                                    <option value="CH">Chandigarh</option>
                                    <option value="CT">Chhattisgarh</option>
                                    <option value="DN">Dadra and Nagar Haveli</option>
                                    <option value="DD">Daman and Diu</option>
                                    <option value="DL">Delhi</option>
                                    <option value="GA">Goa</option>
                                    <option value="GJ">Gujarat</option>
                                    <option value="HR">Haryana</option>
                                    <option value="HP">Himachal Pradesh</option>
                                    <option value="JK">Jammu and Kashmir</option>
                                    <option value="JH">Jharkhand</option>
                                    <option value="KA">Karnataka</option>
                                    <option value="KL">Kerala</option>
                                    <option value="LA">Ladakh</option>
                                    <option value="LD">Lakshadweep</option>
                                    <option value="MP">Madhya Pradesh</option>
                                    <option value="MH">Maharashtra</option>
                                    <option value="MN">Manipur</option>
                                    <option value="ML">Meghalaya</option>
                                    <option value="MZ">Mizoram</option>
                                    <option value="NL">Nagaland</option>
                                    <option value="OR">Odisha</option>
                                    <option value="PY">Puducherry</option>
                                    <option value="PB">Punjab</option>
                                    <option value="RJ">Rajasthan</option>
                                    <option value="SK">Sikkim</option>
                                    <option value="TN">Tamil Nadu</option>
                                    <option value="TG">Telangana</option>
                                    <option value="TR">Tripura</option>
                                    <option value="UP">Uttar Pradesh</option>
                                    <option value="UT">Uttarakhand</option>
                                    <option value="WB">West Bengal</option>
                                </select>
                         
                              
                            </div>

                            </div>
                            <div className="viewOrder_details">
                                    <div className="text"><h2>View order details</h2> <p>{cartdata && cartdata.length > 0 ? <>{cartdata.length} items</> : ""}</p></div>
                                    <div className="image_wrap">
                                    {cartdata && cartdata.length > 0 ? cartdata.map((item,index)=>{
                                        return (<div className="div_products" key={index}>
                                                <img src={item.image[0]} alt="" className="image" />
                                        </div>
                                        )
                                    }) : ""}
                                    </div>
                                  
                                </div>

                              <div className="PaymentType">
                                <h2>Payment</h2>
                                <p>How would you like to pay?</p>
                                <div className="radio_bt">
                                <div className="wrapper">
                                <input type="radio" id="online" onChange={e=>handleChange(e)}   autoComplete="off" checked={addinfo && addinfo.paymentType === 'online'}  name="paymentType" value="online" />
                              <label htmlFor="online">Online Payments</label>
                                </div>
                            <div className="wrapper">
                            <input type="radio" id="cash" onChange={e=>handleChange(e)} name="paymentType" autoComplete="off"  checked={addinfo && addinfo.paymentType === 'cashOnDelivery'} value="cashOnDelivery" />
                              <label htmlFor="cash">Cash on Delivery</label>
                            </div>
                                </div>
                           
                     
                              </div>
                              
                    </div> 
                  
                    
                            <div className="checkout_sidebar">
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
                    <br />
                    <br />
                    <p>We will process your personal data in accordance with the H&Ms Privacy Notice.</p>
                    <br />
                    <p>By continuing, you agree to H&M's General Terms and Conditions.</p>
                    <div className="checkOut">
                    <button  className={allValuesFilled ? "non_empty" : "empty"}
                      disabled={!allValuesFilled}
                      onClick={allValuesFilled ? (e) => callApi(e) : null}
                    >Complete Purchase</button>

                    </div>
                    <div className="text">
                        <p>    Need help? Please contact Customer Service.</p>
                    </div>
                </div>
                            </div>
                    
                    </div>
                    <div className="set_footer_bar">
                    <svg className="Icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" focusable="false" role="presentation"><path d="M12,0 a6.5,6.5 0 0 1 6.5,6.5 V9 H22 v13 a2,2 0 0 1 -2,2 H4 a2,2 0 0 1 -2,-2 V9 h3.5 V6.5 A6.5,6.5 0 0 1 12,0 zm9,10 H3 v12 a1,1 0 0 0 1,1 h16 a1,1 0 0 0 1,-1 V10 zm-9,5 a2,2 0 1 1 0,4 a2,2 0 0 1 0,-4 zm0,1 a1,1 0 1 0 0,2 a1,1 0 0 0 0,-2 zm0,-15 a5.5,5.5 0 0 0 -5.5,5.5 V9 h11 V6.5 A5.5,5.5 0 0 0 12,1 z"></path></svg>
                            All data will be encrypted
                    </div>
            </div>
    </>)
}