import React from 'react';

export default function CartSummaryItem(props) {
  return (
    <div className="row mb-3 mx-0">
      <div className="card col-7 mx-auto">
        <div className="row">
          <img
            src={props.product.image}
            className="card-img-top col-4"
            alt={props.product.name}
            style={{ objectFit: 'contain', maxHeight: '300px' }} />
          <div className="d-flex flex-column justify-content-center col-7">
            <h3 className="card-title">{props.product.name}</h3>
            <h5 className="text-muted">${props.product.price}</h5>
            <p>{props.product.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
