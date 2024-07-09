import React, { useEffect } from "react";
// import BreadCrumb from "../components/BreadCrumb";
// import Meta from "../components/Meta";
import { Link } from "react-router-dom";
// import Container from "./Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAUser, loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const LoginSchema = yup.object({
  email: yup
    .string()
    .nullable()
    .email("Email should be valid")
    .required("Email Address is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state?.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (userState?.isSuccess === true) {
      navigate("/");
    }
  }, [userState]);

  return (
    <>
      {/* <Meta title={"Login"} />
      <BreadCrumb title="Login" /> */}
      <div class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  onchange={formik.handleChange("email")}
                  onblur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="mt-1"
                  onchange={formik.handleChange("password")}
                  onblur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-5 align-items-center">
                    <button type="submit" className="button border p-1 rounded">
                      Login
                    </button>
                    <Link to="/signup" className="button border p-1 rounded signup">
                      Sign Up
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

export default Login;
