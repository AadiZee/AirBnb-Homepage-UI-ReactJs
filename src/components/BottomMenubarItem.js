import React from "react";

function BottomMenubarItem({ active, title, customClass, setActive }) {
  return (
    <div
      className={`flex-shrink-0 ${
        customClass !== undefined ? customClass : ""
      }`}
      onClick={setActive}
      style={{
        cursor: "pointer",
      }}
    >
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{
          minHeight: "3rem",
        }}
      >
        <div
          className="py-1"
          style={{
            fontSize: "1.05rem",
            fontWeight: "600",
            color: active ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0.6)",
          }}
        >
          {title}
        </div>

        {active ? (
          <div
            className="w-100 mt-auto"
            style={{
              borderTop: "2px solid black",
            }}
          ></div>
        ) : (
          <div
            className="w-50 mt-auto"
            style={{
              borderTop: "2px solid black",
              opacity: 0,
            }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default BottomMenubarItem;
