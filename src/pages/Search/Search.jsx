import { useLocation } from "react-router-dom";
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import UniversalComponent from "../Universal/UniversalComponent"
import { useEffect, useState } from "react";

export default function Search(){
    const location = useLocation();
    const [searchValue, setsearchValue] = useState('');
    const [productCountByGender, setproductCountByGender] = useState();
    const [genderState, setgenderState] = useState();
   
    useEffect(() => {
      if (location.state && location.state.searchValue) {
        setsearchValue(location.state.searchValue);
        setproductCountByGender('');
        setgenderState('');
      }
    }, [location.state]);
      
useEffect(()=>{
  console.log(searchValue);
},[searchValue])

    return (
      <>
        <Navbar setproductCountByGender={setproductCountByGender} />
        <UniversalComponent
          genderState={genderState}
          setgenderState={setgenderState}
          productCountByGender={productCountByGender}
          setproductCountByGender={setproductCountByGender}
          searchValue={searchValue}
          changeloading={location.state && location.state.changeloading}
        />
        <Footer></Footer>
      </>
    );
}
