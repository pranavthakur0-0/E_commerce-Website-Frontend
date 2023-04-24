
import { useEffect, useState, useRef } from 'react'
import { useContext } from 'react'
import { Usercontext } from '../context/authlogin';
import './Slider.scss'
import './item2.scss'
import './item1.scss'

const json = [{
    id:1 , name:"Slide 1",
},{
    id:2 , name:"Slide 2",
},{
    id:3 , name:"Slide 3",
},{
    id:4 , name:"Slide 4",
}]


export default function Slider(props)
{

    const {navHeight} = useContext(Usercontext);

    
    let [index, setindex] = useState(1);
    const outer = useRef();
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        let slides = document.querySelectorAll(".cl_items");
        const firstSlide = slides[0];
        const endSlide = slides[slides.length - 1];
        const cloneFirst = firstSlide.cloneNode(true);
        const cloneEnd = endSlide.cloneNode(true);
        outer.current.insertBefore(cloneEnd, outer.current.children[0]);
        outer.current.appendChild(cloneFirst);
        outer.current.style.transform = `translateX(-${1 * 100}%)`;
      }, []);
      
    function handle(direction) {
        console.log(isTransitioning);
        if (isTransitioning) {
          return;
        }
        setIsTransitioning(true);
        outer.current.style.transition = '0.8s ease-in-out';
        direction !== 'right' ? setindex(curIndex => curIndex - 1) : setindex(curIndex => curIndex + 1);
        outer.current.addEventListener('transitionend', () => {
          outer.current.style.transition = '0s';
          outer.current.removeEventListener('transitionend', () => { });
          setIsTransitioning(false);
        });
      }
      

      useEffect(() => {
        const slides = document.querySelectorAll(".cl_items");
        outer.current.style.transform = `translateX(-${index * 100}%)`;
        if (index === 0) {
          outer.current.addEventListener('transitionend', starttoend);
          function starttoend() {
            outer.current.style.transition = '0s';
            setindex(slides.length - 2);
            outer.current.style.transform = `translateX(-${(slides.length - 2) * 100}%)`;
            outer.current.removeEventListener('transitionend', starttoend);
            setIsTransitioning(false);
          }
        } else if (index === slides.length - 1) {
          outer.current.addEventListener('transitionend', startToStart);
          function startToStart() {
            outer.current.style.transition = '0s';
            setindex(1);
            outer.current.style.transform = `translateX(-${1 * 100}%)`;
            outer.current.removeEventListener('transitionend', startToStart);
            setIsTransitioning(false);
          }
        }
      }, [index]);

    return <>
            <div className="sld_cl" style={{paddingTop : `${navHeight}px`}}>
                    <div className="sld_cl_wrapper">
                        <div className="outer" ref={outer}>
                            {json.map((item=>
                                {
                                    return  <div className="cl_items" key={item.id} >
                                        {(item.id === 1) ? <>
                                       <div className="cl_sd_one">
                                          <div className="dia_box">
                                              <h3>Desinger Clothes</h3>
                                              <div className="text">
                                                <div className="line"></div>Your New
                                              </div>
                                              Everyday Style.
                                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit consectetur adipisicing elit. </p>
                                          
                                          </div>
                                       </div>
                                        </> : (item.id === 2) ? <>
                                        <div className="cl_it_one">
                                            <div className="one_back">
                                                <div className="sld_it_one_1">
                                                </div>
                                            </div>
                                            <div className="one_over">
                                               <div className="wrapper_1">
                                               <div className="year">
                                                    <span>20</span>
                                                    <span>23</span>
                                                </div>
                                                <div className="headline">New Arrivals</div>
                                                <div className="text">NEW <br /> LOOK</div>
                                                <div className="fa_style">Fashion Style</div>
                                                <div className="offer"><span>Extra 50% off</span> <button className='sld_it_button'>Shop Now</button></div>
                                               </div>
                                                </div>
                                        </div></> : (item.id === 3) ?  <>slide 3</> : (item.id === 4) ?  <>slide 4</> : <></>}
                                    </div>
                                    
                                }))}

                        </div>
                        <div className="sld_bt_con">
                            <button className='sd_bt_comb sd_left' onClick={e=> handle('left')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none">
                                    <path d="M8.25 17.5625L9.32143 18.75L15.75 11.625L9.32143 4.5L8.25 5.6875L13.6071 11.625L8.25 17.5625Z" fill="#ffffff"/>
                                    </svg>
                 </button>
                            <button className='sd_bt_comb sd_right' onClick={e=> handle('right')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none">
                                    <path d="M8.25 17.5625L9.32143 18.75L15.75 11.625L9.32143 4.5L8.25 5.6875L13.6071 11.625L8.25 17.5625Z" fill="#ffffff"/>
                                    </svg>
                            </button>
                        </div>
                    </div>
            </div>
    </>
}