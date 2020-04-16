import React from 'react';

export default function Footer(props) {
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <div className="py-4 mx-0 row text-white bg-dark footer">
      <div className="col-11 mx-auto d-flex flex-column flex-sm-row justify-content-between align-items-center">
        <div className="btn text-white mb-4 mb-sm-0" onClick={scrollToTop}>
          Back to Top
          <i className="fas fa-angle-double-up ml-2"></i>
        </div>
        <div className="d-flex flex-column align-items-center">
          <div className="d-flex align-items-center mb-4 mb-sm-2">
            <i className="fas fa-glass-martini-alt fa-lg mr-3"></i>
            <h5 className="mb-0 mr-3">L U X E</h5>
            <small>Live Luxuriously &trade;</small>
          </div>

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
