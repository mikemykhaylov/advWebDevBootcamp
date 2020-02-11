import React from "react";
import "./BoxesWrap.scss";

function BoxesWrap(props) {
  return (
    <div className="container">
      <div className="boxes__wrap">
        {props.children}
      </div>
    </div>
  );
}

export default BoxesWrap;
