// import { shell } from 'electron';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import Header from './partials/Header';
import {getJobs} from '../services/jenkins';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      filteredJobs: [],
      loadingJobs: true
    };
  }

  async componentWillMount() {
    const { jobs } = await getJobs();

    this.setState({
      jobs,
      filteredJobs: jobs,
      loadingJobs: false
    });
  }

  filterJobs = e => {
    let { jobs: updatedList } = this.state;
    updatedList = updatedList.filter(
      ({ name }) =>
        name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    );
    this.setState({
      filteredJobs: updatedList
    });
  };

  render() {
    const { filteredJobs, loadingJobs } = this.state;

    return (
      <div>
        <Header />
        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-4">
            <h6 className="text-uppercase mb-0 font-weight-bold d-flex align-items-center">
              <div className="mr-2">
                <i className="fa fa-folder fa-fw" />
              </div>
              <div>JOBS</div>
            </h6>
            {/* <div className="small"> */}
            {/*  <i className="fa fa-sort-amount-down fa-fw"/> Sort */}
            {/* </div> */}
          </div>
          <div className="d-flex align-items-center small">
            <i className="fa fa-search fa-fw text-muted position-absolute pl-3" />
            <input
              type="text"
              className="form-control py-4"
              placeholder="Search..."
              style={{ paddingLeft: 38 }}
              onChange={this.filterJobs}
            />
          </div>
          {loadingJobs && <p className="text-center py-5">Loading...</p>}
          {!loadingJobs && !filteredJobs.length && (
            <p className="text-center py-5">Nothing found!</p>
          )}
          {!loadingJobs && (
            <ul className="list-unstyled mb-4">
              {filteredJobs.map((job, index) => (
                <li
                  className="border rounded px-3 py-3 mt-3 shadow-sm bg-white"
                  key={index.toString()}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      {job.color === 'blue' ? (
                        <i className="fa fa-check-circle fa-fw mr-2 text-success" />
                      ) : (
                        <i className="fa fa-times-circle fa-fw mr-2 text-danger" />
                      )}
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          console.log('Open link inside browser!');
                          // shell.openExternal(job.url);
                        }}
                        className="text-dark"
                        title="Open link in browser."
                      >
                        {job.name}
                      </a>
                    </div>
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <Link
                          to={`/job/${job.name}/build`}
                          className="btn btn-dark btn-sm shadow-sm"
                        >
                          <i className="fa fa-wrench fa-fw" /> Build
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
