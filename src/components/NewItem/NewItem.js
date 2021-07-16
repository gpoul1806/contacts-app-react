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
    // set the data to the info sub-state in order to pass it to the App component
    // in order to set the body in the post request
    setData({ ...data, [title]: value });
    dispatch(addData({ ...data, [title]: value }));
  };

  return (
    <div className="create-profile">
      <h1>New Contact</h1>
      <div className="row">
        <span className="title">Name:* </span>
        <input
          className="input"
          type="text"
          title="name"
          value={data.name}
          placeholder="John Smith"
          onChange={change}
          required
        />
      </div>
      <div className="row">
        <span className="title">email:* </span>
        <input
          className="input"
          type="text"
          title="email"
          value={data.email}
          placeholder="john@gmail.com"
          onChange={change}
          required
        />
      </div>
      <div className="row">
        <span className="title">Primary Phone:* </span>
        <input
          className="input"
          type="text"
          title="phone1"
          value={data.phone1}
          placeholder="6989988999"
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
          placeholder="2106080909"
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
          placeholder="Imittou 1, Pagkrati, 11633"
          onChange={change}
        />
      </div>
    </div>
  );
};

export default Profile;
