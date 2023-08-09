import axios from "axios";
import { useEffect, useState } from "react";
import './admin.scss'
import { AiOutlineCloudUpload } from "react-icons/ai";
export default function Admin(){
    const [info,setinfo] = useState({
        name: "",
        price: 0,
        gender : "",
        headlink : "",
        category: "",
        color: "",
        description :"",
        subtag : "",
        fit : "",
        composition : "",
        productlength : "",
        count : "",
        colorCode : ""
    })

    const [categorylink, setcategorylink] = useState();
  const [file, setFile] = useState(null);

    const onchangeinput =(e)=>{
        setinfo(((info)=>({
        ...info,
        [e.target.name]: e.target.value 
        })))
        console.log(info)
    }
    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files); // Convert the FileList to an array
        setFile(files);
      };
      
    
      const addProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('text', JSON.stringify(info));
        for (let i = 0; i < file.length; i++) {
            formData.append('filefield', file[i]);
          }
        try {
          const response = await axios.post("http://localhost:4000/api/server/admin/products", formData);
          console.log(response.data); // Use response.data to access the response data
        } catch (err) {
          console.log(err);
        }
      }

useEffect(()=>{
 async function getCAtLInks(){
    try{
      const response = await axios.get(`http://localhost:4000/api/server/admin/link?gender=${info.gender}`)
      setcategorylink(response.data.links);

    }catch(err){
      console.log(err);
    }}
    getCAtLInks();
},[info.gender])


    return (<>
    <div className="main_products">
      <div className="admin_product_wrapper">
        <div className="wrapper_one">
        Add a product here
        <br />
        <form encType="multipart/form-data" onSubmit={addProduct} >
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={e=>onchangeinput(e)} />
        <br />
        <label htmlFor="price">Rs</label>
        <input type="number" name="price" id="price" onChange={e=>onchangeinput(e)} />
        <br />
        <label htmlFor="gender">Gender</label>
        <input type="radio" defaultValue="men" name="gender" id="gender" onChange={e=>onchangeinput(e)} />Men
        <input type="radio" defaultValue="women" name="gender" id="gender" onChange={e=>onchangeinput(e)} />Women
        <br />


        <select onChange={e => onchangeinput(e)} name="category" id="category">
                    <option value="">Please select the category of the Product</option>
                    {categorylink && categorylink.map((item, index) => (
                      item.headlinks === "Shop by Product" &&
                      item.sublinks.map((link, index) => (
                        link.link !== "View All" ? (
                          <option key={index} value={link.link}>
                            {link.link}
                          </option>
                        ) : null
                      ))
                    ))}
                  </select>

                  
                  <br />
            <select onChange={e => onchangeinput(e)} name="headlink" id="headlink">
              <option value="">Please select the headerlink</option>
              {categorylink && categorylink.map((item, index) => {
                return item.headlinks !== "Shop by Product" ? (
                  <option key={index} value={item.headlinks}>
                    {item.headlinks}
                  </option>
                ) : null;
              })}
            </select>
            <br />
            <select onChange={e => onchangeinput(e)} name="subtag" id="subtag">
                {categorylink && categorylink.map((item) => {
                  if (info.headlink === item.headlinks && item.headlinks) {
                    return item.sublinks.map((link, index) => {
                      if (link.link !== "View All") {
                        return (
                          <option key={index} value={link.link}>
                            {link.link}
                          </option>
                        );
                      } else {
                        return null;
                      }
                    });
                  } else {
                    return null;
                  }
                })}
              </select>
             
        <br />
        <label htmlFor="color">Color</label>
        <input type="text" name="color" id="color" onChange={e=>onchangeinput(e)}  value={info.color}/>
        <br />
        <label htmlFor="colorCode">ColorCode</label>
        <input type="text" name="colorCode" id="colorCode" onChange={e=>onchangeinput(e)}  value={info.colorCode}/>
        <br />
        <label htmlFor="description">description</label>
        <input type="text" name="description" id="description" onChange={e=>onchangeinput(e)}  value={info.description}/>
        <br />
        <label htmlFor="fit">Fit</label>
        <input type="text" name="fit" id="fit" onChange={e=>onchangeinput(e)}  value={info.fit}/>
        <br />
        <label htmlFor="composition">Composition</label>
        <input type="text" name="composition" id="composition" onChange={e=>onchangeinput(e)}  value={info.composition}/>
        <br />
        <label htmlFor="productlength">Length</label>
        <input type="text" name="productlength" id="productlength" onChange={e=>onchangeinput(e)}  value={info.productlength}/>
        <br />
        <label htmlFor="count">Count</label>
        <input type="text" name="count" id="count" onChange={e=>onchangeinput(e)}  value={info.count}/>
        <br />
        <input type="submit" value="add product" />
        <div className="upload_button">
     
          <input type="file" name="filefield" id="filefield" multiple onChange={handleFileInputChange} />
          <label htmlFor="filefield">
          <AiOutlineCloudUpload className="icon"  />Choose File To upload</label>
          <div className="num_of_files">No file is choose</div>
          <ul id="file-list"></ul>
        </div>
      
        </form>

        </div>
        <div className="wrapper_two">
        </div>
        </div>
       </div>
    </>)
}