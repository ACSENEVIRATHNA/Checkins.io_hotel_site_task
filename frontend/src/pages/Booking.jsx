import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllBookings,
  deleteBooking,
  getBookings,
} from "../features/auth/authSlice";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { MdFolderDelete } from "react-icons/md";
import UpdateBooking from "../components/UpdateBooking";
import { format ,differenceInDays} from "date-fns";

const Booking = () => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState(null);
  const bookingState = useSelector((state) => state?.auth?.bookings);
  const loadingState = useSelector((state) => state?.auth?.isLoading);
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
        <div className="col-12 d-flex border rounded mx-2 mt-2 p-2">
          <div className="col-3 text-center">Name</div>
          <div className="col-3 text-center">Dates</div>
          <div className="col-3 text-center">Price</div>
          <div className="col-3 text-center">Actions</div>
        </div>
        <div className="col-12">
          {bookingState &&
            bookingState?.map((item, index) => {
              return (
                <div key={index} className="d-flex align-items-center border rounded m-2 p-2">
                  <div className="col-3">
                    <div className="hotel-name fw-bold">
                    {item?.hotelName}
                    </div>
                    <div className="room-name">
                      {item?.roomName}
                    </div>
                  </div>
                  <div className=" text-center col-3 d-flex flex-column align-items-center">
                    <div className="checkin">CheckIn :&nbsp;{formatDate(item?.checkinDate)}</div>
                    <div className="checkout">CheckOut :&nbsp;{formatDate(item?.checkoutDate)}</div>
                  </div>
                  
                  <div className="justify-content-center col-3 d-flex align-items-center">${item?.totalPrice}</div>
                  <div className="col-3 d-flex justify-content-evenly align-items-center">
                    <CiEdit
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
        <div
          className="d-flex col-12 justify-content-end mt-3"
          onClick={() => handleDeleteAll()}
        >
          <div className="d-flex justify-content-center  gap-2 align-items-center rounded border px-2 py-1">
            <MdFolderDelete className="fs-4" />
            <span>Delete All</span>
          </div>
        </div>
        {update && <UpdateBooking item={item} setUpdate={setUpdate} />}
      </div>
      
    </>
  );
};

export default Booking;
