import React, { useState } from "react";
import "./NewItem.scss";
import { addData } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone1: "",
    phone2: "",
    address: "",
  });

  const dispatch = useDispatch();

  const change = ({ target: { value, title } }) => {
    setData({ ...data, [title]: value });
    dispatch(addData({ ...data, [title]: value }));
  };

  return (
    <div className="profile">
      <h1>New Contact</h1>
      <div className="row">
        <span className="title">Name: </span>
        <input
          className="input"
          type="text"
          title="name"
          value={data.name}
          placeholder="Name Surname"
          onChange={change}
          required
        />
      </div>
      <div className="row">
        <span className="title">email: </span>
        <input
          className="input"
          type="text"
          title="email"
          value={data.email}
          placeholder="email"
          onChange={change}
          required
        />
      </div>
      <div className="row">
        <span className="title">Primary Phone: </span>
        <input
          className="input"
          type="text"
          title="phone1"
          value={data.phone1}
          placeholder="Primary phone"
          onChange={change}
          required
        />
      </div>
      <div className="row">
        <span className="title">Secondary Phone: </span>
        <input
          className="input"
          type="text"
          title="phone2"
          value={data.phone2}
          placeholder="Secondary phone"
          onChange={change}
        />
      </div>
      <div className="row">
        <span className="title">Address: </span>
        <input
          className="input"
          type="text"
          title="address"
          value={data.address}
          placeholder="Address City Zip Code"
          onChange={change}
        />
      </div>
    </div>
  );
};

export default Profile;
