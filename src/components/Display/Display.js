import React, { useState } from "react";
import "./styles.css";
function Display(props) {
  const { seconds } = props;
  return (
    <div>
      <h3 className="displayText">{seconds}</h3>
    </div>
  );
}

export default Display;
