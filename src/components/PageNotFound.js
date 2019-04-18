import React from 'react';
import {Link} from 'react-router-dom';

export default function PageNotFound({location}) {
  return (
    <div className="container my-5">
      <div className="card shadow-sm text-center">
        <div className="card-body">
          <p>Something went wrong!</p>
          <p className="mb-0">
            Go back to <Link to="/">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
