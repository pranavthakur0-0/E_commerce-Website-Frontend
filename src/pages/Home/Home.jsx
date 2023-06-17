import './Home.scss'
import Navbar from '../../components/Navbar'
import Slider from '../../components/Slider'
import HomeCategories from '../../components/HomeCategories.jsx'
import SeasonBanner from '../../components/SeasonBanner.jsx'
import NewArrival from '../../components/NewArrival.jsx'
import Footer from "../../components/Footer.jsx"
import Discover from "../../components/Discover.jsx"
import Sides from "../../components/sides.jsx"
import Something from "./Something.jsx"
import White_back from "./White_back.jsx"
import WeDesignLogo from "./WeDesignLogo.jsx"
 
export default function Home()
{

    return <>
        <div className="home_cl_1">
            <Navbar></Navbar>
            <Slider/>
            <Sides></Sides>
            <WeDesignLogo></WeDesignLogo>
            <NewArrival></NewArrival>
            <Discover></Discover>
            <WeDesignLogo></WeDesignLogo>
            <White_back />
       
            <SeasonBanner></SeasonBanner>
            <Footer></Footer>

        </div>
    </>
}