import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { orders } from "../mockData/orders";

const Managements = () => {
  const navigate = useNavigate();

  const neworder = () => {
    navigate("/neworders");
  };

  const [search, setSearch] = useState("");

  const filterData = orders.filter((res) => {
    if (search === "") {
      return res;
    } else {
      return (
        res.description.includes(search) || res.id.toString().includes(search)
      );
    }
  });

  return (
    <div className="App">
      <div>
        <h1>Order Management</h1>
        <input
          type="text"
          placeholder="Search.."
          className="search_input"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <table className="table-row">
          <thead>
            <tr>
              <th>Order id</th>
              <th>Order Description</th>
              <th>Count of product</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.description}</td>
                <td>{order.product}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="button_manage" onClick={neworder}>
        New order
      </button>
    </div>
  );
};

export default Managements;
