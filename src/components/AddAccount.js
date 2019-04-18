import * as Yup from 'yup';
import { Redirect } from 'react-router';
import React, { Component } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import logo from '../logo.png';

const AddAccountSchema = Yup.object().shape({
  name: Yup.string().required('Name is required field.'),
  url: Yup.string().required('URL is required field.'),
  username: Yup.string().required('Username is required field.'),
  key: Yup.string().required('API token is required field.')
});

export default class AddAccount extends Component {
  state = {
    toDashboard: false
  };

  handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    localStorage.setItem('account', JSON.stringify(values));
    this.setState({
      toDashboard: true
    });
  };

  render() {
    const { toDashboard } = this.state;
    if (toDashboard) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container mb-5">
        <div className="card shadow-sm" style={{ marginTop: '2.1rem' }}>
          <div className="card-body">
            <div className="text-center mb-3">
              <img src={logo} alt="" width="98" />
            </div>
            <Formik
              initialValues={{ name: '', url: '', username: '', key: '' }}
              validationSchema={AddAccountSchema}
              onSubmit={this.handleSubmit}
              render={({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field
                      type="text"
                      className={`form-control ${
                        errors.name && touched.name ? 'is-invalid' : ''
                      }`}
                      name="name"
                      id="name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="url">URL</label>
                    <Field
                      type="text"
                      className={`form-control ${
                        errors.url && touched.url ? 'is-invalid' : ''
                      }`}
                      name="url"
                      id="url"
                    />
                    <ErrorMessage
                      name="url"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field
                      type="text"
                      className={`form-control ${
                        errors.username && touched.username ? 'is-invalid' : ''
                      }`}
                      name="username"
                      id="username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="key">API token</label>
                    <Field
                      type="text"
                      className={`form-control ${
                        errors.key && touched.key ? 'is-invalid' : ''
                      }`}
                      name="key"
                      id="key"
                    />
                    <ErrorMessage
                      name="key"
                      component="div"
                      className="invalid-feedback"
                    />
                    <p className="form-text text-muted mt-2">
                      Not sure how to get the API token?{' '}
                      <a href="/">See tutorial</a>
                    </p>
                  </div>
                  <div className="text-center mb-2">
                    <button
                      type="submit"
                      className="btn btn-success shadow-sm mt-2"
                      disabled={isSubmitting}
                    >
                      Add account
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
