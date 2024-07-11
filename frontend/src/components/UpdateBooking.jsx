import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { IoMdSave } from "react-icons/io";
import { format, differenceInDays } from "date-fns";
import { useDispatch } from "react-redux";
import { getBookings, updateBooking } from "../features/auth/authSlice";
import { BiCalendarEdit } from "react-icons/bi";
import { PiGearFill } from "react-icons/pi";

const UpdateBooking = (props) => {
  const { item, setUpdate } = props;
  const dispatch = useDispatch();
  const [checkin, setCheckin] = useState(item?.checkinDate);
  const [checkout, setCheckout] = useState(item?.checkoutDate);
  const [total, setTotal] = useState(item?.totalPrice);

  useEffect(() => {
    let noOfDays = differenceInDays(new Date(checkout), new Date(checkin));
    setTotal(item?.price * noOfDays);
  }, [checkin, checkout]);

  const handleUpdate = () => {
    dispatch(
      updateBooking({
        bookingId: item?._id,
        checkinDate: checkin,
        checkoutDate: checkout,
        totalPrice: total,
      })
    ).then(() => {
      dispatch(getBookings());
      setUpdate(false);
    });
  };
  return (
    <>
      <div className="update-booking-wrapper shadow border rounded p-2 bg-light position-fixed start-25 top-50">
        <div className="d-flex align-items-center gap-2 border-bottom border-black-subtle">
          <PiGearFill className="fs-4" />
          <span>
            <h4>Updates Dates</h4>
          </span>
        </div>
        <div className="hotel-name fw-bold fs-5">{item?.hotelName}</div>
        <div className="room-name fw-semibold">{item?.roomName}</div>
        <div className="dates d-flex flex-wrap justify-content-between">
          <div className="checkin ">
            <span>Check In Date</span>
            <div className="edit-date gap-2 d-flex align-items-center">
              <BiCalendarEdit className="fs-4" />
              <DatePicker
                selected={checkin}
                onChange={(date) => setCheckin(date)}
                className="filter-inputs z-10"
                placeholderText="Add Dates"
                popperClassName="date-picker-popper"
                minDate={new Date()}
              />
            </div>
          </div>
          <div className="checkout">
            <span>Check Out Date</span>
            <div className="edit-date gap-2 d-flex align-items-center">
              <BiCalendarEdit className="fs-4" />
              <DatePicker
                selected={checkout}
                onChange={(date) => setCheckout(date)}
                className="filter-inputs z-10"
                placeholderText="Add Dates"
                popperClassName="date-picker-popper"
                minDate={checkin}
              />
            </div>
          </div>
        </div>
        <div className="price-perday">Price per Day :&nbsp;${item?.price}</div>
        <div className="d-flex justify-content-between fs-5">
          <div className="total-price fw-bold">Total :&nbsp;${total}</div>
          <div className="actions d-flex gap-2">
            <button
              className="cancel border-0 bg-transparent"
              onClick={() => {
                setUpdate(false);
              }}
            >
              Cancel
            </button>
            <button
              className="border px-1 rounded gap-1 d-flex align-items-center"
              onClick={() => handleUpdate()}
            >
              <IoMdSave className="fs-5" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBooking;
