import React from 'react';

export default function Footer(props) {
  return (
    <div className="py-4 mx-0 row text-white bg-dark footer">
      <div className="col-11 mx-auto d-flex flex-column flex-sm-row justify-content-between align-items-center">
        <div className="mb-4 mb-sm-0">Live Luxuriously &trade;</div>
        <div className="d-flex align-items-center mb-4 mb-sm-0">
          <i className="fas fa-glass-martini-alt fa-lg mr-3"></i>
          <h5>L U X E</h5>
        </div>
        <div className="d-flex flex-column text-center">
          <p className="mb-1">Follow Us</p>
          <div>
            <i className="fab fa-facebook-f fa-md mr-3"></i>
            <i className="fab fa-instagram fa-md mr-3"></i>
            <i className="fab fa-twitter fa-md mr-3"></i>
            <i className="fab fa-youtube fa-md"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
