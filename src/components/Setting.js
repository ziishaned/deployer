import * as Yup from 'yup';
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';

import logo from '../logo.png';

const SETTING_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Name is required field.'),
  url: Yup.string().required('URL is required field.'),
  username: Yup.string().required('Username is required field.'),
  key: Yup.string().required('API token is required field.'),
});

export default class Setting extends Component {
  state = {
    setting: {name: '', url: '', username: '', key: ''},
    toDashboard: false,
  };

  componentWillMount() {
    const setting = JSON.parse(localStorage.getItem('setting'));

    this.setState({
      setting,
    });
  }

  handleSubmit = (values, {setSubmitting}) => {
    setSubmitting(false);
    localStorage.setItem('setting', JSON.stringify(values));
    this.setState({
      toDashboard: true,
    });
  };

  render() {
    const {toDashboard, setting} = this.state;
    if (toDashboard) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container mb-5">
        <div className="card shadow-sm" style={{marginTop: '3.6rem'}}>
          <div className="card-body">
            <div className="text-center mb-3">
              <img src={logo} alt="Deployer" width="98" />
            </div>
            <Formik
              initialValues={setting}
              validationSchema={SETTING_SCHEMA}
              onSubmit={this.handleSubmit}
              render={({errors, touched, isSubmitting}) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="fa fa-lock fa-fw" /> Name
                    </label>
                    <Field
                      type="text"
                      className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                      name="name"
                      id="name"
                    />
                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="url">
                      <i className="fa fa-link fa-fw" /> URL
                    </label>
                    <Field
                      type="text"
                      className={`form-control ${errors.url && touched.url ? 'is-invalid' : ''}`}
                      name="url"
                      id="url"
                    />
                    <ErrorMessage name="url" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">
                      <i className="fa fa-user fa-fw" /> Username
                    </label>
                    <Field
                      type="text"
                      className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                      name="username"
                      id="username"
                    />
                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="key">
                      <i className="fa fa-key fa-fw" /> API token
                    </label>
                    <Field
                      type="text"
                      className={`form-control ${errors.key && touched.key ? 'is-invalid' : ''}`}
                      name="key"
                      id="key"
                    />
                    <ErrorMessage name="key" component="div" className="invalid-feedback" />
                  </div>
                  <div className="text-center mb-2 mt-4">
                    <button type="submit" className="btn btn-dark shadow-sm btn-block" disabled={isSubmitting}>
                      Update
                    </button>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}
