import './HomeCategories.scss'
import data from '../components/HomeCategories.json'
import { Link } from 'react-router-dom'
export default function HomeCategories(){
return <>
<div className="hm_cat">   
    <h1>Summer 2023 Collection</h1>
    <div className="hm_cat_wrap">

    {data.map((item)=>
    {
        return  <Link className='universal_link' to={`${item.link}`}>
                  <div className="hm_item" key={item.id}>

                <img className="img" src={`${item.img}`} alt='' />
     
                  </div>
    </Link>
    })}         
  </div>
</div>
</>
}