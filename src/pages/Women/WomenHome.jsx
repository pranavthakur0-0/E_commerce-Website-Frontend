
import '../Men/MenHome.scss'
import videoWomenIndex from "../../video/women.mp4"
import { useNavigate } from 'react-router-dom';
import bag from "../../images/bag.jpeg"
import { useEffect, useState } from 'react';
import mirror from "../../images/mirror.webp"
import two from "../../images/two.webp"
import mountain from "../../images/mountain.jpeg"
import mountaingirl from "../../images/mountainGirl.png"
export default function HomeProduct()
{
    const [scrollPosition, setScrollPosition] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
      function handleScroll() {
        const position = document.documentElement.scrollTop;
        setScrollPosition(position);
      }
      if (scrollPosition < 1000) {
        document.querySelector(".index_men").style.display = "block";
      } else {
        document.querySelector(".index_men").style.display = "none";
      }
      
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [scrollPosition]);
    

    return <>

    <div className="nav_bar_space"></div>
        <div className="index_men">
             <video autoPlay loop muted className="video_control">
                      <source src={videoWomenIndex} type="video/mp4" />
                      Your browser does not support the video tag.
            </video>
            <div className="index_men_overlay"></div>
            <div className="index_men_text">
            <div className="wrapper">
                <div className="men_main_link">
                     <h1>NEW IN</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea fugiat hic mollitia, at earum a nulla excepturi </p>
                    <button className='men_index' onClick={(e) => navigate(`/index/women/Shop%20by%20Product/View%20All`)} links="View All">VIEW</button>

                </div>
                         <ul className='men_side_link'>
                            <li className='men_index' onClick={(e) =>   navigate(`/index/women/New%20Arrivals/View%20All`)}>New Arrivals</li>
                            <li className='men_index' onClick={(e) =>   navigate(`/index/women/Spring%20lookbook/Casual%20looks`)}>Causal Looks</li>
                            <li className='men_index' onClick={(e) => navigate(`/index/women/Shop%20by%20Product/Shoes`)}>Shoes</li>
                            <li className='men_index' onClick={(e) => navigate(`/index/women/Shop%20by%20Product/Hoodies%20&%20Sweatshirts`)}>Sweatshirts</li>
                            <li className='men_index' onClick={(e) => navigate(`/index/women/Shop%20by%20Product/View%20All`)}>View All</li>
                        </ul>
                </div>
            </div>
        </div>
        <div className="index_page_main">
        <div className="index_page_main_sections">
            <div className="section_one">
                <div className="img" style={{backgroundImage : `url(${mountain})`}}></div>
                <div className="parallax_img"  style={{backgroundImage : `url(${mountaingirl})`}}></div>
                <div className="summer">Summer <br /> Inspiration</div>
                <div className="links">
                    <ul>
                        <li>Casual looks</li>
                        <li>Smart looks</li>
                        <li>Street looks</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="index_page_main_sections" style={{backgroundImage : `url(${bag})`, filter: "brightness(80%)"}}>
        </div>
        <div className="index_page_main_sections" style={{backgroundImage : `url(${mirror})`, filter: "brightness(80%)"}}>
     
        </div>  
        <div className="index_page_main_sections" style={{backgroundImage : `url(${two})`, filter: "brightness(90%)"}}>
        </div> 
         </div>
    </>
}