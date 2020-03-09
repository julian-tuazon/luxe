import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="col mb-4">
      <div className="card">
        <img src={props.image} className="card-img-top" alt={props.name}></img>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">${props.price}</p>
          <p className="card-text">{props.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
