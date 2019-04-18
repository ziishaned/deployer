import { Redirect } from 'react-router';
import React, { Component } from 'react';

import Header from './partials/Header';
import {getJobParameter} from '../services/jenkins';

export default class JobBuild extends Component {
  constructor(props) {
    super(props);

    const { match } = props;
    this.state = {
      redirectToHome: false,
      jobParametersList: {},
      loadingJobParameter: true,
      jobName: match.params.name
    };
  }

  async componentWillMount() {
    const { match } = this.props;

    const jobName = match.params.name;
    const jobParametersList = await getJobParameter(jobName);

    this.setState({
      jobParametersList,
      loadingJobParameter: false
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { elements: parameters } = document.getElementById('build-form');

    const formData = {};
    for (let i = 0; i < parameters.length - 1; i += 1) {
      const item = parameters.item(i);
      formData[item.name] = item.value;
    }

    await this.jenkins.job.build({
      name: 'dev-api-config-web',
      parameters: formData
    });

    this.setState({
      redirectToHome: true
    });
  };

  render() {
    const {
      jobParametersList,
      jobName,
      loadingJobParameter,
      redirectToHome
    } = this.state;
    if (redirectToHome) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Header />
        <div className="container">
          <h6 className="text-uppercase py-4 mb-0 font-weight-bold d-flex align-items-center">
            <div className="mr-2">
              <i className="fa fa-briefcase-medical fa-fw" />
            </div>
            <div>{jobName}</div>
          </h6>
          {loadingJobParameter && (
            <p className="text-center py-5">Loading...</p>
          )}
          {!loadingJobParameter && (
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-white">Parameter</div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit} id="build-form">
                  {jobParametersList.map((parameter, index) => (
                    <div className="form-group" key={index.toString()}>
                      <label htmlFor={parameter.name}>{parameter.name}</label>
                      <input
                        type="text"
                        name={parameter.name}
                        id={parameter.name}
                        className="form-control"
                        defaultValue={
                          parameter.defaultParameterValue
                            ? parameter.defaultParameterValue.value
                            : ''
                        }
                      />
                    </div>
                  ))}
                  <div className="text-center">
                    <button type="submit" className="btn btn-dark shadow-sm">
                      Build
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
