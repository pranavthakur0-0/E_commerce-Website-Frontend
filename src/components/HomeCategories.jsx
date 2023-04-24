import './HomeCategories.scss'
import data from '../components/HomeCategories.json'
export default function HomeCategories(){
return <>
<div className="hm_cat">   
    <h1>Popular Categories</h1>
    <div className="hm_cat_wrap">

    {data.map((item)=>
    {
        return <div className="hm_item" key={item.id}>
                <div className="img" style={{backgroundImage : `url(${item.img})`}}></div>
          <div className="title">{item.head}</div>
    </div>
    })}         
  </div>
</div>
</>
}