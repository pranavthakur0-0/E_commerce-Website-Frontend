import { useContext } from "react";
import { Usercontext } from "../context/authlogin";
import "./Navlinks.scss";
import { Link } from "react-router-dom";

export default function Navlink(props) {
  const { link } = useContext(Usercontext);
  return (
    <>
      {link &&
        link.map((item, index) => {
          return item.gender === props.gender ? (
            <dl key={index} className="navlink_header">
              <dt>
                <p>{item && item.headlinks}</p>
              </dt>
              {item.sublinks.map((sublink, index) => (
               <Link to={`/index/men/${item.headlinks}/${sublink.link}`}  key={index}   className="navlink_sublink">
                   <dd
                  className="navlink_sublinks universal_link"
                  data={sublink._id}
                  onClick={(e) => {
                    console.log(e.currentTarget.getAttribute("data"));
                  }}
                >
                  {sublink.link}
                </dd>
               </Link>
              ))}
            </dl>
          ) : null;
        })}
    </>
  );
}
