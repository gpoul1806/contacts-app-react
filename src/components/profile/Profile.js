import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addData, fetchUser } from "../../redux/actions";
import "./Profile.scss";
import axios from "axios";
import { LoadingOutlined, DeleteOutlined } from "@ant-design/icons";

const Profile = ({ id, edit }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const info = useSelector((state) => state.info.data);
  const contact = useSelector((state) => state.contact.data);

  const [data, setData] = useState({
    id,
    name: "",
    email: "",
    phone1: "",
    phone2: "",
    address: "",
  });

  // fetch only the selected contact
  const getOneContact = () => {
    return axios
      .get(
        `https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users/${id}`,
        { "content-type": "application-json" }
      )
      .then((res) => {
        dispatch(fetchUser(res.data.payload));
        dispatch(addData(res.data.payload));
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };
  // delete only the selected contact
  const deleteContact = () => {
    return axios
      .delete(
        `https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users/${id}`,
        { "content-type": "application-json" }
      )
      .then(() => window.location.reload())
      .then(() => alert("the contact with the id " + id + " has been deleted"))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getOneContact();
  }, []);

  // setting the new state with the data which the user wants to update
  const change = ({ target: { value, title } }) => {
    setData({ ...data, [title]: value });
    // and set them to the info sub-state in order to pass it to the Contacts component
    // in order to set the body in the put request
    dispatch(addData({ ...info, [title]: value }));
  };

  return (
    <div>
      {loading ? (
        <LoadingOutlined style={{ color: "blue" }} />
      ) : (
        <div>
          {edit ? (
            <div className="profile">
              <h1>Edit Profile</h1>
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
                  type="email"
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
                  type="phone"
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
                  type="phone"
                  title="phone2"
                  value={data.phone2 ? data.phone2 : ""}
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
                  value={data.address ? data.address : ""}
                  placeholder="Address City Zip Code"
                  onChange={change}
                />
              </div>
            </div>
          ) : (
            <div className="profile">
              <h1>Profile</h1>
              <div className="row">
                <span className="title">Name: </span>
                <span className="text">{contact.name}</span>
              </div>
              <div className="row">
                <span className="title">e-mail: </span>
                <span className="text">
                  <a className="link" href={"mailto:" + contact.email}> {contact.email}</a>
                </span>
              </div>
              <div className="row">
                <span className="title">Primary Phone: </span>
                <span className="text">
                  <a className="link" href={"tel:" + contact.phone1}> {contact.phone1}</a>
                </span>
              </div>
              <div className="row">
                <span className="title">Secondary Phone: </span>
                <span className="text">
                  <a className="link" href={"tel:" + contact.phone2}>
                    {contact.phone2 ? contact.phone2 : ""}
                  </a>
                </span>
              </div>
              <div className="row">
                <span className="title">Address: </span>
                <span className="text">
                  {contact.address ? contact.address : ""}
                </span>
              </div>
              <button className="del" onClick={deleteContact}>
                <DeleteOutlined />
                Delete Contact
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
