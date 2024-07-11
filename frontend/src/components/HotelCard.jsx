import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { GrWifi } from "react-icons/gr";
import { PiTelevisionSimple } from "react-icons/pi";
import { MdOutlineBathtub } from "react-icons/md";
import { RiParkingBoxLine } from "react-icons/ri";

const HotelCard = (props) => {
  const { item } = props;
  let cardWidth = (window.innerWidth - 50) / 4;
  return (
    <>
      <div className="card-wrapper d-flex flex-column p-2 m-1">
        <div className="img-wrapper h-50">
          <img
            src={item?.images[0]}
            alt="hotel"
            className="w-100 h-100 object-fit-cover"
          />
        </div>
        <div className="card-details h-lg-50 h-60 d-flex flex-column">
          <ReactStars
            count={5}
            size={24}
            value={item?.rating || 3}
            edit={false}
            activeColor="#ffd700"
          />
          <h6 className="fs-6">{item?.name}</h6>
          <span className="mt-auto">
            {item?.location?.city},{item?.location?.country}
          </span>
          <div className="facilities d-flex gap-2">
            <div>
              <GrWifi />
            </div>
            <div>
              <PiTelevisionSimple />
            </div>
            <div>
              <RiParkingBoxLine />
            </div>
            <div>
              <MdOutlineBathtub />
            </div>
          </div>
          <div className="price-book d-flex justify-content-between algin-items-center">
            <h4 className="fs-6">{item?.price}</h4>
            <Link to={"/hotel/" + item?.id} className="booking-btn">
              Book
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelCard;
