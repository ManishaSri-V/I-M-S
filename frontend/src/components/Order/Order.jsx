import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Order.css";
import "../Button/Button.css";

const Order = () => {
  const [products, setProducts] = useState([]);
  const [newOrder, setNewOrder] = useState({
    product_id: "",
    quantity: "",
    order_date: "",
    status: "Pending",
  });
  const navigate = useNavigate();

  // Fetch product list
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/product/products",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    }
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({
      ...newOrder,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/order/add", newOrder, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setNewOrder({
        product_id: "",
        quantity: "",
        order_date: "",
        status: "Pending",
      });
    } catch (error) {
      console.error("Error adding order", error);
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Product :
          <select
            name="product_id"
            value={newOrder.product_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a product
            </option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} (SKU: {product.sku})
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={newOrder.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="order_date"
            value={newOrder.order_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select name="status" value={newOrder.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </label>
        <button className="btn-custom btn-primary" type="submit">
          Add Order
        </button>
      </form>
    </div>
  );
};

export default Order;
