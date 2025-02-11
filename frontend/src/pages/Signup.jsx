import React from "react";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const SignupSchema = yup.object({
  userName: yup.string().required("Username is required"),
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email address is required"),
  mobile: yup.string().required("Mobile Number is required"),
  password: yup.string().required("Password is required"),
});

const Signup = () => {
  const userState = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const lowercaseEmail = values.email.toLowerCase();
      dispatch(registerUser({ ...values, email: lowercaseEmail })).then(() => {
        if (userState?.isError === true) {
          toast.error(
            "Something dont match! Please try again with proper values!"
          );
        } else if (userState?.isSuccess === true) {
          toast.success("Sign Up Successfully!");
        }
      });
    },
  });

  return (
    <>
      <div class1="signup-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 vh-100 d-flex justify-content-center align-items-center">
            <div className="auth-card border shadow">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="text"
                  name="userName"
                  placeholder="User Name"
                  value={formik.values.userName}
                  onchange={formik.handleChange("userName")}
                  onblur={formik.handleBlur("userName")}
                />
                <div className="error">
                  {formik.touched.userName && formik.errors.userName}
                </div>
                <CustomInput
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onchange={formik.handleChange("firstName")}
                  onblur={formik.handleBlur("firstName")}
                />
                <div className="error">
                  {formik.touched.firstName && formik.errors.firstName}
                </div>
                <CustomInput
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onchange={formik.handleChange("lastName")}
                  onblur={formik.handleBlur("lastName")}
                />
                <div className="error">
                  {formik.touched.lastName && formik.errors.lastName}
                </div>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formik.values.email}
                  onchange={formik.handleChange("email")}
                  onblur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.values.mobile}
                  onchange={formik.handleChange("mobile")}
                  onblur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  classdiv="mt-1"
                  value={formik.values.password}
                  onchange={formik.handleChange("password")}
                  onblur={formik.handleBlur("password")}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className="mt-3 d-flex flex-column justify-content-center gap-15 align-items-center">
                    <button
                      type="submit"
                      className="button border rounded p-2 signup"
                    >
                      Sign Up
                    </button>
                    <Link className="link-offset-2" to="/login">
                      Cancel
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
