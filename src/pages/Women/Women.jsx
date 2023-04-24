
import Navbar from '../../components/Navbar'
import Footer from "../../components/Footer.jsx"
import WomenHome from "./WomenHome.jsx"
 
export default function Men()
{
    return <>
        <div className="home_cl_1">
            <Navbar></Navbar>
            <WomenHome></WomenHome>
            <Footer></Footer>
        </div>
    </>
}