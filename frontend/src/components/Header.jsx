import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiSearchCircle } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { format, differenceInDays } from "date-fns";
import { hotels } from "../utils/Data";
import { Typeahead } from "react-bootstrap-typeahead";
import { toast } from "react-toastify";

const Header = ({
  setCheckinDate,
  setCheckoutDate,
  checkinDate,
  checkoutDate,
  setLoc,
  loc,
  noOfGuests,
  setNoOfGuests,
}) => {
  let cities = [];
  for (let i = 0; i < hotels.length; i++) {
    const city = hotels[i]?.location?.city;
    cities.push(city);
  }

  cities = [...new Set(cities)];
  console.log(cities);

  const userState = useSelector((state) => state?.auth?.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const formatDate = (date) => {
    return format(new Date(date), "MMMM dd, yyyy");
  };

  useEffect(() => {
    console.log(noOfGuests);
  }, [noOfGuests]);
  return (
    <>
      <div className="container-fluid header-wrapper container-xxl">
        <div className="row">
          <div className="upper-header col-12 d-flex">
            <div className="col-3 ">
              <img
                src="../images/logo.png"
                className="img-fluid w-lg-50"
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
          <div className="bottom-header d-flex flex-wrap justify-content-center col-12 py-2">
            {/* <div className="col-2 "></div> */}
            <div className="col-12 col-md-8 search-wrapper flex-wrap d-flex align-items-center">
              <span className="end-border-line col">
                <h6>Location</h6>
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    setLoc(selected);
                  }}
                  options={cities}
                  minLength={1}
                  labelKey={"name"}
                  placeholder="Location"
                  className="custom-typeahead"
                />
              </span>
              <span className="end-border-line col-3 px-2">
                <h6>Check In</h6>
                {/* <input className="filter-inputs" placeholder="Add Dates" /> */}
                <DatePicker
                  selected={checkinDate}
                  onChange={(date) => setCheckinDate(date)}
                  className="filter-inputs z-10"
                  placeholderText="Add Dates"
                  popperClassName="date-picker-popper"
                  minDate={new Date()}
                  value={checkinDate ? formatDate(checkinDate) : ""}
                />
              </span>
              <span className="end-border-line col-3 px-2">
                <h6>Check Out</h6>
                <DatePicker
                  selected={checkoutDate}
                  onChange={(date) => setCheckoutDate(date)}
                  className="filter-inputs z-10"
                  placeholderText="Add Dates"
                  popperClassName="date-picker-popper"
                  minDate={checkinDate || new Date()}
                  value={checkoutDate ? formatDate(checkoutDate) : ""}
                />
              </span>
              <span className="px-2 col align-self-stretch end-border-line d-flex align-items-start position-relative">
                <h6>Guests</h6>
                <input
                  type="Number"
                  className="filter-inputs position-absolute bottom-0"
                  placeholder="Guests"
                  onChange={(e) => {
                    setNoOfGuests(e.target.value);
                  }}
                />
              </span>
              <button className="search-btn col-1 d-flex justify-content-end">
                <HiSearchCircle
                  className="fs-40"
                  onClick={() => {
                    navigate("/hotels");
                  }}
                />
              </button>
            </div>
            <div className="col-2  d-flex align-items-center justify-content-center">
              {userState && (
                <MdManageAccounts
                  className="fs-1"
                  onClick={() => {
                    navigate("/bookings");
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
