import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const HotelCard = (props) => {
    const { item }  = props;
  return (
    <>
      <div className="card-wrapper d-flex flex-column p-2 m-1 col">
        <div className="img-wrapper h-50">
          <img src="./images/hotel1.png" alt="hotel" className="w-100 h-100 object-fit-cover" />
        </div>
        <div className="card-details">
          <ReactStars
            count={5}
            size={24}
            value={3}
            edit={false}
            activeColor="#ffd700"
          />
          <h6 className="fs-6">{item?.name}</h6>
          <p>{item?.location}</p>
          <div className="price-book d-flex justify-content-between algin-items-center">
          <h4 className="fs-6">{item?.price}</h4>
          <Link to={"/hotel/" + item?.id} className="booking-btn">Book Now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelCard;
