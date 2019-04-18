import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { name: accountName } = JSON.parse(localStorage.getItem('setting'));

    return (
      <div>
        <div className="py-4 bg-white">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/" className="font-weight-bold text-dark">
                { accountName }
              </Link>
              <Link to="/setting" className="text-dark small">
                <i className="fa fa-cog fa-fw" /> Setting
              </Link>
            </div>
          </div>
        </div>
        <hr className="m-0" />
      </div>
    );
  }
}

export default Header;
