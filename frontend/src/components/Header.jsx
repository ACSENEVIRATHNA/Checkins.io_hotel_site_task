import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { HiSearchCircle } from "react-icons/hi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { format } from "date-fns";
import { hotels } from "../utils/Data";
import { Typeahead } from "react-bootstrap-typeahead";
import { Popover } from "bootstrap";

const Header = ({
  setCheckinDate,
  setCheckoutDate,
  checkinDate,
  checkoutDate,
  setLoc,
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
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    const popoverList = Array.from(popoverTriggerList).map(
      (popoverTriggerEl) =>
        new Popover(popoverTriggerEl, {
          trigger: "hover",
        })
    );

    return () => {
      popoverList.forEach((popover) => popover.dispose());
    };
  }, []);

  useEffect(() => {
    console.log(noOfGuests);
  }, [noOfGuests]);
  return (
    <>
      <div className="container-fluid header-wrapper container-xxl pt-3">
        <div className="row">
          <div className="upper-header col-12 d-flex justify-content-between">
            <div className="col-4 col-sm-3">
              <img
                src="../images/logo.png"
                className="img-fluid w-lg-50 logo"
                alt="logo"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
            <div className="col-4 d-flex  align-items-center justify-content-end px-4">
              {!userState && (
                <span
                  className="d-inlin-block"
                  tabindex="0"
                  data-bs-toggle="popover"
                  data-bs-trigger="hover"
                  data-bs-content="Log In"
                >
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="border-0 bg-transparent"
                  >
                    <FaUser className="fs-2" />
                  </button>
                </span>
              )}
              {userState && (
                <div className="d-flex gap-2">
                  <span
                    className="d-inlin-block"
                    tabindex="0"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover"
                    data-bs-content="Bookings"
                  >
                    <button
                      type="button"
                      className="border-0 bg-transparent"
                      onClick={() => {
                        navigate("/bookings");
                      }}
                    >
                      <MdManageAccounts className="fs-1" />
                    </button>
                  </span>
                  <span
                    className="d-inlin-block"
                    tabindex="0"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover"
                    data-bs-content="Logout"
                  >
                    <button
                      onClick={handleLogout}
                      className="border-0 bg-transparent"
                    >
                      <RiLogoutCircleRLine className="fs-1" />
                    </button>
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="bottom-header d-flex flex-wrap justify-content-center col-12 py-2">
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
              <span className="px-2 col align-self-stretch d-flex align-items-start position-relative">
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
              <button className="search-btn col-1 d-flex justify-content-center">
                <HiSearchCircle
                  className="fs-40"
                  onClick={() => {
                    navigate("/hotels");
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
