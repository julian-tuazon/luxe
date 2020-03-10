import React from 'react';

export default function Header(props) {
  return (
    <div className="py-3 mx-0 mb-5 row text-white bg-dark">
      <div className="col-11 mx-auto d-flex justify-content-between">
        <h5>
          <i className="fas fa-dollar-sign fa-sm mr-3"></i>
          Wicked Sales
        </h5>
        <h5>
          <i className="fas fa-shopping-cart fa-sm mr-3"></i>
          {props.cartItemCount}
        </h5>
      </div>
    </div>
  );
}
