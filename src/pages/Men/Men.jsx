
import Navbar from '../../components/Navbar'
import Footer from "../../components/Footer.jsx"
import MenHome from "./MenHome.jsx"
 
export default function Men()
{
    return <>
        <div className="home_cl_1">
            <Navbar></Navbar>
            <MenHome></MenHome>
            <Footer></Footer>
        </div>
    </>
}