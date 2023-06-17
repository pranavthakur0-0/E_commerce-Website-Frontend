import { useEffect, useRef, useState } from 'react';
import './NewArrival.scss'
export default function NewArrival(){
    const json = [{
        id:1,price: "Rs. 1,499.00" ,gender:"", name:"Jacquard-knit jumper",img:"https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F8d%2F6d%2F8d6ddabb81787bd59c7cf16c46342b26b9c041d6.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
    },{  
        id:2,price: "Rs. 5,999.00" ,gender:"", name:"Regular Fit Linen jacket",img:"https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F06%2F35%2F0635fd2d78a4014823ae13155b297b5108f97da2.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    },{
        id:3,price: "Rs. 1,499.00" ,gender:"", name:"Wide linen-blend trousers",img:"https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F2b%2F91%2F2b91557e74cc1291738a56cc401041f72b3b6d71.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
    },{
        id:4,price: "Rs. 1,299.00" ,gender:"", name:"Polarised sunglasses",img:"https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F5e%2F15%2F5e150983b3559b5ff2dcfe524da227b80b69e80c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    },{
        id:5,price: "Rs. 1,999.00" ,gender:"", name:"Regular Fit Patterned resort shirt",img:"https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fc0%2Ff4%2Fc0f4289fae8c03fa493fd5bcccfe386907ec95b2.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    },{
        id:6,price: "Rs. 2,999.00" ,gender:"", name:"Regular Fit Linen-blend overshirt",img:"https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fe1%2Fdb%2Fe1db5322db31686be2bcec96fc799ee43080f2b5.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    },{
        id:7,price: "Rs. 1,499.00", gender:"", name:"Printed sweatshirt",img:"https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F80%2Faa%2F80aa55768bd2e236704bc65879d3f7fff3d16664.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    },{
        id:8,price: "Rs. 2,999.00" ,gender:"", name:"Single-breasted blazer",img:"https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Ffb%2F15%2Ffb154a08560f936674792bc5736930b1b0906bfa.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
    },{
        id:9,price: "Rs. 1,499.00" ,gender:"", name:"Asymmetric hole-knit jumper",img:"https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F0d%2Fa8%2F0da851972a8d33f1c7eb11f9329724324075e691.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
    }]

    const new_outer = useRef();
    let [newindex, newsetindex] = useState(1);
    useEffect(() => {
        const newslides = document.querySelectorAll(".new_items");
        new_outer.current.style.transform = `translateX(-${1 * 15}rem)`;
        const newendSlide = newslides[newslides.length - 1];
        const newcloneEnd = newendSlide.cloneNode(true);
        new_outer.current.insertBefore(newcloneEnd, new_outer.current.children[0]);
      }, []);



      function newhandle(newdirection) {
        const newslides = document.querySelectorAll(".new_items");
        new_outer.current.style.transition = '0.8s ease-in-out';
        console.log(newindex);
        if(newdirection === 'left' && newindex > 1)
        {
            newsetindex(curIndex => curIndex - 1)
        }
        else if(newdirection === 'right' && newindex < newslides.length-3){
            
            newsetindex(curIndex => curIndex + 1)
        }
        new_outer.current.addEventListener('transitionend', () => {
            new_outer.current.style.transition = '0s';
            new_outer.current.removeEventListener('transitionend', () => { });
   
        });
      }
      

      useEffect(() => {
      
        new_outer.current.style.transform = `translateX(-${newindex * 15}rem)`;
      }, [newindex]);




return <>


    <div className="new_main_poster">
    <div className="new_main_poster_img">

      </div>
      <div className="text">
           <p>New Arrival</p>
           </div>
    </div>

    <div className="new_main">
        <div className="head">
        <h1>RECOMMENDED <br /> NEW ARRIVALS</h1>
        <p>AUTUMN & WINTER 2022</p>
            <button>New Items</button>
        </div>
        <div className="left_bt_wrap">
        <button className='left' onClick={e=> newhandle('left')}>                            
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none">
             <path d="M8.25 17.5625L9.32143 18.75L15.75 11.625L9.32143 4.5L8.25 5.6875L13.6071 11.625L8.25 17.5625Z" fill="#ffffff"/>
        </svg></button>
        </div>
        <div className="slide">
            <div className="wrapper">
            <div className="new_outer" ref={new_outer}>
                {json.map((item)=>
                {
                   return <div className="new_items" key={item.id} style={{backgroundImage : `url(${item.img})`}}>
                                <div className="overlay"></div>
                           <div className="new_it_fr">
                           </div>
                           <div className="ctnt">
                                <p>{item.name}</p>
                                <h5>{item.price}</h5>
                           </div>
                   </div>
                })}
            </div>
            </div>
        </div>
        <button className='right' onClick={e=> newhandle('right')}>                            
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none">
            <path d="M8.25 17.5625L9.32143 18.75L15.75 11.625L9.32143 4.5L8.25 5.6875L13.6071 11.625L8.25 17.5625Z" fill="#ffffff"/>
        </svg>
        </button>
    </div>
</>
}