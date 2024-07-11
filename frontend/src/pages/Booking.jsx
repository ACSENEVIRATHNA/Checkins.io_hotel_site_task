import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllBookings,
  deleteBooking,
  getBookings,
} from "../features/auth/authSlice";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { MdFolderDelete } from "react-icons/md";
import UpdateBooking from "../components/UpdateBooking";
import { format, differenceInDays } from "date-fns";
import LoginWarning from "../components/LoginWarning";

const Booking = () => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState(null);
  const bookingState = useSelector((state) => state?.auth?.bookings);
  const loadingState = useSelector((state) => state?.auth?.isLoading);
  const userState = useSelector((state) => state?.auth?.user);
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  console.log(bookingState);

  const handledelete = (id) => {
    dispatch(deleteBooking(id)).then(() => dispatch(getBookings()));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllBookings()).then(() => dispatch(getBookings()));
  };

  const handleUpdate = (item) => {
    setUpdate(true);
    setItem(item);
  };

  const formatDate = (date) => {
    return format(new Date(date), "MMMM dd, yyyy");
  };

  return (
    <>
      <div className="booking-wrapper position-relative">
        <h4 className="ms-2">Bookings</h4>
        <div className="col-12 d-md-flex border rounded mx-2 mt-2 p-2 d-none">
          <div className="col-3 text-center">Name</div>
          <div className="col-3 text-center">Dates</div>
          <div className="col-3 text-center">Price</div>
          <div className="col-3 text-center">Actions</div>
        </div>
        <div className="col-12">
          {bookingState &&
            bookingState?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="d-flex flex-column flex-md-row align-items-start align-items-md-center border rounded m-2 p-2 position-relative"
                >
                  <div className="col-12 col-md-3">
                    <div className="hotel-name fw-bold">{item?.hotelName}</div>
                    <div className="room-name">{item?.roomName}</div>
                  </div>
                  <div className=" text-center pe-3 col-12 col-md-3 d-flex flex-md-column align-items-center justify-content-between">
                    <div className="checkin d-flex align-items-start flex-column flex-md-row">
                      <span>CheckIn :</span>
                      <b>{formatDate(item?.checkinDate)}</b>
                    </div>
                    <div className="checkout d-flex flex-column align-items-start flex-md-row">
                      <span>CheckOut :</span>
                      <b>{formatDate(item?.checkoutDate)}</b>
                    </div>
                  </div>
                  <div className="justify-content-md-center col-12 col-md-3 d-flex align-items-center">
                    <b className="d-md-none">Total :&nbsp;</b>
                    <span><b className="fs-5">$&nbsp;{item?.totalPrice}</b></span>
                  </div>
                  <div className="col-3 m-2 d-flex justify-content-evenly align-items-center position-absolute bottom-0 end-0">
                    <RiEdit2Fill
                      className="fs-2"
                      onClick={() => handleUpdate(item)}
                    />
                    <MdDeleteForever
                      className="fs-2"
                      onClick={() => handledelete(item?._id)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="d-flex col-12 justify-content-end mt-3">
          <button
            className="d-flex justify-content-center  gap-2 align-items-center rounded border px-2 py-1"
            onClick={() => handleDeleteAll()}
          >
            <MdFolderDelete className="fs-4" />
            <span>Delete All</span>
          </button>
        </div>
        {update && <UpdateBooking item={item} setUpdate={setUpdate} />}
        {!userState && <LoginWarning />}
      </div>
    </>
  );
};

export default Booking;
