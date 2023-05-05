import './Home.scss'
import Navbar from '../../components/Navbar'
import Slider from '../../components/Slider'
import HomeCategories from '../../components/HomeCategories.jsx'
import SeasonBanner from '../../components/SeasonBanner.jsx'
import NewArrival from '../../components/NewArrival.jsx'
import Footer from "../../components/Footer.jsx"
import Discover from "../../components/Discover.jsx"
import Sides from "../../components/sides.jsx"
 
export default function Home()
{

    return <>
        <div className="home_cl_1">
            <Navbar></Navbar>
            <Slider/>
            <Sides></Sides>
            <Discover></Discover>
            <NewArrival></NewArrival>
            <SeasonBanner></SeasonBanner>
            <Footer></Footer>

        </div>
    </>
}