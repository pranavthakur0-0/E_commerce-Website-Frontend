import axios from "axios";
import { useContext, useState } from "react";
import '../Login/Login.scss'
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { Usercontext } from "../../context/authlogin";

export default function Register(){
  const {navHeight} = useContext(Usercontext);
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


    return (<>
       <Navbar></Navbar>
          <div className="nav_login nav_login_page" style={{paddingTop : `${navHeight}px`}}>
            <div className="lg_box">
              <div className="lg_header">
                <h3>Member</h3>
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
                <Link to='/login' className="reg_log_links">
                    <div className='input_box in_button' onClick={e=>{
                      setinfo('');
                  }} >Back to sign in ?</div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <Footer />
    </>)
}