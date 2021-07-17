import React, { useEffect, useState } from "react";
import "./Contacts.scss";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import Profile from "../profile";
import axios from "axios";
import { fetchUsers } from "../../redux/actions";
import { LoadingOutlined } from "@ant-design/icons";

const Contacts = () => {
  //this state is for handling the visibility of the profile's modal
  const [visible, setVisible] = useState(false);

  // this is the state for assigning the Id of the specific contact clicked by the user
  // in order to pass it as a prop to the Profile component
  const [id, setId] = useState(0);

  // this is the loading state  for user interface in order to wait while the data are about to be fetched
  const [loading, setLoading] = useState(true);

  // this is the state for the visibility of the confirmation modal when the user is about to update a contact
  const [conf, setConf] = useState(false);

  // this is the state responsible for the modal
  // to show the data fetched from the api or
  // to show the form in order to update the contact
  const [edit, setEdit] = useState(false);
  const info = useSelector((state) => state.info.data);

  const dispatch = useDispatch();

  const enablePopup = (e) => {
    setVisible(true);
    setId(e.target.id);
    console.log(22, e.target.id);
  };
  const closePopup = () => {
    setVisible(false);
    setEdit(false);
    setId("");
  };

  const updateContact = () => {
    return axios
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
      .then(() => setConf(false))
      .then(() => setEdit(false))
      .then(() => setVisible(false))
      .then(() => alert("the contact with the id " + id + " has been updated"))
      .catch((err) => console.log("err", err))
      .finally(() => window.location.reload());
  };

  // check if the email or the phone(s) have the proper format
  const update = () => {
    const regEmail = new RegExp(/.+@.+/);
    const regPhone = new RegExp("^[0-9]+$");
    if (
      (info.email !== "" && !regEmail.test(info.email)) ||
      (info.phone1 !== "" && !regPhone.test(info.phone1)) ||
      (info.phone2 !== "" && !regPhone.test(info.phone2)) ||
      info === null
    ) {
      // if not, alert an error
      alert("You have to add the field(s) with the proper format!");
      setConf(false);
    } else {
      // else, if everything is ok, update the contact
      updateContact();
    }
  };

  // fetch all contacts from the api
  const getAllContacts = () => {
    return (
      axios
        .get(
          "https://europe-west1-contacts-a-b3e89.cloudfunctions.net/api/users",
          { "content-type": "application-json" }
        )
        // assign all the data to the contacts sub-state of the store
        .then((res) => dispatch(fetchUsers(res.data.payload)))
        .then(() => setLoading(false))
        .catch((err) => console.log(err))
    );
  };

  // render the component only the first time with all the contacts
  useEffect(() => {
    getAllContacts();
  }, [visible]);

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
            // everytime a new contact is added, it must be placed in the right place according to the english alphabet
            .sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
            // then show all the contacts which are assigned in the sub-state (contacts)
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
          {/* the modal responsible for the chosen contact to appear its profile */}
          <Modal
            visible={visible}
            okText={edit ? "save" : "edit"}
            cancelText="Close"
            onOk={editContact}
            onCancel={closePopup}
          >
            <Profile id={id} edit={edit} />
          </Modal>
          {/* the confirmational modal for updating the chosen contact */}
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
