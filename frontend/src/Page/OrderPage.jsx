import React from "react";
import OrderList from "../components/Order/Orderlist";
import Order from "../components/Order/Order";
import NavBar from "../components/Header/NavBar";

const OrderPage = () => {
  return (
    <div>
      <NavBar />
      <Order />
      <OrderList />
    </div>
  );
};

export default OrderPage;
