import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Sidelinks({setisLoading, setsort}){
    const [sidelinks, setsidelinks] = useState();
    const { gender, item, headerlink} = useParams();
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getLinks/${gender}/`, {withCredentials : true,});
        if (response) {
          setsidelinks(prevLinks => response.data.links);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchLinks();
    // eslint-disable-next-line
  }, [gender, item, headerlink]);

    return ( <>
     {sidelinks ? sidelinks.map((item, index) => {
        return <dl key={index}>
          <dt>
            <p>{item ? item.headlinks : ""}</p>
          </dt>
          {item.sublinks.map((sublink, index) => {
        return <Link className="universal_link" onClick={e=>{setisLoading(false);setsort('{"_id": -1}')}} to={`/index/${gender}/${item.headlinks}/${sublink.link}`} key={index}><dd data={sublink._id}>{sublink.link}</dd></Link> 
          })}
        </dl>
      }) : ""}</>
      )
}