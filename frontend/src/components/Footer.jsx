import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="border-top rounded">
        <div className="container-xxl footer-wrapper ">
          <div className="row">
            <div className="col-12 d-flex flex-column justify-content-center">
              <div className="d-flex py-2 flex-column border-bottom align-items-start">
                <span>
                  <b>Contact Us</b>
                </span>
                <div className="d-flex gap-2 align-items-center">
                  <MdEmail/>
                  <span>contact@checkins.ai</span>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <FaPhoneAlt/>
                  <span>0118920678</span>
                </div>
              </div>
              
              <span className="py-2">Powered By Checkins.ai</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
