import React, { useState } from "react";
import { Neworder } from "../mockData/Neworder";
export const Neworders = () => {
  const [neworderData, setNewOrderData] = useState([]);

  const [Description, setDescription] = useState();

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
    if (neworderData.length === 0) {
      alert("please select at least one Product!!!");
    }

    const allProductData = [];
    for (let i = 0; i < neworderData.length; i++) {
      allProductData.push(Neworder.filter((elm) => elm.id === neworderData[i]));
    }
    console.log(
      "all product data: ",
      allProductData,
      "description: ",
      Description
    );
  };
  return (
    <div>
      <div className="main_div">
        <h1>New Order</h1>
        <input
          name="order"
          placeholder="Order Description"
          className="Description_input"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br></br>
        {Neworder.map((neworder) => (
          <div className="checkbox_label">
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
