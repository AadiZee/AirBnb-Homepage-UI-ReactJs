import React from "react";

import { LuUpload } from "react-icons/lu";

function ContentCard({ image, title, subtitle, notification, screenWidth }) {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-start"
      style={{}}
    >
      <div className="position-relative w-100">
        <img
          className="w-100"
          src={image}
          alt="room"
          style={{
            borderRadius: "1rem",
            objectFit: "cover",
            minHeight: "100%",
            maxHeight: "100%",
            aspectRatio: "20/19",
          }}
        />
        <LuUpload
          className="position-absolute"
          style={{
            top: "11px",
            right: "11px",
            fontSize: "2.65rem",
            background:
              "linear-gradient(0deg,rgba(255,255,255,0.55),rgba(255,255,255,0.55)),linear-gradient(0deg,rgba(255,255,255,0.54) 0%,rgba(255,255,255,0.48) 60%,rgba(255,255,255,0.76) 100%)",
            boxShadow: "0 2px 6px 0 rgba(0,0,0,0.12)",
            color: "#222222",
            borderRadius: "1.5rem",
            padding: "0.6rem",
            zIndex: "100",
            overflow: "visible",
            fontWeight: "bold",
          }}
        />
        <div
          className="position-absolute"
          style={{
            top: "11px",
            left: "11px",
            fontSize: "1.2rem",
            background:
              "linear-gradient(0deg,rgba(255,255,255,0.55),rgba(255,255,255,0.55)),linear-gradient(0deg,rgba(255,255,255,0.54) 0%,rgba(255,255,255,0.48) 60%,rgba(255,255,255,0.76) 100%)",
            boxShadow: "0 2px 6px 0 rgba(0,0,0,0.12)",
            color: "#222222",
            borderRadius: "1.5rem",
            padding: "0.725rem 1.2rem",
            zIndex: "100",
            overflow: "visible",
            fontWeight: "600",
            lineHeight: "1",
          }}
        >
          Live
        </div>
      </div>

      <div
        className="d-flex flex-column align-items-start justify-content-start w-100"
        style={{
          minHeight: "6.5rem",
          paddingTop: "0.75rem",
        }}
      >
        <div
          className="text-start"
          style={{
            fontSize: "1.15rem",
            fontWeight: "600",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {title}
        </div>

        <div
          className="text-start"
          style={{
            fontSize: "1.15rem",
            fontWeight: "500",
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          {subtitle}
        </div>

        <div
          className="text-start"
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
        >
          {notification}
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
