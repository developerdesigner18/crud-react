import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const OrderManagements = () => {
  const Navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [flag, setFlag] = useState(false);
  const filterData = orders.filter((res) => {
    if (search === "") {
      return res;
    } else {
      return (
        res.description.includes(search) || res.id.toString().includes(search)
      );
    }
  });

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:7000/api/order/" + id)
      .then((res) => {
        alert(res.data.message);
        setFlag(!flag);
      })
      .catch((error) => alert("Something went wrong !"));
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/order")
      .then((res) => setOrders(res.data.orders))
      .catch((error) => alert("Something went wrong !"));
  }, [flag]);

  return (
    <div className="Main_class">
      <div>
        <h1>Order Management</h1>
        <input
          type="text"
          placeholder="Search.."
          className="search_input"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="table_class">
        <table className="table-row">
          <thead>
            <tr>
              <th>Order id</th>
              <th>Order Description</th>
              <th>Count of product</th>
              <th>Created Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filterData.map(({ id, description, productid, created }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{description}</td>
                <td>{productid.length}</td>
                <td>{moment(created).format("DD-MM-YYYY")}</td>
                <td>
                  <img
                    className="action_icon"
                    src={window.location.origin + "/edit.png"}
                    onClick={() =>
                      Navigate("/neworders", {
                        state: { id, description, productid },
                      })
                    }
                  />
                  <img
                    className="action_icon"
                    src={window.location.origin + "/delete.png"}
                    onClick={() => handleDelete(id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="button_manage" onClick={() => Navigate("/neworders")}>
        New order
      </button>
    </div>
  );
};

export default OrderManagements;
