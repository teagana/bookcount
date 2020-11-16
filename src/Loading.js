import React from "react";

export default function Loading({ color, size, animationLength, marginTop }) {
  const styles = {
    color,
    animationDuration: animationLength,
    fontSize: size,
    marginTop,
  };

  return <div className="loader" style={styles}></div>;
}
