import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiSearchCircle } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";

const Header = ({ setCheckinDate, setCheckoutDate }) => {
  const userState = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div className="container-fluid header-wrapper">
        <div className="row">
          <div className="upper-header col-12 d-flex">
            <div className="col-3 ">
              <img
                src="./images/logo.png"
                className="img-fluid w-50"
                alt="logo"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
            <div className="col-5"></div>
            <div className="col-4 d-flex  align-items-center justify-content-end px-4">
              {!userState && (
                <Link to="/login" className="login-btn">
                  <FaUser />
                  Log in Or Register
                </Link>
              )}
              {userState && (
                <button onClick={handleLogout} className="login-btn">
                  <IoLogOut />
                  Logout
                </button>
              )}
            </div>
          </div>
          <div className="bottom-header d-flex justify-content-center col-12 py-2">
            {/* <div className="col-2 "></div> */}
            <div className="col  search-wrapper d-flex align-items-center justify-content-evenly">
              <span className="end-border-line">
                <h6>Location</h6>
                <input
                  type="text"
                  className="filter-inputs me-2"
                  placeholder="Which City do you prefer?"
                />
              </span>
              <span className="end-border-line px-3">
                <h6>Check In</h6>
                {/* <input className="filter-inputs" placeholder="Add Dates" /> */}
                <DatePicker
                  selected={null}
                  onChange={(date) => setCheckinDate(date)}
                  className="filter-inputs z-10"
                  placeholderText="Add Dates"
                  popperClassName="date-picker-popper"
                />
              </span>
              <span className="end-border-line px-3">
                <h6>Check Out</h6>
                {/* <input className="filter-inputs" placeholder="Add Dates" /> */}
                <DatePicker
                  selected={null}
                  onChange={(date) => setCheckoutDate(date)}
                  className="filter-inputs z-10"
                  placeholderText="Add Dates"
                  popperClassName="date-picker-popper"
                />
              </span>
              <span className="px-3">
                <h6>Guests</h6>
                <input
                  type="Number"
                  className="filter-inputs"
                  placeholder="Add No. of guests"
                />
              </span>
              <button className="search-btn">
                <HiSearchCircle className="fs-40" />
              </button>
            </div>
            <div className="col-2  d-flex align-items-center justify-content-center">
              <MdManageAccounts className="fs-1" onClick={()=>{navigate("/bookings")}}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
