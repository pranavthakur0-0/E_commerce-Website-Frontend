import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { SettingsContext } from "../../context/authlogin";


export default function Settings() {
    const {settingMenu, setsettingMenu} = useContext(SettingsContext);
    const navigate = useNavigate();
    const [cookies] = useCookies(['Wedesgin_loggedIn_permanent']);
    const {menu} = useParams();
    const [User ,setUser] = useState();

     const [info, setinfo] = useState({
        email:"",
        password:"",
        date: "",
        month: "",
        year: "",
        checked: false
      });


    const getUsers = async () => {
        const user = await axios.get("http://localhost:4000/api/server/profile",{
            withCredentials: true, // This will send the cookie with the request
            headers: {
              'X-CSRF-Token': cookies.Wedesgin_loggedIn_permanent // Use the cookie name as the key to access its defaultValue
            }})
        if(user){
            setUser(user.data.user);
        }};
        
  useEffect(() => {
    if (menu === "settings") {
        getUsers();
    }
    // eslint-disable-next-line
  }, [menu]);


 const formatteddate = (dob)=>{
    const date = new Date(dob);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return formattedDate;
 }

 const formatdate  = (e, num) => {
    setinfo((info) => ({
      ...info,
      [e.target.name]: e.target.defaultValue.replace(/\D/g, '').slice(0, num),
    })
    );
    console.log(info);
}


const callApi = (event)=>{
    event.preventDefault();
    console.log(event);
}



  return (
             settingMenu === undefined ?  
             <div className="my_acc_offer_main">
             <div className="header">
                 <h3>Settings</h3>
                 <p>You can manage your account and subscriptions here</p>
             </div>
             <div className="my_details">
                 <div className="header"><span>My details</span> <span onClick={e=>{setsettingMenu("edit-profile")}}>Edit</span>  </div>
                 <div className="details">
                     <div className="heading">Email</div>
                     {User && <p>{User.email}</p>}
                     <div className="heading">First name</div>
                     <div className="heading">Last name</div>
                     <div className="heading">Date of birth</div>
                     {User && <p>{formatteddate(User.dateOfBirth)}</p>}
                     <div className="heading">Phone number</div>
                     <div className="heading">Gender</div>
                     <div className="heading">Market</div>
                     <div className="heading">Postcode</div>
                     <div className="heading">Staff card</div>
                 </div>
             </div>
             <div className="sub_settings">
                 <div className="sub_header">
                     <h3>Payment settings</h3>
                     <span onClick={e=>{setsettingMenu("payment")}}>Edit</span>
                     </div>
                 <p>Due to new government regulation (act CO.DPSS.POLC.No.S-516/02-14-003/2021-22) we have temporarily removed the option to save a new card and to use an already saved card. Request you to enter your card details again for the payment.</p>
             </div>
             <div className="sub_settings">
                 <div className="sub_header">
                     <h3>Address Book</h3>
                     <span onClick={e=>{setsettingMenu("address")}}>Edit</span>
                     </div>
                 <p>You can also add and edit delivery addresses here</p>
                 <p>No home address saved.</p>
             </div>
             <div className="sub_settings">
                 <div className="sub_header">
                     <h3>Newsletter Subscriptions</h3>
                     <span onClick={e=>{setsettingMenu("newsletter")}}>Edit</span>
                     </div>
                 <p>Newsletter Subscription.</p>
                 <p>Yes, keep me subscribed.</p>
                 <br />
                 <p>Direct Mail Marketing.</p>
                 <p>Yes, keep me subscribed.</p>
             </div>
         
             <div className="sub_settings">
                 <div className="sub_header">
                     <h3>Privacy</h3>
                     </div>
                 <p className="profile_links" style={{paddingBottom : "1rem"}} onClick={e=>{setsettingMenu("password")}}>Change password</p>
                 <p className="profile_links">My Personal Data.</p>
                 <p style={{fontSize : '0.73rem', color : 'gray'}}>On We.Desgin Group´s privacy portal you can see your personal data across our brands and countries. Here you can edit subscriptions, request a copy of your data or choose to delete your information.</p>
             </div>
         </div>

         : settingMenu ==="edit-profile" ? 

         
         <div className="my_acc_offer_main">
         <div className="header">
             <h3>Settings</h3>
             <p>You can manage your account and subscriptions here</p>
         </div>
         <div className="my_details">
                 <div className="header"><span>My details</span></div>
                 <div className="input_gap_">
                    <form onSubmit={callApi} >
                 <div className="input_wraper">
                    <label htmlFor="email">Email <span>*</span> </label>
                    <input type="text" id="email" defaultValue={User.email} name="email" />
                    <p>
                    Remember, if you change your email, you need to confirm it again. Make sure you click on the link in the confirmation email we sent you.
                    </p>
                 </div>
                 <div className="input_wraper">
                    <label htmlFor="fname">First Name <span>*</span> </label>
                    <input type="text" id="fname" defaultValue={User.firstname} name="fname" />
                 </div>
                 <div className="input_wraper">
                    <label htmlFor="lname">Last Name <span>*</span> </label>
                    <input type="text" id="lname" defaultValue={User.lastname}  name="lname" />
                 </div>
                 <div className="input_wraper">
                 <label htmlFor="dobd">Date Of Birth <span>*</span> </label>
                 <div className="mb_dob_wrap">
                <input aria-label="DD" aria-required="true" name='date' placeholder='DD'  defaultValue={formatteddate(User.dateOfBirth).slice(0,2)}  maxLength={2}  className='input_box' id='dobd' pattern="[0-9]*" 
                onChange={e=>formatdate(e,2)}  type="text" />
                <span>/</span>
              
                <input  aria-label="MM" aria-required="true" name='month' placeholder='MM'
                defaultValue={formatteddate(User.dateOfBirth).slice(3,5)}  maxLength={2}   className='input_box' id='dobm' pattern="[0-9]*" onChange={e=>formatdate(e,2)}  type="text" />
                <span>/</span>
                <input  aria-label="YYYY" aria-required="true" name='year' placeholder='YYYY'  maxLength={4} className='input_box' id='doby'defaultValue={formatteddate(User.dateOfBirth).slice(6,10)} pattern="[0-9]*" onChange={e=>formatdate(e,4)} type="text" />
                </div>
                 </div>
                <div className="input_wraper">
                    <label htmlFor="phone_num">Phone Number </label>
                    <input type="text" id="phone_num" defaultValue={User.number} name="phone_num" />
                 </div>
                 <div className="input_wraper">
                 <label htmlFor="gender">Gender <span>*</span> </label>
                 <select  id = "gender" >  
                            <option> Please Select a gender </option>
                            <option> Male </option>
                            <option> Female </option>

                            </select>  
                 </div>
                 <div className="input_wraper">
                    <label htmlFor="postal" defaultValue={User.postalCode}>Postal Code <span>*</span> </label>
                    <input type="number" id="postal" name="postal" />
                 </div>
                 <div className="input_wraper">
                    <label htmlFor="staff" defaultValue={User.staffCard}>Staff Card </label>
                    <input type="text" id="staff" name="staff" />
                 </div>
                 <div className="input_wraper">
                    <label htmlFor="market" defaultValue={User.market}>Market  </label>
                    <input type="text" id="market" name="market" />
                 </div>
                 <div className="input_wraper">
                    <label htmlFor="password">Password <span>*</span> </label>
                    <input type="password" id="password" name="pass" />
                    <p>We.Desgin will process your data in accordance with H&M's Privacy Notice</p>
                 </div>
                 <div className="button_wrapper">
                    <button type="submit">Save</button>
                    <button 
                    onClick={e=>{navigate("/account/settings")
                    setsettingMenu(undefined);
                }}>Cancel</button>
                 </div>
                 </form>
             </div>
             </div>
     </div> 
     
     :  settingMenu ==="payment" ? 
                 <div className="my_acc_offer_main">
                 <div className="header">
                     <h3>PAYMENT INFORMATION</h3>
                     <p>Due to new government regulation (act CO.DPSS.POLC.No.S-516/02-14-003/2021-22) we have temporarily removed the option to save a new card and to use an already saved card. Request you to enter your card details again for the payment.</p>
                 </div>
                 <div className="my_details">
                         <div className="header"><span>Bank account</span></div>
                         <form>
                         <div className="input_gap_">
                         <p>To be able to refund your returns for orders paid on delivery, please fill in your bank account details in the form below. We need the account holder name, the IFSC Code (Indian Financial System Code) and the account number.The IFSC is a unique code that identifies your bank. Please write letters in the IFSC code in CAPITAL LETTERS. If you have problems finding your IFSC code please contact your bank.</p>
                        <div className="input_wraper">
                            <h2 style={{paddingBottom:'0.2rem'}}>Bank account holder name</h2>
                           <label htmlFor="holder_name" defaultValue={User.postalCode}>Please specify a valid Account holder name <span>*</span> </label>
                           <input type="number" id="holder_name" name="holderName" />
                        </div>

                        <div className="input_wraper">
                           <label htmlFor="ifscCode" defaultValue={User.postalCode}>IFSC code <span>*</span> </label>
                           <input type="number" id="ifscCode" name="IFSC-Code" />
                        </div>
                        <div className="input_wraper">
                           <label htmlFor="acc_num" defaultValue={User.postalCode}>Enter a bank account number <span>*</span> </label>
                           <input type="number" id="acc_num" name="accountNumber" />
                        </div>  
                        <div className="input_wraper">
                 <label htmlFor="dobd">Date Of Birth <span>*</span> </label>
                 <div className="mb_dob_wrap">
                <input aria-label="DD" aria-required="true" name='date' placeholder='DD'  defaultValue={formatteddate(User.dateOfBirth).slice(0,2)}  maxLength={2}  className='input_box' id='dobd' pattern="[0-9]*" 
                onChange={e=>formatdate(e,2)}  type="text" />
                <span>/</span>
              
                <input  aria-label="MM" aria-required="true" name='month' placeholder='MM'
                defaultValue={formatteddate(User.dateOfBirth).slice(3,5)}  maxLength={2}   className='input_box' id='dobm' pattern="[0-9]*" onChange={e=>formatdate(e,2)}  type="text" />
                <span>/</span>
                <input  aria-label="YYYY" aria-required="true" name='year' placeholder='YYYY'  maxLength={4} className='input_box' id='doby'defaultValue={formatteddate(User.dateOfBirth).slice(6,10)} pattern="[0-9]*" onChange={e=>formatdate(e,4)} type="text" />
                </div>
                 </div>   
                 <div className="button_wrapper">
                    <button type="submit">Save</button>
 
                 </div>             
                        </div>
                        
                        </form>
                 </div> 
                         
                 </div> 
       :  settingMenu ==="address" ? 
       <div className="my_acc_offer_main">
       <div className="header">
           <h3>Address Book</h3>
       </div>
       <div className="my_details">
               <div className="header"><span>Billing Address</span></div>
               <form>
               <div className="input_gap_">
                <div className="address_wrap">
                <p>No home address saved.</p>
               <p className="profile_links" onClick={e=>{setsettingMenu("address_edit")}}>Add new Home adderss</p>
                </div>
             </div>
              </form>
       </div> 
       <div className="my_details">
               <div className="header">
                <span>Delivery Address</span>
                </div>
               <div className="input_gap_">
                <div className="address_wrap">
                <p>No delivery address saved.</p>
                </div>
             </div>
       </div> 
               
       </div> 
       :  settingMenu ==="address_edit" ? 
       <div className="my_acc_offer_main">
       <div className="header">
           <h3>Address Book</h3>
       </div>
       <div className="my_details">
               <div className="header"><span>Billing Address</span></div>
               <form>
               <div className="input_gap_">
                <div className="address_wrap">
                <div className="input_wraper">
                    <label htmlFor="street">Address line 1 <span>*</span> </label>
                    <input type="text" id="street" name="address1" />
                    <p className="error" defaultValue="Street address"></p>
                 </div>
                 <div className="input_wraper">
                    <label htmlFor="flat_house">Address line 2 </label>
                    <input type="text" id="flat_house" name="address2" />
                 </div>
                 <div className="input_wraper">
                    <label htmlFor="pin">Pincode <span>*</span> </label>
                    <input type="number" id="pin" name="pincode" />
                 </div>
                 <div className="input_wraper">
                    <label htmlFor="city">City <span>*</span> </label>
                    <input type="number" id="city" name="city" />
                 </div>
                 <div className="input_wraper">
                    <label htmlFor="state">State <span>*</span> </label>
                    <select aria-required="true" required="" id="state" name="province" type="combobox">
                        <option disabled="" value="">Please enter a state</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Ladakh">Ladakh</option>
                        </select>
                 </div>
                 <div className="button_wrapper">
                    <button type="submit">Save</button>
                    <button 
                    onClick={e=>{
                        e.preventDefault();
                        setsettingMenu("address");
                }}>Cancel</button>
                 </div>
                </div>
             </div>
              </form>
        </div>             
       </div> 

:  settingMenu ==="newsletter" ? 
       <div className="my_acc_offer_main">
       <div className="header">
           <h3>Edit Subscriptions</h3>
       </div>
       <div className="my_details">
               <div className="header">
                <span>Newsletter Subscription</span></div>
               <form>
               <div className="input_gap_" style={{gap:"0.5rem"}}>
                    <div className="checkBox_wrap">
                        <div className="input_check">
                        <input type="radio" id="true" name="news" />
                        <label htmlFor="true">Yes, keep me subscribed.</label>
                        </div>
                        <div className="input_check">
                            <input type="radio" id="false" name="news" /><label htmlFor="false">Unsubscribe me.</label>
                        </div>
                    </div>
                                   <div className="header" style={{paddingBottom : '0px', paddingTop : '1rem'}}>
                <span>Direct Mail Marketing</span></div>
                    <div className="checkBox_wrap">
                        <div className="input_check">
                        <input type="radio" id="yes" name="dms" />
                        <label htmlFor="yes">Yes, keep me subscribed.</label>
                        </div>
                        <div className="input_check">
                            <input type="radio" id="no" name="dms" /><label htmlFor="no">Unsubscribe me.</label>
                        </div>
                    </div>
                    <div className="check_box_wrapper">
                    <input className="checkbox" type="checkbox" id="checkbox" name="city" />
                    <label htmlFor="checkbox">I agree to let H&M process my personal data in accordance with We.Design Privacy Notice  in order to send me personalized marketing material, and I confirm that I am </label>
                 </div>
                 <span>Rate & Review emails can be unsubscribed to through the link in the email.</span>
                 <div className="button_wrapper">
                    <button type="submit">Save</button>
                    <button 
                    onClick={e=>{navigate("/account/settings")
                    setsettingMenu(undefined);
                }}>Cancel</button>
                 </div>
             </div>
              </form>
       </div>             
       </div> 
        :  settingMenu ==="password" ? 
        <div className="my_acc_offer_main">
        <div className="header">
            <h3>Change password</h3>
        </div>
        <div className="my_details">
                <div className="header"><span>Billing Address</span></div>
                <form>
                <div className="input_gap_">
                <div className="input_wraper">
                    <label htmlFor="email">Email <span>*</span> </label>
                    <input type="text" id="email" defaultValue={User.email} name="email" />
                    <p style={{fontSize : '0.7rem'}}>Password changing link will be sent to your email and it will redirect to another page which will change password</p>
                </div>
                <div className="button_wrapper">
                    <button type="submit">Send Link</button>
                 </div>
              </div>
            </form>
        </div>          
        </div> 
       :  <>asdfsadf</>)
}
