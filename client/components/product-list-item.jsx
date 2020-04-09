import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="col mb-4">
      <div className="card card-body h-100 btn" id={props.product.productId} onClick={props.handleClick}>
        <img src={props.product.image} className="mb-4" alt={props.product.name} />
        <div>
          <h4 className="card-title">{props.product.name}</h4>
          <p className="btn btn-outline-success">${props.product.price}</p>
          <p>{props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
