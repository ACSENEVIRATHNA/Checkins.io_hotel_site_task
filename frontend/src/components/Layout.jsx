import React, { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  const [checkinDate, setCheckinDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [noOfGuests, setNoOfGuests] = useState(null);
  const [loc, setLoc] = useState(null);
  return (
    <>
      <div className="layout">
        <Header
          setCheckinDate={setCheckinDate}
          setCheckoutDate={setCheckoutDate}
          checkinDate={checkinDate}
          checkoutDate={checkoutDate}
          setLoc={setLoc}
          loc={loc}
          noOfGuests={noOfGuests}
          setNoOfGuests={setNoOfGuests}
        />
        <div className="content container-xxl">
          <Outlet context={{ checkinDate, checkoutDate, loc ,noOfGuests }} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
