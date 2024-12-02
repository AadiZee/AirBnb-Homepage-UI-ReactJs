import { FaAirbnb } from "react-icons/fa6";

import { PiGlobeSimpleBold } from "react-icons/pi";

import AirbnbLogo from "../components/AirbnbLogo";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";

const smallLogoStyle = {
  color: "#E81948",
  height: "3rem",
  width: "3rem",
};

const largeLogoStyle = {
  color: "#E81948",
  height: "2rem",
  width: "2rem",
};

const globeStyle = {
  height: "1.6rem",
  width: "1.6rem",
  margin: "0 1.75rem",
};

const rightIconStyle = {
  color: "rgba(0,0,0,0.6)",
  height: "2.75rem",
  width: "2.75rem",
  marginLeft: "1.15rem",
};

const leftIconStyle = {
  height: "1.5rem",
  width: "1.5rem",
  borderRadius: "1rem",
  overflow: "visible",
};

const searchIconStyle = {
  display: "block",
  fill: "none",
  height: "14px",
  width: "14px",
  stroke: "currentColor",
  strokeWidth: "4",
  overflow: "visible",
  color: "white",
};

const topHeaderData = {
  header: {
    left: {
      smallScreenLogo: <FaAirbnb style={smallLogoStyle} />,
      largeScreenLogo: <AirbnbLogo className="" style={largeLogoStyle} />,
    },
    right: {
      title: "Airbnb your home",
      icon: <PiGlobeSimpleBold style={globeStyle} />,
      button: {
        leftIcon: <GiHamburgerMenu style={leftIconStyle} />,
        rightIcon: <FaUserCircle style={rightIconStyle} />,
      },
    },
  },
  middle: {
    title: "Stays",
    subtitle: "Experiences",
  },
  searchBtn: {
    firstSection: {
      title: "Where",
      subtitle: "Search destinations",
    },
    secondSection: {
      title: "Check in",
      subtitle: "Add dates",
    },
    thirdSection: {
      title: "Check out",
      subtitle: "Add dates",
    },
    lastSection: {
      title: "Who",
      subtitle: "Add guests",
      icon: <HiOutlineSearch style={searchIconStyle} />,
    },
  },
  scrollSearchBtn: {
    first: "Anywhere",
    second: "Anyweek",
    last: "Add guests",
    icon: <HiOutlineSearch style={searchIconStyle} />,
  },
  smallScreenSearchBtn: {
    title: "Where to?",
    subtitle: (
      <>
        Anywhere <span style={{ margin: "0 1px", color: "inherit" }}>•</span>{" "}
        Anyweek <span style={{ margin: "0 1px", color: "inherit" }}>•</span> Add
        guests
      </>
    ),
  },
};

export default topHeaderData;
