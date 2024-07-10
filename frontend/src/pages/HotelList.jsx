import React, { useEffect } from "react";
import { hotels } from "../utils/Data";
import HotelCard from "../components/HotelCard";
import { useOutletContext } from "react-router-dom";

const HotelList = () => {
  const { loc } = useOutletContext();
  useEffect(() => {
    console.log(loc);
  }, [loc]);
  return (
    <>                                                             
      <div className="container-fluid p-3 list-wrapper">
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <div className="row w-100 row-cols-4">
              {hotels &&
                loc != null &&
                hotels?.map((item, index) => {
                  if (item?.location?.city === loc[0]) {
                    return (
                      <div className="col">
                        <HotelCard key={index} item={item} />
                      </div>
                    );
                  }
                })}
              {hotels &&
                loc == null &&
                hotels?.map((item, index) => {
                  return (
                    <div className="col-3">
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
