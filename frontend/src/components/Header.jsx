import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiSearchCircle } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Header = () => {
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  console.log(checkinDate);
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
              />
            </div>
            <div className="col-5"></div>
            <div className="col-4 d-flex  align-items-center justify-content-center">
              <button className="login-btn">
                <FaUser />
                Log in Or Register
              </button>
            </div>
          </div>
          <div className="bottom-header d-flex justify-content-center col-12 py-2">
            <div className="search-wrapper d-flex align-items-center justify-content-evenly">
              <span className="end-border-line">
                <h6>Location</h6>
                <input
                  type="text"
                  className="filter-inputs me-2"
                  placeholder="Which City do you prefer?"
                />
              </span>
              <span className="end-border-line">
                <h6>Check In</h6>
                {/* <input className="filter-inputs" placeholder="Add Dates" /> */}
                <DatePicker
                  selected={checkinDate}
                  onChange={(date) => setCheckinDate(date)}
                  className="filter-inputs z-10"
                  placeholderText="Add Dates"
                  popperClassName="date-picker-popper"
                />
              </span>
              <span className="end-border-line">
                <h6>Check Out</h6>
                {/* <input className="filter-inputs" placeholder="Add Dates" /> */}
                <DatePicker
                  selected={checkoutDate}
                  onChange={(date) => setCheckoutDate(date)}
                  className="filter-inputs z-10"
                  placeholderText="Add Dates"
                  popperClassName="date-picker-popper"
                />
              </span>
              <span>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
