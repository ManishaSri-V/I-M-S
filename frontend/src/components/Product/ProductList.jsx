import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import "./Product.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/product/products",
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setProducts(response.data.data);
  };

  console.log("These are my Products", products);

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    }
    fetchAllProducts();
  }, []);

  return (
    <div>
      <h2>All Products</h2>
      <div className="flexbox">
        {products.map((product, _) => {
          return (
            <ProductItem
              product={product}
              setProducts={setProducts}
              products={products}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
