import React from 'react'

function Indicator(isAvailable) {
  const StatusText = isAvailable ? "In Stock" : "Out of Stock";
  const StatusClass = isAvailable ? "stock-available" : "stock-unavailable";
  return (
    <span className={StatusClass}>{StatusText}</span>
  );
};

export default Indicator