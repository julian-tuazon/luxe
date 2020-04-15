import React from 'react';

export default function Warning(props) {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center d-flex flex-column align-items-center justify-content-center col-11">
        <h5 className="mb-4">Please note that this website is for <strong>demonstration purposes only</strong>.</h5>
        <h5 className="mb-5">By clicking the following button, <strong>I understand that no real purchases will be made and that personal information such as names, addresses, and real credit card numbers should not be used</strong>.</h5>
        <div className="text-center">
          <button type="button" id="catalog" className="btn btn-danger" onClick={() => props.setView('catalog', {})}>Accept</button>
        </div>
      </div>
    </div>
  );
}
