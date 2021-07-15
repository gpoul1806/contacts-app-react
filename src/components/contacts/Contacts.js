import React, { useEffect, useState } from "react";
import "./Contacts.scss";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import Profile from "../profile";
import axios from "axios";
import { addData, fetchUser, fetchUsers } from "../../redux/actions";
import { LoadingOutlined, NodeIndexOutlined } from "@ant-design/icons";

const Contacts = () => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [conf, setConf] = useState(false);
  const [edit, setEdit] = useState(false);
  const info = useSelector((state) => state.info.data);
  const valid = useSelector((state) => state.valid);
  const contact = useSelector((state) => state.contact.data);

  console.log(23, valid);

  const dispatch = useDispatch();

  const enablePopup = (e) => {
    setVisible(true);
    setId(e.target.id);
    console.log(22, e.target.id);
  };
  const closePopup = () => {
    setVisible(false);
    setEdit(false);
    window.location.reload();
  };

  const updateContact = () => {
    return (
      axios
        .put(
          `https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users/${id}`,
          {
            id: info.id,
            name: info.name,
            email: info.email,
            phone1: info.phone1,
            phone2: info.phone2,
            address: info.address,
          },
          { "content-type": "application-json" }
        )
        // .then(() => dispatch(addData("")))
        .then(() => setConf(false))
        .then(() => setEdit(false))
        .then(() => setVisible(false))
        .catch((err) => console.log("err", err))
        .finally(() => window.location.reload())
    );
  };

  const update = () => {
    const regEmail = new RegExp(/.+@.+/);
    const regPhone = new RegExp("^[0-9]+$");
    if (
      (info.email !== "" && !regEmail.test(info.email)) ||
      (info.phone1 !== "" && !regPhone.test(info.phone1)) ||
      (info.phone2 !== "" && !regPhone.test(info.phone2))
    ) {
      alert("wrong");
      setConf(false);
    } else {
      updateContact();
    }
  };
  const getAllContacts = () => {
    return axios
      .get(
        "https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users",
        { "content-type": "application-json" }
      )
      .then((res) => dispatch(fetchUsers(res.data.payload)))
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const userData = useSelector((state) => state.contacts);

  const editContact = () => {
    edit ? setConf(true) : setEdit(!edit);
  };

  return (
    <div>
      {loading ? (
        <LoadingOutlined style={{ color: "blue" }} />
      ) : (
        <div className="contacts">
          {Object.values(userData.data)
            .sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
            .map((item) => (
              <div
                id={item.id}
                key={item.id}
                className="contact"
                onClick={enablePopup}
              >
                <span
                  className="item"
                  id={item.id}
                  className="item"
                  onClick={enablePopup}
                >
                  {item.name}
                </span>
                <span
                  className="item"
                  id={item.id}
                  className="item"
                  onClick={enablePopup}
                >
                  {item.email}
                </span>
              </div>
            ))}

          <Modal
            visible={visible}
            footer={valid.bool}
            okText={edit ? "save" : "edit"}
            cancelText="Close"
            onOk={editContact}
            onCancel={closePopup}
          >
            <Profile id={id} edit={edit} init={true} />
          </Modal>
          <Modal
            visible={conf}
            okText="Yes"
            cancelText="No"
            onOk={update}
            onCancel={() => setConf(false)}
          >
            Are sure you want to change this contact?
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Contacts;
