import React from "react";
import PropTypes from "prop-types";
import "./Box.scss";

function Box({ colorObj, makeChoice }) {
  const { color, opened, key } = colorObj;
  const styles = opened
    ? { backgroundColor: color }
    : { backgroundColor: "#7f7f7f" };
  let className = 'box'
  if(opened) {
    className += ' box_open';
  }
  return (
    <div
      className={className}
      style={styles}
      onClick={() => (opened ? null : makeChoice(key))}
    ></div>
  );
}

Box.propTypes = {
  colorObj: PropTypes.shape({
    color: PropTypes.string,
    key: PropTypes.number,
    opened: PropTypes.bool
  }).isRequired,
  makeChoice: PropTypes.func.isRequired
};

export default Box;
