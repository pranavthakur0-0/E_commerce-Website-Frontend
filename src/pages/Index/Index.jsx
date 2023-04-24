import { useParams } from "react-router-dom";
import Men from "../Men/Men";
import Women from "../Women/Women.jsx"

export default function Index(){
    const {gender} = useParams();
    return (gender === "men" ? <Men /> : gender === "women" ? <Women /> : "");

}
