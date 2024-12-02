import React from "react";

import { FaChevronDown } from "react-icons/fa";

function ShowMoreBtn() {
  return (
    <div
      className="col-12 col-lg-4"
      style={{
        padding: "0.7rem 0",
      }}
    >
      <div className="d-flex flex-column align-items-start justify-content-between w-100">
        <div
          className="d-flex align-items-center justify-content-between"
          style={{}}
        >
          <div
            className=""
            style={{
              fontSize: "1.05rem",
              fontWeight: "600",
            }}
          >
            Show more
          </div>
          <FaChevronDown
            className="ms-2"
            style={{
              fontWeight: "800",
              width: "0.8rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ShowMoreBtn;
