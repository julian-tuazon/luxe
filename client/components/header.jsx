import React from 'react';

export default function Header(props) {
  return (
    <div className="d-flex justify-content-between">
      <h5 className="text-white bg-dark p-3 mb-5">
        <i className="fas fa-dollar-sign fa-sm mr-3"></i>
        Wicked Sales
      </h5>
      <h5 className="text-white bg-dark p-3 mb-5">
        <i className="fas fa-shopping-cart fa-sm mr-3"></i>
        {props.cartItemCount}
      </h5>
    </div>

  );
}
