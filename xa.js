import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addData, fetchUser } from "../../redux/actions";
import "./Profile.scss";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

const Profile = ({ id, edit }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const info = useSelector((state) => state.info);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone1: "",
    phone2: "",
    address: "",
  });

  const getOneContact = () => {
    return axios
      .get(
        `https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users/${id}`,
        { "content-type": "application-json" }
      )
      .then((res) => setData(res.data.payload))
      .then((res) => console.log(88, res.data.payload))
      // .then((res) => dispatch(fetchUser(res.data.payload)))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOneContact();
  }, []);

  const userData = useSelector((state) => state.contact.data);

  const change = ({ target: { value, title } }) => {
    setData({ ...data, [title]: value });
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
                  type="number"
                  title="phone1"
                  value={data.phone}
                  placeholder="Primary phone"
                  onChange={change}
                  required
                />
              </div>
              <div className="row">
                <span className="title">Secondary Phone: </span>
                <input
                  className="input"
                  type="number"
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
                <span className="text">{userData.name}</span>
              </div>
              <div className="row">
                <span className="title">e-mail: </span>
                <span className="text">{userData.email}</span>
              </div>
              <div className="row">
                <span className="title">Primary Phone: </span>
                <span className="text">{userData.phone}</span>
              </div>
              <div className="row">
                <span className="title">Secondary Phone: </span>
                <span className="text">
                  {userData.phone2 ? userData.phone2 : ""}
                </span>
              </div>
              <div className="row">
                <span className="title">Address: </span>
                <span className="text">
                  {userData.address ? userData.address : ""}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
