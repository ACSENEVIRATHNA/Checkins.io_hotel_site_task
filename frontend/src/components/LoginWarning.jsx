import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";

const LoginWarning = (props) => {
  const {message} = props; 
  const navigate = useNavigate();
  return (
    <>
      <div className="login-warning-wrapper shadow-lg position-fixed start-25 top-50  position-relative border rounded p-2 d-flex flex-column align-items-center">
        <p className="mt-4">Login to {message}</p>
        <button
          className="position-absolute m-1 top-0 end-0 border-0"
          onClick={() => {
            navigate("/");
          }}
        >
          <FaWindowClose />
        </button>
        <button className="login border rounded px-1 d-flex align-items-center gap-2" onClick={()=>{navigate("/login")}}>
          <BiLogIn />
          <span>Login</span>
        </button>
      </div>
    </>
  );
};

export default LoginWarning;
