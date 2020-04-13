import React from 'react';

export default function CartSummaryItem(props) {
  const updateQuantity = e => {
    if (!props.canClick) return;
    if (e.currentTarget.id === 'plus') return props.updateQuantity(props.item.productId, 1);
    if (e.currentTarget.id === 'minus' && props.item.quantity > 1) return props.updateQuantity(props.item.productId, -1);
  };

  const setButtonStatus = () => {
    return (props.item.quantity > 1) ? 'btn ml-2 text-primary' : 'btn ml-2 disabled';
  };

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
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center mb-3">
            <h5 className="mb-0">Quantity:</h5>
            <button type="button" id="minus" className={setButtonStatus()} onClick={updateQuantity}>
              <i className="fas fa-minus fa-xs"></i>
            </button>
            <h5 className="mb-0 text-center col-2 col-sm-1 px-0">{props.item.quantity}</h5>
            <button type="button" id="plus" className="btn text-primary" onClick={updateQuantity}>
              <i className="fas fa-plus fa-xs"></i>
            </button>
          </div>
          <div>
            <button type="button" id="delete" className="btn text-secondary px-0" onClick={() => props.deleteFromCart(props.item.productId)}>
              <i className="fas fa-times text-secondary fa-sm mr-2"></i>
              Remove
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
