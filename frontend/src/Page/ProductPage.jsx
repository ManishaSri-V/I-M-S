import React from "react";

import ProductForm from "../components/Product/ProductForm";
import ProductList from "../components/Product/ProductList";
import NavBar from "../components/Header/NavBar";

const ProductPage = () => {
  return (
    <div>
      <NavBar />
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default ProductPage;
