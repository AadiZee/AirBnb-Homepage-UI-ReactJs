import React from "react";

function MenubarItem({ title, active, children, handleClick }) {
  const activeStyle = {
    color: "rgba(0,0,0,0.9)",
    width: "1.85rem",
    height: "1.85rem",
  };

  const inactiveStyle = {
    color: "rgba(0,0,0,0.6)",
    width: "1.85rem",
    height: "1.85rem",
  };

  const styledChild = React.cloneElement(children, {
    style: active ? activeStyle : inactiveStyle,
  });

  return (
    <div
      className="slider-item d-flex flex-column align-items-center justify-content-start flex-shrink-0"
      style={{
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {styledChild}

      <div
        className="d-flex flex-column align-items-center justfiy-content-between mt-1"
        style={{
          minHeight: "2.85rem",
        }}
      >
        <div
          className="py-1"
          style={{
            fontSize: "0.925rem",
            fontWeight: "600",
            color: active ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.6)",
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
            className="w-100 mt-auto"
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

export default MenubarItem;
