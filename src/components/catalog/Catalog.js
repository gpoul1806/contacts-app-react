import React, { useState, useEffect } from "react";
import { Anchor } from "antd";
import "./Catalog.scss";
import Contacts from "../contacts";
const { p } = Anchor;

const Catalog = () => {
  return (
    <div className="catalog">
      <Contacts />
    </div>
  );
};

export default Catalog;
