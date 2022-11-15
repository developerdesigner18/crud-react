import React, { useState } from "react";
import { Neworder } from "../mockData/Neworder";
export const Neworders = () => {
  const [neworderData, setNewOrderData] = useState([]);

  const [description, setDescription] = useState(null);

  const [error, setError] = useState({ description: null });

  let allNeworderValue = [...neworderData];

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      if (!allNeworderValue.includes(e.target.value)) {
        allNeworderValue.push(e.target.value);
      }
    } else {
      const valueIndex = allNeworderValue.indexOf(e.target.value);

      allNeworderValue.splice(valueIndex, 1);
    }
    setNewOrderData(allNeworderValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) {
      setError({ ...error, description: "Enter your Description" });
    } else if (neworderData.length === 0) {
      alert("please select at least one Product!!!");
    }

    const allProductData = { desc: description, products: [] };

    for (let i = 0; i < neworderData.length; i++) {
      const filterData = Neworder.filter((elm) => elm.id === neworderData[i]);

      allProductData.products.push(filterData[0].id);
    }

    console.log("all product data: ", allProductData);
  };

  return (
    <div>
      <div className="main_div">
        <h1>New Order</h1>
        <input
          name="description"
          placeholder="Order Description"
          className="Description_input"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        {error.description && (
          <span className="error">{error.description}</span>
        )}
        <br></br>
        {Neworder.map((neworder) => (
          <div key={neworder.id} className="checkbox_label">
            <input
              type="checkbox"
              value={neworder.id}
              name={neworder.id}
              onChange={(e) => handleCheckBox(e)}
            />
            <label className="label">
              <span className="label_title">{neworder.Productname}</span>
              {neworder.Orderdescription}
            </label>
          </div>
        ))}

        <button className="button_neworder" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </div>
    </div>
  );
};
