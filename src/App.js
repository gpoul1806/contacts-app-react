import React, { useState } from "react";
import "./App.scss";
import Catalog from "./components/catalog";
import { useSelector, useDispatch } from "react-redux";
import { PlusCircleFilled } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import NewItem from "./components/NewItem";
import axios from "axios";
import { addData } from "./redux/actions";

function App() {
  const [vis, setVis] = useState(false);
  const info = useSelector((state) => state.info.data);

  const dispatch = useDispatch();

  const createContact = () => {
    return axios
      .post(
        `https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users/`,
        {
          id: info.name.charAt(0).toLowerCase() + Math.random(),
          key: info.name.charAt(0).toUpperCase(),
          name: info.name.toLowerCase(),
          email: info.email,
          phone1: info.phone1,
          phone2: info.phone2,
          address: info.address,
        },
        { "content-type": "application-json" }
      )
      .then(() => setVis(false))
      .then(() => dispatch(addData("")))
      .catch((err) => console.log("err", err))
      .finally(() => window.location.reload());
  };
  const saveContact = () => {
    const regEmail = new RegExp(/.+@.+/);
    const regPhone = new RegExp("^[0-9]+$");
    if (
      (info.name === '') ||
      (!regEmail.test(info.email)) ||
      (!regPhone.test(info.phone1)) ||
      (info.phone2 !== "" && !regPhone.test(info.phone2))
    ) {
      alert("wrong");
    } else {
      createContact();
    }
  };

  return (
    <div className="App">
      <div className="head">
        <h1 className="title">Contacts App</h1>
        <PlusCircleFilled className="plus" onClick={() => setVis(true)} />
      </div>
      <Modal
        visible={vis}
        okText="save"
        cancelText="Close"
        onOk={saveContact}
        onCancel={() => setVis(false)}
      >
        <NewItem edit={true} init={false} />
      </Modal>
      <Catalog />
    </div>
  );
}

export default App;
