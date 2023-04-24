import axios from "axios";
import { useState, useEffect } from "react";

export default function GetAdmin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/server/admin/products"
        );
        if (data) {
          setProducts(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {products.map((item, index) => (
        <img
          key={index}
          width={100}
          height={100}
          src={`${item.image.data}`}
          alt=""
        />
      ))}
    </>
  );
}
