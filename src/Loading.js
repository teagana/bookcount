import React from "react";

export default function Loading({ color, size, animationLength, marginTop }) {
  const styles = {
    color,
    animationDuration: animationLength,
    fontSize: size,
    marginTop,
  };

  return <div className="loader" data-testid="loader" style={styles}></div>;
}
