export default function Offers(){
    const data =[{id:1,
        img:"https://lp2.hm.com/hmgoepprod?source=url[https://www2.hm.com/content/dam/Hm_Member_and_Loyalty/rewards/in/in08e06.jpg]&scale=size[250]&sink=format[jpeg],quality[80]", 
        head:"Get 15% off on purchase of Rs.1000", 
        type:"Partnership",
        valid:"Expires on 31/03/2023" 
    },
    {id:2,
        img:"https://lp2.hm.com/hmgoepprod?source=url[https://www2.hm.com/content/dam/Hm_Member_and_Loyalty/rewards/in/in08e01.jpg]&scale=size[768]&sink=format[jpeg],quality[80]", 
        head:"Exclusive 20% off for a select period only", 
        type:"Partnership",
        valid:"Expires on 30/04/2023" 
    },
    {id:3,
        img:"https://lp2.hm.com/hmgoepprod?source=url[https://www2.hm.com/content/dam/Hm_Member_and_Loyalty/rewards/in/in08e06.jpg]&scale=size[250]&sink=format[jpeg],quality[80]", 
        head:"Get Rs.100 off on F&B purchase of Rs.500", 
        type:"Partnership",
        valid:"Expires on 31/03/2023" 
    },
    {id:4,
        img:"https://lp2.hm.com/hmgoepprod?source=url[https://www2.hm.com/content/dam/Hm_Member_and_Loyalty/rewards/in/in08e03_v3.jpg]&scale=size[768]&sink=format[jpeg],quality[80]", 
        head:"Get 20% off on all Paradyes products", 
        type:"Partnership",
        valid:"Expires on 31/03/2023" 
    },];
    return (<>
            <div className="my_acc_offer_main">
                <div className="header">
                    <h3>My offers</h3>
                </div>
                <div className="offer_con">
                    {data ? data.map((item,index)=>{
                        return <div className="offer_wrap" key={index} >
                            <div className="offer_img_con" style={{backgroundImage : `url(${item.img})`}}></div>
                            <h3>{item.head}</h3>
                            <p>{item.type}</p>
                            <p>{item.valid}</p>
                        </div>
                    }) : <div className="no_offers">
                            <h1>No offers are available</h1>
                    </div>}
                </div>
           

            </div>
    </>)
}