import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/User/User.css";
import NavBar from "../components/Header/NavBar";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/users", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUsers(response.data.data);
      console.log({ users });
      console.log("text");
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login");
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="user-container">
        <h2>Users</h2>
        <ul className="user-list">
          {users.map((user) => (
            <li className="user-item" key={user.id}>
              {user.username} - {user.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
