import React from "react";
import SupplierForm from "../components/Supplier/SupplierForm";
import SupplierList from "../components/Supplier/SupplierList";
import NavBar from "../components/Header/NavBar";

const SupplierPage = () => {
  return (
    <div>
      <NavBar />
      <SupplierForm />
      <SupplierList />
    </div>
  );
};

export default SupplierPage;
