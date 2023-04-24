import { useState } from "react"
import { BsChevronDown} from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import {ReactSVG} from "react-svg";
import Svg1 from "./Svg1.svg";
import Svg2 from "./Svg2.svg"
import Svg3 from "./Svg3.svg"
import Svg4 from "./Svg4.svg"
import Svg5 from "./Svg5.svg"
import Svg6 from "./Svg6.svg"
import Svg7 from "./Svg7.svg"
import "./Points.scss"

const data = [{ 
                id:1,
                icon: Svg1,
                h1 : "Purchase",
                p1 : "Every time you shop online or in store, you'll earn points. Rs. 50.00 = 1 points.",
                h2 : "And there’s more!",
                p2 : "From time to time, you can earn extra points on your purchases — so keep an eye out!"
            },
            {
                id:2,
                icon: Svg2,
                h1 : "Garment collecting",
                p1 : "Leave your unwanted textiles in our stores and get a discount to use on your next purchase and 20 points!",
            },
            {
                id:3,
                icon: Svg3,
                h1 : "Own bag",
                p1 : "Bring your own bag when you shop in our stores and we’ll reward you with 5 points. ",
            },
            {
                id:4,
                icon: Svg4,
                h1 : "Invited a friend",
                p1 : "Invite a friend to become a member and earn 50 points when they complete their first purchase.",
            },
            {
                id:5,
                icon: Svg5,
                h1 : "Submitted a review",
                p1 : "Review your latest online purchase and earn 2 points.",
            },
            {
                id:6,
                icon: Svg6,
                h1 : "Added personal details",
                p1 : "Complete your membership profile and earn 20 points. ",
            }
            ,
            {
                id:7,
                icon: Svg7,
                h1 : "Other",
                p1 : "When you receive points for corrections, post-registration, or similar activities.",
            }]



export default function Points(){
    const [pointdrop, setpointdrop] = useState(false);
    return (<>
     <div className="my_acc_offer_main">
       <div className="header">
            <p>Member</p>
           <h3 style={{fontSize : '1.8rem', paddingTop : '1rem', fontWeight : '600'}}>0 Points</h3>
       </div>
       <div className="my_details my_details_points">
             <p id="points_header" style={pointdrop ?  {fontWeight : '600', cursor : "pointer"} : {fontWeight : '400', cursor : "pointer"}} onClick={e=>setpointdrop(current => !current)}><span>Points</span> <span>0 p
                {pointdrop ?  <IoIosArrowUp /> : <BsChevronDown /> }</span></p>

        {pointdrop ? <>             <ul className="points_sub_points">
                    <li><span>Purchase</span><span>0 p</span></li>
                </ul>

                <ul className="points_sub_points">
                    {data.map((item, index)=>{
                        return <li className="sub_points_" key={index}>
                        <div className="icon">
                        <ReactSVG src={item.icon} className="icon-height" />
                        </div>
                        <div className="text">
                                {item.h1 ? <h3>{item.h1}</h3> : "" }
                                {item.p1 ? <p>{item.p1}</p> : "" }
                                {item.h2 ? <h3>{item.h2}</h3> : "" }
                                {item.p2 ? <p>{item.p2}</p> : "" }
                        </div>
                    </li>
                    })}
                </ul>
            </> : ''}
   
        </div> 
       </div> 
    </>)
}