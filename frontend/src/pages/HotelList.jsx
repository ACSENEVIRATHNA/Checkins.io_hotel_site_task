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
      <div className="container-xxl py-3 list-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="row">
              {hotels &&
                loc != null &&
                hotels?.map((item, index) => {
                  if (item?.location?.city === loc[0]) {
                    return (
                      <div className="col-6 col-lg-4 col-xl-3 p-0">
                        <HotelCard key={index} item={item} />
                      </div>
                    );
                  }
                })}
              {hotels &&
                loc == null &&
                hotels?.map((item, index) => {
                  return (
                    <div className="col-6 col-lg-4 col-xl-3 p-0">
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
