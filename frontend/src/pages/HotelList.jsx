import React from "react";
import { hotels } from "../utils/Data";
import HotelCard from "../components/HotelCard";

const HotelList = () => {
  return (
    <>
      <div className="container-fluid p-3 list-wrapper">
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <div className="row row-cols-4">
              {hotels &&
                hotels?.map((item, index) => {
                  return (
                    <div className="col">
                      <HotelCard key={index} item={item} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelList;
