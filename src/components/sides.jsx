import './Sides.scss'
import { Link } from 'react-router-dom';
export default function Sides(){
return <>
      <h1 className='sides'>Pick Your Preference</h1>
        <div className="sd_main">
            <div className="men side">
            <Link to={"/index/men"}>
                <div className="overlay"></div>
                <button className='universal_link'>Mens Clothing</button>
                </Link>
                </div>
 
            <div className="women side">
            <Link to={"/index/women"}>
            <div className="overlay"></div>
  
            <button>Womens Clothing</button>
            </Link></div>
        </div>
</>
}