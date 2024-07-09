import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../features/auth/authSlice";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const Booking = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookings());
  }, []);
  const bookingState = useSelector((state) => state?.auth?.bookings);
  console.log(bookingState);

  

  return (
    <div className="booking-wrapper">
      <div className="col-12 d-flex border rounded mx-2 mt-2">
        <div className="col-3 text-center">Name</div>
        <div className="col-3 text-center">Dates</div>
        <div className="col-3 text-center">Price</div>
        <div className="col-3 text-center">Actions</div>
      </div>
      <div className="col-12">
        {bookingState &&
          bookingState?.map((item, index) => {
            return (
              <div key={index} className="d-flex border rounded m-2">
                <div className="col-3">{item?.hotelName}</div>
                <div className="col-3">
                  <div className="checkin">{item?.checkinDate}</div>
                  <div className="checkout">{item?.checkoutDate}</div>
                </div>
                <div className="col-3">${item?.price}</div>
                <div className="col-3 d-flex justify-content-evenly align-items-center">
                  <CiEdit className="fs-2" />
                  <MdDeleteForever className="fs-2" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Booking;
