import './Footer.scss'
import { BsArrowRight } from "react-icons/bs";
export default function Footer(){
return <>
    <div className="ft_main">
           <div className="link">
           <div className="cat_">
            <h2>SHOP</h2>
            <ul>
                <li>Ladies</li>
                <li>Men</li>
                <li>Baby</li>
                <li>Kids</li>
                <li>HOME</li>
                <li>Sport</li>
            </ul>
           </div>
            <div className="info">
         <h2>CORPORATE INFO</h2>
            <ul>
                <li>Career at We.Desgin</li>
                <li>About We.Design group</li>
                <li>Sustainability</li>
                <li>Press</li>
                <li>Investor relations</li>
                <li>Corporate governance</li>
            </ul>
            </div>
            <div className="help">
            <h2>HELP</h2>
            <ul>
                <li>Customer Service</li>
                <li>My We.Desgin</li>
                <li>Find a store</li>
                <li>Legal & Privacy</li>
                <li>Contact</li>
                <li>Report a scam</li>
            </ul>
            </div>
            <div className="news">
            <h2>Sign up for newsletter</h2>
                <p>Sign up now and be the first to know about exclusive offers,
                    <br /> latest fashion news & style tips!</p>
                <button>Sign up <BsArrowRight></BsArrowRight></button>
            </div>
           </div>
           <div className="logo">
            <span>We.</span>
            Design
            </div>
            <div className="india">India</div>
    </div>
</>
}