import React from "react";
import circular_logo from "../Images/circular_logo.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { getAdminLogin, saveAuthToken } from "./../../Service/adminService";
import InputError from './../InputError';

export default function AdminLogin({ history }) {
  let initialValues = {
    admin_name: "",
    admin_password: "",
  };

  let validationSchema = yup.object().shape({
    admin_name: yup.string().min(4, "username must be more than 4 characters").max(30, "admin username must be less than 30 characters").required("username is required"),
    admin_password: yup.string().required("password is required")
  });

  let onSubmit = (values) => {
    getAdminLogin("check-admin-login", values).then((result) => {
      if (result === undefined) return false;
      saveAuthToken(result.headers.x_auth_token);
    });
  };

  return (
    <div className="parentContainer  flex flex-direction-column">
      <div className="loginContainer">
        <div className="loginHeader flex align-items-center justify-content-space-around">
          <img src={circular_logo} alt="logo" />
          <h2> Admin Panel Login</h2>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          <Form>
            <div className="loginBody">
              <div className=" flex flex-direction-column justify-content-center align-items-center">
                <div className="login-form-group flex justify-content-center align-items-center">
                  <span className="flex justify-content-center align-items-center">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                  <Field
                    name="admin_name"
                    id="admin_name"
                    placeholder="User Name"
                  />
                </div>
                <ErrorMessage name="admin_name" className="error" component={InputError} />
              </div>
              <div className=" flex flex-direction-column justify-content-center align-items-center">
                <div className="login-form-group flex justify-content-center align-items-center">
                  <span className="flex  justify-content-center align-items-center">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </span>
                  <Field
                    name="admin_password"
                    id="admin_password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <ErrorMessage name="admin_password" className="error" component={InputError} />
              </div>
              <div className="loginButton flex justify-content-space-around align-items-center">
                <button onClick={() => {
                  history.push("/admin/register")
                }}>Sign Up</button>
                <button className="flex align-items-center">Login</button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}