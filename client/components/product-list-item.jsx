import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="col mb-4">
      <div className="card h-100 btn" id={props.product.productId} onClick={props.handleClick}>
        <img src={props.product.image} className="card-img-top" alt={props.product.name} />
        <div className="card-body">
          <h5 className="card-title">{props.product.name}</h5>
          <p>${props.product.price}</p>
          <p className="card-text">{props.product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
