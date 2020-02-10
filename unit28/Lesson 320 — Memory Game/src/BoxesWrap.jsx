import React from "react";
import Box from "./Box";
import "./BoxesWrap.scss";
import PropTypes from "prop-types";

function BoxesWrap({ colors, makeChoice }) {
  return (
    <div className="container">
      <div className="boxes__wrap">
        {colors.map(color => (
          <Box colorObj={color} makeChoice={makeChoice} key={color.key} />
        ))}
      </div>
    </div>
  );
}

BoxesWrap.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      key: PropTypes.number,
      opened: PropTypes.bool
    })
  ).isRequired,
  makeChoice: PropTypes.func.isRequired
};

export default BoxesWrap;
