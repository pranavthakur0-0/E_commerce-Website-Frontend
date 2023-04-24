import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "./Addlinks.scss"
export default function Addlinks() {
  const [number, setNumber] = useState(0);
  const [sublinks, setSublinks] = useState(Array.from(Array(number), (_, i) => i));
  // eslint-disable-next-line
  const [data,setdata] = useState([]);
  const [info,setinfo] = useState({
        gender : "",
        headlinks: "",
        priority : "",
        sublinks : []
      });
  useEffect(() => {
    setSublinks(Array.from(Array(number), (_, i) => i));
  }, [number]);


  const addSublinks = useCallback((e, index) => {
    const newValue = e.target.value;
    setdata(prevData => {
      const newData = [...prevData];
      newData[index] = newValue;
      return newData;
    });
    setinfo(prevInfo => ({
      ...prevInfo,
      sublinks: [
        ...prevInfo.sublinks.slice(0, index),
        newValue,
        ...prevInfo.sublinks.slice(index + 1)
      ]
    }));
  }, []);
  
  const change = useCallback((e) => {
    setinfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value
    }))
  }, []);

  const submitData = useCallback(async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:4000/api/server/page_links", info);
      if (result) {
        setinfo({
          headlinks: "",
          gender: "",
          priority: "",
          sublinks: []
        });
        document.querySelectorAll('input').forEach((input) => {
          input.value = "";
        });
        document.querySelectorAll('select').forEach((select) => {
          select.value = "";
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [info]);

  return (
    <>
    <div className="add_links_main_con">
    <form onSubmit={submitData}>
      <label htmlFor="headlinks">Header Name</label>
      <input type="text" id="headlinks" onChange={change} name="headlinks" />
      <br />
      <label htmlFor="gender">Select Gender</label>
      <select onChange={change}  defaultValue="" name="gender">
          <option value="">-- select an option --</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
      </select>
      <br />
      <label htmlFor="priority">Priorty</label>
      <input type="number" id="priority" name="priority" onChange={change}  />
      <br />
      <label htmlFor="number">Enter the number of sublinks</label>
      <input type="number" id="number" onChange={(e) => setNumber(Number(e.target.value))} />
      <br />
      <br />

        {sublinks.map((sublink,index) => (
                <div key={index}><input  type="text" onChange={e=>{addSublinks(e,index)}}/> <br /></div>
        ))}
        <input type="submit" value="Add link Group" />
        </form>
        </div>
    </>
  );
}
