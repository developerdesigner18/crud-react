import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Neworders = () => {
  const orederIdProp = useLocation().state;

  const [description, setDescription] = useState(
    orederIdProp?.description ? orederIdProp.description : ""
  );
  const [products, setProducts] = useState(
    orederIdProp?.productid ? orederIdProp.productid : []
  );
  const [productList, setProductList] = useState([]);

  const Navigate = useNavigate();
  const handleCheckBox = (e) => {
    if (e.target.checked) {
      if (!products?.includes(e.target.value)) {
        setProducts([...products, e.target.value]);
      }
    } else {
      if (products.includes(e.target.value)) {
        setProducts(
          products.filter((productId) => productId != e.target.value)
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) {
      alert("please enter order description!!!");
    } else if (products.length === 0) {
      alert("please select at least one Product!!!");
    } else {
      const newOrder = { orderDescription: description, productId: products };

      orederIdProp
        ? axios
            .put("http://localhost:7000/api/order/" + orederIdProp.id, newOrder)
            .then((res) => {
              alert(res.data.message);
              Navigate("/");
            })
            .catch((error) => alert("Something went wrong !"))
        : axios
            .post("http://localhost:7000/api/order", newOrder)
            .then((res) => {
              alert(res.data.message);
              Navigate("/");
            })
            .catch((error) => alert("Something went wrong !"));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/product")
      .then((res) => setProductList(res.data.products))
      .catch((error) => alert("Something went wrong !"));
  }, []);

  return (
    <div>
      <div className="main_div">
        <h1>New Order</h1>
        <input
          name="description"
          placeholder="Order Description"
          className="Description_input"
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={description}
        />

        {productList.map(({ id, productDescription, productName }) => (
          <div key={id} className="checkbox_label">
            <input
              type="checkbox"
              value={id}
              name={id}
              defaultChecked={products?.includes(id.toString())}
              onChange={(e) => handleCheckBox(e)}
            />
            <label className="label">
              <span className="label_title">{productName}</span>
              {productDescription.data}
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

export default Neworders;
