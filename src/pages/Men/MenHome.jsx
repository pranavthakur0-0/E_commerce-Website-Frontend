
import './MenHome.scss'
import videoMenIndex from "../../video/men_index.mp4"
import { useNavigate } from 'react-router-dom';
export default function HomeProduct()
{
    const navigate = useNavigate();
    function getProducts (link){
        console.log(link);
        navigate(`/index/men/Shop%20by%20Product/${link}`);
    }

    

    return <>

    <div className="nav_bar_space"></div>
        <div className="index_men">
             <video autoPlay loop muted className="video_control">
                      <source src={videoMenIndex} type="video/mp4" />
                      Your browser does not support the video tag.
            </video>
            <div className="index_men_overlay"></div>
            <div className="index_men_text">
                <div className="wrapper">
                <div className="men_main_link">
                     <h1>NEW IN</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea fugiat hic mollitia, at earum a nulla excepturi </p>
                    <button className='men_index' onClick={(e) => getProducts(e.currentTarget.getAttribute("links"))} links="View All">VIEW</button>

                </div>
                         <ul className='men_side_link'>
                            <li className='men_index' onClick={(e) =>   navigate(`/index/men/New%20Arrivals/View%20All`)}>New Arrivals</li>
                            <li className='men_index' onClick={(e) =>   navigate(`/index/men/Spring%20lookbook/Casual%20looks`)}>Causal Looks</li>
                            <li className='men_index' onClick={(e) => getProducts(e.currentTarget.getAttribute("links"))}>Shoes</li>
                            <li className='men_index' onClick={(e) => getProducts(e.currentTarget.getAttribute("links"))}>Jackets</li>
                            <li className='men_index' onClick={(e) => getProducts(e.currentTarget.getAttribute("links"))}>View All</li>
                        </ul>
                </div>
            </div>
        </div>
    </>
}