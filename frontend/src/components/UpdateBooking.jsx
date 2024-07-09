import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { IoMdSave } from "react-icons/io";
import { format, differenceInDays } from "date-fns";
import { useDispatch } from "react-redux";
import { getBookings, updateBooking } from "../features/auth/authSlice";

const UpdateBooking = (props) => {
  const { item } = props;
  const dispatch = useDispatch();
  const [checkin, setCheckin] = useState(item?.checkinDate);
  const [checkout, setCheckout] = useState(item?.checkoutDate);
  const [total, setTotal] = useState(item?.totalPrice);

  useEffect(() => {
    let noOfDays = differenceInDays(new Date(checkout), new Date(checkin));
    setTotal(item?.price * noOfDays);
  }, [checkin, checkout]);

  const handleUpate = () => {
    dispatch(
      updateBooking({
        bookingId: item?._id,
        checkinDate: checkin,
        checkoutDate: checkout,
        totalPrice: total,
      })
    ).then(() => {
      dispatch(getBookings());
    });
  };
  return (
    <>
      <div className="update-booking-wrapper border rounded p-2">
        <div className="hotel-name fw-bold">{item?.hotelName}</div>
        <div className="room-name fw-semibold">{item?.roomName}</div>
        <div className="dates d-flex">
          <div className="checkin">
            <span>Check In Date</span>
            <DatePicker
              selected={checkin}
              onChange={(date) => setCheckin(date)}
              className="filter-inputs z-10"
              placeholderText="Add Dates"
              popperClassName="date-picker-popper"
            />
          </div>
          <div className="checkout">
            <span>Check Out Date</span>
            <DatePicker
              selected={checkout}
              onChange={(date) => setCheckout(date)}
              className="filter-inputs z-10"
              placeholderText="Add Dates"
              popperClassName="date-picker-popper"
            />
          </div>
        </div>
        <div className="price-perday">Price per Day :&nbsp;${item?.price}</div>
        <div className="d-flex justify-content-between">
          <div className="total-price fw-bold">Total :&nbsp;${total}</div>
          <button
            className="border px-1 rounded gap-1 d-flex align-items-center"
            onClick={() => handleUpate()}
          >
            <IoMdSave className="fs-5" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateBooking;
