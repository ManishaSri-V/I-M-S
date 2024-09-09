import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderItem from "./OrderItem";
import "./Order.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchAllOrders = async () => {
    const response = await axios.get("http://localhost:5000/api/order/orders", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setOrders(response.data.data);
  };

  console.log("These are my Orders", orders);

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    }
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h2>All Orders</h2>
      <div className="flexbox">
        {orders.map((order, _) => {
          return (
            <OrderItem order={order} setOrders={setOrders} orders={orders} />
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
