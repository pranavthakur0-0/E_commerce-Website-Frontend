import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { useContext, useState } from 'react';
import axios from "axios";
import './Login.scss'
import { Link } from "react-router-dom";
import { Usercontext } from "../../context/authlogin";
import { useNavigate } from "react-router-dom";


export default function Login(){
  
      
        const navigate  = useNavigate(); 
        const [info, setinfo] = useState({
          email:"",
          password:"",
          checked: false
        });
        const {setloggedIn,navHeight} = useContext(Usercontext);
          
          function SubmitLogin(e){
            e.preventDefault();
           async function LoginApi()
           {
            try{
              const data = await axios.post("http://localhost:4000/api/server/login", info,{withCredentials : true,});  
              if(data)
              {
                e.target.reset();
                setinfo({
                email:"",
                password:"",
                checked: false,
              });
              setloggedIn(true);
              navigate("/");
              }
            }
              catch(err)
              {
                console.log(err);
              }
              
           }
           LoginApi();
          }
  
          const memberinfo = (e) => {
            setinfo((info) => ({
              ...info,
              [e.target.name]: e.target.value,
    
            }
          ));
        }

    return (<>
            <Navbar></Navbar>
            <div className="nav_login nav_login_page" style={{paddingTop : `${navHeight}px`}}>
            <div className="lg_box">
              <div className="lg_header">
                  <h3>Sign in</h3>
              </div>
              <p>
              Become a Member — you'll enjoy exclusive deals, offers, invites and rewards.
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
                    <input className='input_box in_button' type="Submit" defaultValue="Sign in" />
                </div>
                <div className="box_wrap">
                    <Link to='/register' className="reg_log_links">
                    <div className='input_box in_button'>Become a Member</div>
                    </Link>
                </div>
              </form>
            </div>
          </div>
            <Footer />
    </>)
}