import React from "react";
import "./Catalog.scss";
import Contacts from "../contacts";
import { Timeline } from "antd";

const Catalog = () => {
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "X",
    "Y",
    "W",
    "Z",
  ];
  return (
    <div className="catalog">
      <Timeline className="timeline">
        {alphabet.map((item) => (
          <Timeline.Item>
            <button
              onClick={() =>
                document.getElementById(item)
                  ? document
                      .getElementById(item)
                      .scrollIntoView({ behavior: "smooth" })
                  : alert("There is no contact added, wich starts with " + item)
              }
            >
              {item}
            </button>
          </Timeline.Item>
        ))}
      </Timeline>
      <Contacts />
    </div>
  );
};

export default Catalog;
