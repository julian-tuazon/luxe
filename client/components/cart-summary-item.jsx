import React from 'react';

export default function CartSummaryItem(props) {
  return (
    <div className="card card-body d-flex flex-column flex-md-row justify-content-between mb-4">
      <img
        src={props.item.image}
        className="col-md-4 mb-4 mb-md-0 px-0 py-2"
        alt={props.item.name} />
      <div className="d-flex flex-column justify-content-center col-md-7 px-0">
        <h4 className="card-title">{props.item.name}</h4>
        <div>
          <p className="d-inline-block text-success border border-success rounded p-2">${props.item.price}</p>
        </div>
        <p>{props.item.shortDescription}</p>
        <div className="d-flex align-items-center">
          <i className="far fa-times-circle text-danger mr-2"></i>
          <button type="button" id="delete" className="btn px-0 text-danger" onClick={() => props.deleteFromCart(props.item.productId)}>Remove</button>
        </div>
      </div>
    </div>
  );
}
