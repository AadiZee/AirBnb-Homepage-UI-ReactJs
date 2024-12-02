import React, { useRef } from "react";
import "./App.css";
import { ReactComponent as FooterCheckbox } from "./assets/footer-checkbox.svg";

import { useState, useEffect } from "react";

import MenubarItem from "./components/MenubarItem";
import BottomMenubarItem from "./components/BottomMenubarItem";
import BottomSectionItem from "./components/BottomSectionItem";
import ShowMoreBtn from "./components/ShowMoreBtn";
import ContentCard from "./components/ContentCard";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { HiOutlineSearch } from "react-icons/hi";
import { IoHeartOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaAngleLeft, FaAngleRight, FaMinus, FaPlus } from "react-icons/fa6";

import topHeaderData from "./data/TopHeader";
import bottomHeaderData from "./data/BottomHeader";
import mainContentData from "./data/MainContent";
import secondaryContentData from "./components/SecondaryContent";
import bottomContentHeaderData from "./data/BottomContentHeader";
import bottomContentData from "./data/BottomContent";
import footerData from "./data/Footer";

function App() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [userAtTop, setUserAtTop] = useState(false);
  const [userSliderPosition, setUserSliderPosition] = useState(false);
  const [sliderMax, setSliderMax] = useState(false);
  const [activeSliderItem, setActiveSliderItem] = useState(0);
  const [activeBottomSliderItem, setActiveBottomSliderItem] = useState(0);
  const [toggleHeaderBtn, setToggleHeaderBtn] = useState(false);

  const [toggleFirstSection, setToggleFirstSection] = useState(false);
  const [toggleSecondSection, setToggleSecondSection] = useState(false);
  const [toggleThirdSection, setToggleThirdSection] = useState(false);
  const [toggleLastSection, setToggleLastSection] = useState(false);

  const [toggleSmallScreenPopup, setToggleSmallScreenPopup] = useState(false);

  const [counterValue, setCounterValue] = useState(0);

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());

  const sliderRef = useRef(null);

  const handleLeftScroll = () => {
    const sliderElement = sliderRef.current;

    sliderElement.scrollLeft -= 300;
  };

  const handleRightScroll = () => {
    const sliderElement = sliderRef.current;

    sliderElement.scrollLeft += 300;
  };

  const handleAdd = () => {
    setCounterValue((prev) => prev + 1);
  };

  const handleSubstract = () => {
    if (!(counterValue === 0)) {
      setCounterValue((prev) => prev - 1);
    }
  };

  useEffect(() => {
    let timeoutId;
    const slider = sliderRef.current;

    const resizeWindow = () => {
      setScreenWidth(window?.outerWidth);

      if (window?.outerWidth >= 768) {
        setToggleSmallScreenPopup(false);
      } else {
        setToggleFirstSection(false);
        setToggleSecondSection(false);
        setToggleThirdSection(false);
        setToggleLastSection(false);
        setToggleHeaderBtn(false);
      }
    };

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = document.documentElement.clientHeight;

      const isAtTop = scrollTop <= 100;

      const bottomOffset = scrollHeight - viewportHeight - 200;

      const isAtBottom = scrollTop >= bottomOffset;

      setUserAtTop(isAtTop);

      if (timeoutId || isAtBottom) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(
        () => {
          setIsScrolling(false);
        },
        isAtBottom ? 50 : 200
      );

      if (!isAtBottom) {
        setIsScrolling(true);
      }
    };

    const sliderScroll = () => {
      const sliderElement = sliderRef.current;

      const sliderScrolled = sliderElement.scrollLeft > 0;

      const sliderPosition = sliderElement.scrollLeft;

      const maxScroll = sliderElement.scrollWidth;

      const visibleWidth = sliderElement.clientWidth;

      const atTheEnd = maxScroll <= visibleWidth + sliderPosition + 1;

      if (sliderScrolled) {
        setUserSliderPosition(true);
      } else {
        setUserSliderPosition(false);
      }

      if (atTheEnd) {
        setSliderMax(true);
      } else {
        setSliderMax(false);
      }
    };

    resizeWindow();
    handleScroll();
    sliderScroll();

    window.addEventListener("resize", resizeWindow);
    window.addEventListener("scroll", handleScroll);
    slider.addEventListener("scroll", sliderScroll);

    return () => {
      window.removeEventListener("resize", resizeWindow);
      window.removeEventListener("scroll", handleScroll);
      slider.addEventListener("scroll", sliderScroll);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="container-fluid p-0">
      <div
        className="row w-100 mx-auto"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="col-12 p-0">
          <div
            className="row w-100 h-100 mx-auto flex-column justify-content-between"
            style={{}}
          >
            {/* HEADER */}

            <div
              className="col-12 p-0"
              style={{
                position: "fixed",
                zIndex: 1000,
                backgroundColor: "white",
                top: "0",
                boxShadow:
                  screenWidth <= 767
                    ? "rgb(0 0 0/16%) 0 0 6px"
                    : !userAtTop
                    ? "rgb(0 0 0/16%) 0 0 6px"
                    : "unset",
              }}
            >
              <div
                className="row w-100 mx-auto"
                style={{
                  backgroundColor: "#ffffff",
                }}
              >
                {/* HEADER */}

                {screenWidth >= 768 ? (
                  // {/* TOP HEADER - LARGE SCREEN */}

                  <div
                    className="col-12"
                    style={{
                      padding: screenWidth >= 1200 ? "0rem 5rem" : "0rem 3rem",
                      borderBottom: "1px solid #EBEBEB",
                    }}
                  >
                    <div
                      className="row w-100 mx-auto flex-column align-items-center justify-content-between pb-3 pt-3"
                      style={{}}
                    >
                      <div className="col-12 p-0 py-1">
                        <div
                          className="d-flex align-items-center justify-content-between"
                          style={{
                            minHeight: "3.4rem",
                          }}
                        >
                          {screenWidth <= 991 ? (
                            <div
                              className="d-flex align-items-center justify-content-start"
                              style={{
                                flexBasis: "5.5rem",
                              }}
                            >
                              {topHeaderData.header.left.smallScreenLogo}
                            </div>
                          ) : (
                            <div
                              className="d-flex align-items-center justify-content-start flex-grow-1 flex-shrink-0"
                              style={{
                                flexBasis: "13.42rem",
                              }}
                            >
                              {screenWidth >= 992
                                ? topHeaderData.header.left.largeScreenLogo
                                : topHeaderData.header.left.smallScreenLogo}
                            </div>
                          )}

                          {/* MIDDLE ROW -> MIDDLE COL ON LARGE SCREEN */}

                          {userAtTop && screenWidth >= 992 && (
                            <div className="col-auto p-0">
                              <div
                                className="d-flex align-items-center justify-content-between"
                                style={{
                                  minHeight: "3rem",
                                  gap: "2rem",
                                }}
                              >
                                <div
                                  className=""
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "1.23rem",
                                  }}
                                >
                                  {topHeaderData.middle.title}
                                </div>

                                <div
                                  className=""
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "1.23rem",
                                    color: "rgba(0,0,0,0.6)",
                                  }}
                                >
                                  {topHeaderData.middle.subtitle}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* SEARCH BUTTON ON SCROLL */}

                          {!userAtTop && (
                            <div
                              className="d-flex align-items-center justify-content-center flex-grow-0 flex-shrink-1"
                              style={{
                                flexBasis: "auto",
                              }}
                            >
                              <div
                                className="w-100 d-flex"
                                style={{
                                  height: "46px",
                                  border: "1px solid #DDDDDD",
                                  borderRadius: "23px",
                                  boxShadow:
                                    "0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)",
                                }}
                              >
                                <div
                                  className="h-100 d-flex align-items-center"
                                  style={{
                                    flex: "1 1 0%",
                                    minWidth: "0",
                                  }}
                                >
                                  {/* FIRST SECTION */}

                                  <div
                                    className=""
                                    style={{
                                      flex: "1 0 0%",
                                    }}
                                  >
                                    <div
                                      className="d-flex align-items-center"
                                      style={{
                                        margin: "-1px",
                                        minWidth: "0",
                                      }}
                                    >
                                      <div
                                        className="search-btn-hover"
                                        style={{
                                          padding: "14px 18px",
                                          flex: "1 0 0%",
                                          borderRadius: "23px",
                                          border: "1px solid transparent",
                                          minWidth: "0",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <div className="" style={{}}>
                                          <div
                                            className=""
                                            style={{
                                              paddingBottom: "2px",
                                              lineHeight: "16px",
                                              fontSize: "13px",
                                              fontWeight: "500",
                                              letterSpacing: "normal",
                                            }}
                                          >
                                            {
                                              topHeaderData.scrollSearchBtn
                                                .first
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className=""
                                    style={{
                                      height: "20px",
                                      borderRight: "1px solid #DDDDDD",
                                      flex: "0 0 0",
                                    }}
                                  ></div>

                                  {/* SECOND SECTION */}

                                  <div
                                    className="d-flex align-items-center"
                                    style={{
                                      flex: "1 0 0%",
                                    }}
                                  >
                                    <div
                                      className="d-flex align-items-center"
                                      style={{
                                        margin: "-1px",
                                        minWidth: "0",
                                        width: "initial",
                                        flex: "1 0 0%",
                                      }}
                                    >
                                      <div
                                        className="search-btn-hover"
                                        style={{
                                          cursor: "pointer",
                                          textAlign: "left",
                                          overflow: "visible",
                                          flex: "1 0 0%",
                                        }}
                                      >
                                        <div
                                          className=""
                                          style={{
                                            padding: "14px 18px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            width: "100%",
                                          }}
                                        >
                                          <div
                                            className=""
                                            style={{
                                              paddingBottom: "2px",
                                              lineHeight: "16px",
                                              fontSize: "13px",
                                              letterSpacing: "0",
                                              fontWeight: "500",
                                            }}
                                          >
                                            {
                                              topHeaderData.scrollSearchBtn
                                                .second
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className=""
                                    style={{
                                      height: "20px",
                                      borderRight: "1px solid #DDDDDD",
                                      flex: "0 0 0",
                                    }}
                                  ></div>

                                  {/* THIRD SECTION */}

                                  <div
                                    className="d-flex"
                                    style={{
                                      flex: "1 0 0%",
                                    }}
                                  >
                                    <div className="d-flex align-items-center w-100 search-btn-hover">
                                      <div
                                        className=""
                                        style={{
                                          flex: "1 0 0%",
                                          margin: "0",
                                          textAlign: "left",
                                          border: "0",
                                          padding: "1px",
                                          overflow: "visible",
                                        }}
                                      >
                                        <div
                                          className=""
                                          style={{
                                            padding: "14px 18px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            width: "100%",
                                          }}
                                        >
                                          <div
                                            className=""
                                            style={{
                                              paddingBottom: "2px",
                                              fontSize: "13px",
                                              lineHeight: "16px",
                                              fontWeight: "500",
                                              letterSpacing: "0",
                                            }}
                                          >
                                            {topHeaderData.scrollSearchBtn.last}
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        className=""
                                        style={{
                                          flex: "0 0 auto",
                                          paddingRight: "6px",
                                          marginLeft: "-6px",
                                        }}
                                      >
                                        <button
                                          className=""
                                          style={{
                                            backgroundColor: "#FF385C",
                                            fontSize: "16px",
                                            borderRadius: "24px",
                                            lineHeight: "16px",
                                            fontWeight: "500",
                                            overflow: "hidden",
                                            height: "32px",
                                            maxWidth: "32px",
                                            cursor: "pointer",
                                            outline: "none",
                                            verticalAlign: "middle",
                                            display: "inline-block",
                                            border: "0",
                                          }}
                                        >
                                          <div
                                            className=""
                                            style={{
                                              display: "inline-flex",
                                              padding: "9px",
                                            }}
                                          >
                                            <div className="" style={{}}>
                                              {
                                                topHeaderData.scrollSearchBtn
                                                  .icon
                                              }
                                            </div>

                                            <div
                                              className=""
                                              style={{
                                                paddingLeft: "8px",
                                                paddingRight: "4px",
                                                opacity: 0,
                                              }}
                                            >
                                              Search
                                            </div>
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* SEARCH BUTTON ON SCROLL */}

                          <div
                            className="d-flex align-items-center justify-content-end flex-grow-1 flex-shrink-0"
                            style={{
                              flexBasis: "13.42rem",
                            }}
                          >
                            <div
                              className=""
                              style={{
                                fontSize: "1.15rem",
                                fontWeight: "500",
                              }}
                            >
                              {topHeaderData.header.right.title}
                            </div>

                            {topHeaderData.header.right.icon}

                            <div className="position-relative">
                              <button
                                className="header-menu-btn btn d-flex align-items-center justify-content-between"
                                type="button"
                                style={{
                                  border: "1px solid rgba(0,0,0,0.2)",
                                  borderRadius: "2rem",
                                  padding: "0.65rem 0.7rem 0.65rem 1.25rem",
                                  boxShadow: toggleHeaderBtn
                                    ? "0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)"
                                    : "",
                                }}
                                onClick={() => {
                                  setToggleHeaderBtn(!toggleHeaderBtn);
                                  setToggleFirstSection(false);
                                  setToggleSecondSection(false);
                                  setToggleThirdSection(false);
                                  setToggleLastSection(false);
                                }}
                              >
                                {topHeaderData.header.right.button.leftIcon}

                                {topHeaderData.header.right.button.rightIcon}
                              </button>

                              {toggleHeaderBtn && (
                                <div
                                  className="position-absolute"
                                  style={{
                                    top: "5rem",
                                    right: "0",
                                    borderRadius: "0.75rem",
                                    boxShadow:
                                      "0 4px 12px 0 rgba(0,0,0,0.1),0 2px 2px 0 rgba(0,0,0,0.08)",
                                    minWidth: "18rem",
                                    backgroundColor: "white",
                                    zIndex: "1000",
                                  }}
                                >
                                  <div
                                    className="row w-100 mx-auto"
                                    style={{
                                      padding: "0.75rem 0",
                                    }}
                                  >
                                    <div className="col-12 p-0">
                                      <button
                                        className="btn w-100 text-start"
                                        type="button"
                                        style={{
                                          fontSize: "1.1rem",
                                          padding: "0.75rem 1.1rem",
                                        }}
                                      >
                                        Sign up
                                      </button>
                                    </div>
                                    <div className="col-12 p-0">
                                      <button
                                        className="btn w-100 text-start"
                                        type="button"
                                        style={{
                                          fontSize: "1.1rem",
                                          padding: "0.75rem 1.1rem",
                                        }}
                                      >
                                        Log in
                                      </button>
                                    </div>
                                    <div
                                      className="col-12 p-0"
                                      style={{
                                        borderTop: "1px solid rgba(0,0,0,0.1)",
                                        margin: "0.75rem 0",
                                      }}
                                    ></div>
                                    <div className="col-12 p-0">
                                      <button
                                        className="btn w-100 text-start"
                                        type="button"
                                        style={{
                                          fontSize: "1.1rem",
                                          padding: "0.75rem 1.1rem",
                                        }}
                                      >
                                        Gift cards
                                      </button>
                                    </div>
                                    <div className="col-12 p-0">
                                      <button
                                        className="btn w-100 text-start"
                                        type="button"
                                        style={{
                                          fontSize: "1.1rem",
                                          padding: "0.75rem 1.1rem",
                                        }}
                                      >
                                        Airbnb your home
                                      </button>
                                    </div>
                                    <div className="col-12 p-0">
                                      <button
                                        className="btn w-100 text-start"
                                        type="button"
                                        style={{
                                          fontSize: "1.1rem",
                                          padding: "0.75rem 1.1rem",
                                        }}
                                      >
                                        Host an experience
                                      </button>
                                    </div>
                                    <div className="col-12 p-0">
                                      <button
                                        className="btn w-100 text-start"
                                        type="button"
                                        style={{
                                          fontSize: "1.1rem",
                                          padding: "0.75rem 1.1rem",
                                        }}
                                      >
                                        Help Center
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* HEADER BOTTOM SECTION WHEN USER AT TOP */}

                      {userAtTop && (
                        <>
                          {screenWidth <= 991 && (
                            <div className="col-auto p-0">
                              <div
                                className="d-flex align-items-center justify-content-between py-4 pb-3"
                                style={{
                                  minHeight: "3rem",
                                  gap: "2rem",
                                }}
                              >
                                <div
                                  className=""
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "1.23rem",
                                  }}
                                >
                                  {topHeaderData.middle.title}
                                </div>

                                <div
                                  className=""
                                  style={{
                                    fontWeight: "500",
                                    fontSize: "1.23rem",
                                    color: "rgba(0,0,0,0.6)",
                                  }}
                                >
                                  {topHeaderData.middle.subtitle}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* SEARCH BUTTON */}

                          <div className="col-12 p-0 py-3">
                            <div
                              className="mx-auto"
                              style={{
                                maxWidth: "800px",
                              }}
                            >
                              <div
                                className="w-100 d-flex"
                                style={{
                                  height: "66px",
                                  border: "1px solid #DDDDDD",
                                  borderRadius: "32px",
                                  boxShadow:
                                    "0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)",
                                }}
                              >
                                <div
                                  className="h-100 d-flex align-items-center"
                                  style={{
                                    flex: "1 1 0%",
                                    minWidth: "0",
                                  }}
                                >
                                  {/* FIRST SECTION */}

                                  <div
                                    className=""
                                    style={{
                                      flex: "1 0 0%",
                                    }}
                                  >
                                    <div
                                      className="d-flex align-items-center position-relative"
                                      style={{
                                        margin: "-1px",
                                        minWidth: "0",
                                      }}
                                    >
                                      <div
                                        className="search-btn-hover"
                                        style={{
                                          padding: "14px 32px",
                                          flex: "1 0 0%",
                                          borderRadius: "32px",
                                          border: "1px solid transparent",
                                          minWidth: "0",
                                          cursor: "pointer",
                                          backgroundColor: toggleFirstSection
                                            ? "#EBEBEB"
                                            : "",
                                        }}
                                        onClick={() => {
                                          setToggleFirstSection(
                                            !toggleFirstSection
                                          );
                                          setToggleSecondSection(false);
                                          setToggleThirdSection(false);
                                          setToggleLastSection(false);
                                          setToggleHeaderBtn(false);
                                        }}
                                      >
                                        <div className="" style={{}}>
                                          <div
                                            className=""
                                            style={{
                                              paddingBottom: "2px",
                                              lineHeight: "16px",
                                              fontSize: "12px",
                                              fontWeight: "500",
                                              letterSpacing: "normal",
                                            }}
                                          >
                                            {
                                              topHeaderData.searchBtn
                                                .firstSection.title
                                            }
                                          </div>

                                          <div
                                            className=""
                                            style={{
                                              fontSize: "14px",
                                              lineHeight: "18px",
                                              textOverflow: "ellipsis",
                                              width: "100%",
                                              color: "#6A6A6A",
                                              letterSpacing: "normal",
                                            }}
                                          >
                                            {
                                              topHeaderData.searchBtn
                                                .firstSection.subtitle
                                            }
                                          </div>
                                        </div>
                                      </div>

                                      {toggleFirstSection && (
                                        <div
                                          className="position-absolute"
                                          style={{
                                            top: "6rem",
                                            left: "0",
                                            right: "0",
                                            backgroundColor: "#ffffff",
                                            zIndex: "1000",
                                            borderRadius: "0.75rem",
                                          }}
                                        >
                                          <div
                                            className="row w-100 mx-auto"
                                            style={{
                                              borderRadius: "0.75rem",
                                              padding: "0.75rem 0.75rem",
                                              boxShadow:
                                                "0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)",
                                            }}
                                          >
                                            <div className="col-12 p-0">
                                              <input
                                                type="text"
                                                className="form-control w-100 px-3 py-2"
                                                placeholder="Enter your destination ..."
                                                style={{
                                                  fontSize: "1.1rem",
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div
                                    className=""
                                    style={{
                                      height: "32px",
                                      borderRight: "1px solid #DDDDDD",
                                      flex: "0 0 0",
                                    }}
                                  ></div>

                                  {/* SECOND SECTION */}

                                  <div
                                    className="d-flex align-items-center position-relative h-100"
                                    style={{
                                      flex: "1 0 0%",
                                    }}
                                  >
                                    {toggleSecondSection && (
                                      <div
                                        className="position-absolute"
                                        style={{
                                          top: "6rem",
                                          left: "0",
                                          right: "0",
                                          backgroundColor: "#ffffff",
                                          zIndex: "1000",
                                          borderRadius: "0.75rem",
                                        }}
                                      >
                                        <div
                                          className="row w-100 mx-auto"
                                          style={{
                                            borderRadius: "0.75rem",
                                            padding: "0.75rem 0.75rem",
                                            boxShadow:
                                              "0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)",
                                          }}
                                        >
                                          <div className="col-12 p-0">
                                            {/* <input type='date' className='form-control w-100 px-3 py-2'  placeholder='' style={{
																						fontSize: '1.1rem',
																						color: 'rgba(0,0,0,0.5)'
																					}}/> */}
                                            <Calendar
                                              onChange={setCheckInDate}
                                              value={checkInDate}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    {toggleThirdSection && (
                                      <div
                                        className="position-absolute"
                                        style={{
                                          top: "6rem",
                                          left: "0",
                                          right: "0",
                                          backgroundColor: "#ffffff",
                                          zIndex: "1000",
                                          borderRadius: "0.75rem",
                                        }}
                                      >
                                        <div
                                          className="row w-100 mx-auto"
                                          style={{
                                            borderRadius: "0.75rem",
                                            padding: "0.75rem 0.75rem",
                                            boxShadow:
                                              "0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)",
                                          }}
                                        >
                                          <div className="col-12 p-0">
                                            {/* <input type='date' className='form-control w-100 px-3 py-2'  placeholder='' style={{
																						fontSize: '1.1rem',
																						color: 'rgba(0,0,0,0.5)'
																					}}/> */}
                                            <Calendar
                                              onChange={setCheckOutDate}
                                              value={checkOutDate}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    <div
                                      className="d-flex align-items-center"
                                      style={{
                                        margin: "-1px",
                                        minWidth: "0",
                                        width: "initial",
                                        flex: "1 0 0%",
                                      }}
                                    >
                                      <div
                                        className="search-btn-hover"
                                        style={{
                                          cursor: "pointer",
                                          textAlign: "left",
                                          overflow: "visible",
                                          flex: "1 0 0%",
                                          borderRadius: "32px",
                                          backgroundColor: toggleSecondSection
                                            ? "#EBEBEB"
                                            : "",
                                        }}
                                        onClick={() => {
                                          setToggleSecondSection(
                                            !toggleSecondSection
                                          );
                                          setToggleFirstSection(false);
                                          setToggleThirdSection(false);
                                          setToggleLastSection(false);
                                          setToggleHeaderBtn(false);
                                        }}
                                      >
                                        <div
                                          className=""
                                          style={{
                                            padding: "14px 24px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            width: "100%",
                                          }}
                                        >
                                          <div
                                            className=""
                                            style={{
                                              paddingBottom: "2px",
                                              lineHeight: "16px",
                                              fontSize: "12px",
                                              letterSpacing: "0",
                                              fontWeight: "500",
                                            }}
                                          >
                                            {
                                              topHeaderData.searchBtn
                                                .secondSection.title
                                            }
                                          </div>

                                          <div
                                            className=""
                                            style={{
                                              fontSize: "14px",
                                              lineHeight: "18px",
                                              fontWeight: "400",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              width: "100%",
                                              color: "#6A6A6A",
                                              letterSpacing: "normal",
                                            }}
                                          >
                                            {
                                              topHeaderData.searchBtn
                                                .secondSection.subtitle
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      className=""
                                      style={{
                                        borderRight: "1px solid #DDDDDD",
                                        height: "32px",
                                        flex: "0 0 0",
                                      }}
                                    ></div>

                                    <div
                                      className="d-flex align-items-center"
                                      style={{
                                        margin: "-1px",
                                        minWidth: "0",
                                        width: "initial",
                                        flex: "1 0 0%",
                                      }}
                                    >
                                      <div
                                        className="search-btn-hover"
                                        style={{
                                          cursor: "pointer",
                                          textAlign: "left",
                                          overflow: "visible",
                                          flex: "1 0 0%",
                                          borderRadius: "32px",
                                          backgroundColor: toggleThirdSection
                                            ? "#EBEBEB"
                                            : "",
                                        }}
                                        onClick={() => {
                                          setToggleThirdSection(
                                            !toggleThirdSection
                                          );
                                          setToggleFirstSection(false);
                                          setToggleSecondSection(false);
                                          setToggleLastSection(false);
                                          setToggleHeaderBtn(false);
                                        }}
                                      >
                                        <div
                                          className=""
                                          style={{
                                            padding: "14px 24px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            width: "100%",
                                          }}
                                        >
                                          <div
                                            className=""
                                            style={{
                                              paddingBottom: "2px",
                                              lineHeight: "16px",
                                              fontSize: "12px",
                                              letterSpacing: "0",
                                              fontWeight: "500",
                                            }}
                                          >
                                            {
                                              topHeaderData.searchBtn
                                                .thirdSection.title
                                            }
                                          </div>

                                          <div
                                            className=""
                                            style={{
                                              fontSize: "14px",
                                              lineHeight: "18px",
                                              fontWeight: "400",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              width: "100%",
                                              color: "#6A6A6A",
                                              letterSpacing: "normal",
                                            }}
                                          >
                                            {
                                              topHeaderData.searchBtn
                                                .thirdSection.subtitle
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className=""
                                    style={{
                                      height: "32px",
                                      borderRight: "1px solid #DDDDDD",
                                      flex: "0 0 0",
                                    }}
                                  ></div>

                                  {/* THIRD SECTION */}

                                  <div
                                    className="d-flex position-relative"
                                    style={{
                                      flex: "1 0 0%",
                                    }}
                                  >
                                    {toggleLastSection && (
                                      <div
                                        className="position-absolute"
                                        style={{
                                          top: "6rem",
                                          left: "0",
                                          right: screenWidth <= 991 && "0",
                                          backgroundColor: "#ffffff",
                                          zIndex: "1000",
                                          borderRadius: "0.75rem",
                                          minWidth:
                                            screenWidth >= 992 ? "25rem" : "",
                                        }}
                                      >
                                        <div
                                          className="row w-100 mx-auto align-items-center"
                                          style={{
                                            borderRadius: "0.75rem",
                                            padding: "0.75rem 0.75rem",
                                            boxShadow:
                                              "0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)",
                                          }}
                                        >
                                          <div className="col-auto p-0">
                                            <button
                                              type="button"
                                              className="btn"
                                              style={{
                                                backgroundColor:
                                                  "rgb(255, 56, 92)",
                                                color: "#fff",
                                                padding: "0.6rem",
                                              }}
                                              onClick={() => handleAdd()}
                                            >
                                              <div className="d-flex align-items-end gap-2">
                                                <div
                                                  className="flex-grow-1"
                                                  style={{
                                                    fontSize: "1.1rem",
                                                    fontWeight: "500",
                                                    lineHeight: "1",
                                                    // paddingTop: '0.2rem'
                                                  }}
                                                >
                                                  GUESTS
                                                </div>
                                                <FaPlus
                                                  className="calc-icon"
                                                  style={{
                                                    height: "1.3rem",
                                                    width: "1.3rem",
                                                    // padding: '0.4rem',
                                                    // borderRadius: '0.25rem',
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </div>
                                            </button>
                                          </div>
                                          <div className="col p-0">
                                            <div
                                              className="text-center w-100"
                                              style={{
                                                fontWeight: "500",
                                                fontSize: "1.35rem",
                                              }}
                                            >
                                              {counterValue}
                                            </div>
                                          </div>
                                          <div className="col-auto p-0">
                                            <button
                                              type="button"
                                              className="btn"
                                              style={{
                                                backgroundColor:
                                                  "rgb(255, 56, 92)",
                                                color: "#fff",
                                                padding: "0.6rem",
                                              }}
                                              onClick={() => handleSubstract()}
                                            >
                                              <div className="d-flex align-items-end gap-2">
                                                <div
                                                  className="flex-grow-1"
                                                  style={{
                                                    fontSize: "1.1rem",
                                                    fontWeight: "500",
                                                    lineHeight: "1",
                                                    // paddingTop: '0.2rem'
                                                  }}
                                                >
                                                  GUESTS
                                                </div>
                                                <FaMinus
                                                  className="calc-icon"
                                                  style={{
                                                    height: "1.3rem",
                                                    width: "1.3rem",
                                                    // padding: '0.4rem',
                                                    // borderRadius: '0.25rem',
                                                    cursor: "pointer",
                                                  }}
                                                />
                                              </div>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    <div
                                      className="d-flex align-items-center w-100 search-btn-hover"
                                      style={{
                                        // margin: '-1px',
                                        borderRadius: "32px",
                                        backgroundColor: toggleLastSection
                                          ? "#EBEBEB"
                                          : "",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setToggleLastSection(
                                          !toggleLastSection
                                        );
                                        setToggleFirstSection(false);
                                        setToggleSecondSection(false);
                                        setToggleThirdSection(false);
                                        setToggleHeaderBtn(false);
                                      }}
                                    >
                                      <div
                                        className=""
                                        style={{
                                          flex: "1 0 0%",
                                          margin: "0",
                                          textAlign: "left",
                                          border: "0",
                                          padding: "1px",
                                          overflow: "visible",
                                        }}
                                      >
                                        <div
                                          className=""
                                          style={{
                                            padding: "14px 24px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            width: "100%",
                                          }}
                                        >
                                          <div
                                            className=""
                                            style={{
                                              paddingBottom: "2px",
                                              fontSize: "12px",
                                              lineHeight: "16px",
                                              fontWeight: "500",
                                              letterSpacing: "0",
                                            }}
                                          >
                                            {
                                              topHeaderData.searchBtn
                                                .lastSection.title
                                            }
                                          </div>

                                          <div
                                            className=""
                                            style={{
                                              lineHeight: "18px",
                                              fontSize: "14px",
                                              fontWeight: "400",
                                              textOverflow: "ellipsis",
                                              overflow: "hidden",
                                              width: "100%",
                                              letterSpacing: "normal",
                                              color: "#6A6A6A",
                                            }}
                                          >
                                            {
                                              topHeaderData.searchBtn
                                                .lastSection.subtitle
                                            }
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        className=""
                                        style={{
                                          flex: "0 0 auto",
                                          paddingRight: "9px",
                                          marginLeft: "-6px",
                                        }}
                                      >
                                        <button
                                          className=""
                                          style={{
                                            backgroundColor: "#FF385C",
                                            fontSize: "16px",
                                            borderRadius: "24px",
                                            lineHeight: "16px",
                                            fontWeight: "500",
                                            overflow: "hidden",
                                            height: "48px",
                                            maxWidth: "48px",
                                            cursor: "pointer",
                                            outline: "none",
                                            verticalAlign: "middle",
                                            display: "inline-block",
                                            border: "0",
                                          }}
                                        >
                                          <div
                                            className=""
                                            style={{
                                              display: "inline-flex",
                                              padding: "16px",
                                            }}
                                          >
                                            <div className="" style={{}}>
                                              <HiOutlineSearch
                                                className=""
                                                style={{
                                                  display: "block",
                                                  fill: "none",
                                                  height: "16px",
                                                  width: "16px",
                                                  stroke: "currentColor",
                                                  strokeWidth: "4",
                                                  overflow: "visible",
                                                  color: "white",
                                                }}
                                              />
                                            </div>

                                            <div
                                              className=""
                                              style={{
                                                paddingLeft: "8px",
                                                paddingRight: "4px",
                                                opacity: 0,
                                              }}
                                            >
                                              Search
                                            </div>
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  // {/* TOP HEADER - SMALL SCREEN */}

                  <div
                    className="col-12 p-0"
                    style={{
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center position-relative"
                      style={{
                        height: "55px",
                        margin:
                          screenWidth <= 374
                            ? "1.25rem 1.35rem 0 1.35rem"
                            : "1.25rem 1.5rem 0 1.5rem",
                      }}
                    >
                      <button
                        className="btn p-0 w-100 h-100"
                        type="button"
                        style={{
                          boxShadow: "0 3px 10px rgba(0 0 0/0.1)",
                          border: "0.5px solid rgba(0 0 0/0.08)",
                          borderRadius: "2.5rem",
                          minWidth: "20rem",
                        }}
                        onClick={() =>
                          setToggleSmallScreenPopup(!toggleSmallScreenPopup)
                        }
                      >
                        <div
                          className="d-flex align-items-center justify-content-start"
                          style={{
                            padding: "0 1rem",
                          }}
                        >
                          <div
                            className="h-100 d-flex align-items-center justify-content-center"
                            style={{}}
                          >
                            <box-icon
                              name="search"
                              color=""
                              size="2rem"
                              style={{}}
                            ></box-icon>
                          </div>

                          <div
                            className="d-flex flex-column align-items-start justify-content-between"
                            style={{
                              paddingLeft: "0.9rem",
                            }}
                          >
                            <div
                              className=""
                              style={{
                                fontSize: "1.15rem",
                                fontWeight: "500",
                                letterSpacing: "normal",
                              }}
                            >
                              {topHeaderData.smallScreenSearchBtn.title}
                            </div>

                            <div
                              className=""
                              style={{
                                fontSize: "0.9rem",
                                fontWeight: "400",
                                color: "#6A6A6A",
                              }}
                            >
                              {topHeaderData.smallScreenSearchBtn.subtitle}
                            </div>
                          </div>
                        </div>
                      </button>
                      {toggleSmallScreenPopup && (
                        <div
                          className="position-absolute"
                          style={{
                            top: "5.25rem",
                            left: "0",
                            right: "0",
                            backgroundColor: "#fff",
                            zIndex: "1000",
                            borderRadius: "0.75rem",
                            boxShadow:
                              "0 0 8px 3px rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)",
                          }}
                        >
                          <div className="row w-100 mx-auto ">
                            <div className="col-12 p-0">
                              <div
                                className=""
                                style={{
                                  borderRadius: "0.75rem",
                                  padding: "0.75rem 0.75rem",
                                  // boxShadow: '0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)'
                                }}
                              >
                                <input
                                  type="text"
                                  className="form-control w-100 px-3 py-2"
                                  placeholder="Enter your destination ..."
                                  style={{
                                    fontSize: "1.1rem",
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              className="col-12"
                              style={{
                                padding: "0.75rem",
                              }}
                            >
                              <div
                                className=""
                                style={{
                                  borderRadius: "0.375rem",
                                  padding: "0.75rem",
                                  border: "1px solid #dee2e6",
                                }}
                              >
                                <Calendar
                                  onChange={setCheckOutDate}
                                  value={checkOutDate}
                                />
                              </div>
                            </div>
                            <div
                              className="col-12"
                              style={{
                                borderRadius: "0.75rem",
                                padding: "0.75rem",
                              }}
                            >
                              <div
                                className="row w-100 mx-auto align-items-center"
                                style={{
                                  borderRadius: "0.375rem",
                                  padding: "0.75rem",
                                  border: "1px solid #dee2e6",
                                  // boxShadow: '0 3px 12px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.08)'
                                }}
                              >
                                <div className="col-auto p-0">
                                  <button
                                    type="button"
                                    className="btn d-flex align-items-end"
                                    style={{
                                      backgroundColor: "rgb(255, 56, 92)",
                                      color: "#fff",
                                      padding: "0.7rem",
                                      gap: "0.35rem",
                                    }}
                                    onClick={() => handleAdd()}
                                  >
                                    <div
                                      className=""
                                      style={{
                                        fontSize: "1rem",
                                        fontWeight: "500",
                                        lineHeight: "1",
                                      }}
                                    >
                                      GUESTS
                                    </div>
                                    <FaPlus
                                      className="calc-icon"
                                      style={{
                                        height: "1.125rem",
                                        width: "1.125rem",
                                        // padding: '0.4rem',
                                        borderRadius: "0.25rem",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </button>
                                </div>
                                <div className="col p-0">
                                  <div
                                    className="text-center w-100"
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "1.35rem",
                                    }}
                                  >
                                    {counterValue}
                                  </div>
                                </div>
                                <div className="col-auto p-0">
                                  <button
                                    type="button"
                                    className="btn d-flex align-items-end"
                                    style={{
                                      backgroundColor: "rgb(255, 56, 92)",
                                      color: "#fff",
                                      padding: "0.7rem",
                                      gap: "0.35rem",
                                    }}
                                    onClick={() => handleSubstract()}
                                  >
                                    <div
                                      className=""
                                      style={{
                                        fontSize: "1rem",
                                        fontWeight: "500",
                                        lineHeight: "1",
                                      }}
                                    >
                                      GUESTS
                                    </div>
                                    <FaMinus
                                      className="calc-icon"
                                      style={{
                                        height: "1.125rem",
                                        width: "1.125rem",
                                        // padding: '0.4rem',
                                        borderRadius: "0.25rem",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SLIDER MENU */}

                <div
                  className="col-12"
                  style={
                    screenWidth <= 767
                      ? {
                          padding: "0",
                          marginTop: "1.25rem",
                        }
                      : !userAtTop && screenWidth >= 768
                      ? {
                          // boxShadow: 'rgb(0 0 0/16%) 0 6px 6px -6px',
                          marginTop: "1.25rem",
                          padding: screenWidth >= 1200 ? "0 5rem" : "0 3rem",
                        }
                      : {
                          marginTop: "2rem",
                          padding: screenWidth >= 1200 ? "0 5rem" : "0 3rem",
                        }
                  }
                >
                  <div
                    className="d-flex align-items-center justify-content-center w-100"
                    style={{}}
                  >
                    <div
                      className="position-relative"
                      style={{
                        minWidth: "100%",
                      }}
                    >
                      {userSliderPosition && screenWidth >= 768 && (
                        <div
                          className="position-absolute d-flex align-items-center justify-content-center"
                          style={{
                            top: "-1.5rem",
                            bottom: 0,
                            left: 0,
                            cursor: "pointer",
                          }}
                          onClick={() => handleLeftScroll()}
                        >
                          <FaAngleLeft
                            className=""
                            style={{
                              height: "2rem",
                              width: "2rem",
                              backgroundColor: "rgb(247, 247, 247)",
                              borderRadius: "1rem",
                              boxShadow: "rgb(247, 247, 247) 0px 0px 16px 24px",
                              border: "1px solid rgba(0,0,0,0.3)",
                              padding: "0.4rem",
                              color: "rgba(0,0,0,0.7)",
                            }}
                          />
                        </div>
                      )}

                      <div
                        className="d-flex align-items-start justify-content-start scroll-slider"
                        style={{
                          overflow: "auto",
                          scrollbarWidth: "none",
                          scrollBehavior: "smooth",
                          gap: "2.35rem",
                          paddingInlineStart:
                            screenWidth <= 767 ? "1.5rem" : "0",
                          paddingInlineEnd: screenWidth <= 767 ? "1.5rem" : "0",
                          // scrollSnapType: 'inline mandatory'
                        }}
                        ref={sliderRef}
                      >
                        {bottomHeaderData.slider.map((item) => (
                          <MenubarItem
                            key={item.id}
                            title={item.title}
                            active={item.id === activeSliderItem}
                            handleClick={() => setActiveSliderItem(item.id)}
                          >
                            {item.icon}
                          </MenubarItem>
                        ))}
                      </div>

                      {/* RIGHT ARROW SLIDER */}

                      {screenWidth >= 768 && !sliderMax && (
                        <div
                          className="position-absolute d-flex align-items-center justify-content-center"
                          style={{
                            top: "-1.5rem",
                            bottom: 0,
                            right: 0,
                            cursor: "pointer",
                          }}
                          onClick={() => handleRightScroll()}
                        >
                          <FaAngleRight
                            className=""
                            style={{
                              height: "2rem",
                              width: "2rem",
                              backgroundColor: "rgb(247, 247, 247)",
                              borderRadius: "1rem",
                              boxShadow: "rgb(247, 247, 247) 0px 0px 16px 24px",
                              border: "1px solid rgba(0,0,0,0.3)",
                              padding: "0.4rem",
                              color: "rgba(0,0,0,0.7)",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT */}

            <div
              className="col-12"
              style={
                screenWidth >= 992
                  ? {
                      // LARGE SCREEN - DISTANCE FROM HEADER
                      marginTop: "21.25rem",
                      padding:
                        screenWidth >= 1200 ? "1.5rem 5rem" : "1.5em 2.95rem",
                    }
                  : screenWidth >= 768
                  ? {
                      // MEDIUM SCREEN - DISTANCE FROM HEADER
                      marginTop: "25.75rem",
                      padding:
                        screenWidth >= 1200 ? "1.5rem 5rem" : "1.25em 2.95rem",
                    }
                  : {
                      marginTop: "12rem",
                      padding: "1.5rem",
                    }
              }
            >
              <div className="row w-100 mx-auto">
                <div className="col-12 p-0 m-0">
                  <div
                    className="w-100"
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${
                        screenWidth <= 575
                          ? 1
                          : screenWidth <= 991
                          ? 2
                          : screenWidth <= 1199
                          ? 3
                          : screenWidth <= 1399
                          ? 4
                          : screenWidth <= 1599
                          ? 5
                          : 6
                      }, minmax(0, 1fr)`,
                      gridAutoRows: "minmax(min-content, max-content)",
                      gridAutoFlow: "row dense",
                      columnGap: "1.85rem",
                      rowGap: "2rem",
                    }}
                  >
                    {mainContentData.map((item, index) => {
                      return (
                        <ContentCard
                          key={index}
                          image={item.image}
                          title={item.title}
                          subtitle={item.subtitle}
                          notification={item.notification}
                          screenWidth={screenWidth}
                        />
                      );
                    })}
                  </div>
                </div>

                {/*  SECONDARY CONTENT */}

                {screenWidth >= 992 && (
                  <div className="col-12 p-0 m-0 mt-5">
                    <div className="row w-100 mx-auto">
                      <div className="col-12 p-0 py-4">
                        <div
                          className="w-100 text-start"
                          style={{
                            fontSize: "2.5rem",
                            fontWeight: "500",
                          }}
                        >
                          {secondaryContentData.title}
                        </div>
                      </div>
                      <div className="col-12 p-0">
                        <div
                          className="w-100"
                          style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${
                              screenWidth <= 575
                                ? 1
                                : screenWidth <= 991
                                ? 2
                                : screenWidth <= 1199
                                ? 3
                                : screenWidth <= 1399
                                ? 4
                                : screenWidth <= 1599
                                ? 5
                                : 6
                            }, minmax(0, 1fr)`,
                            gridAutoRows: "minmax(min-content, max-content)",
                            gridAutoFlow: "row dense",
                            columnGap: "1.85rem",
                            rowGap: "2rem",
                          }}
                        >
                          {secondaryContentData.items.map((item, index) => {
                            return (
                              <ContentCard
                                key={index}
                                image={item.image}
                                title={item.title}
                                subtitle={item.subtitle}
                                notification={item.notification}
                                screenWidth={screenWidth}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* BOTTOM CONTENT */}

            <div
              className="col-12 p-0"
              style={{
                backgroundColor: "rgb(247, 247, 247)",
                marginBottom: screenWidth <= 767 && "5.25rem",
              }}
            >
              <div className="row w-100 mx-auto" style={{}}>
                {/* BOTTOM CONTENT HEADER */}

                <div
                  className="col-12"
                  style={{
                    padding: `${
                      screenWidth <= 767
                        ? "2rem 1.5rem"
                        : screenWidth <= 1200
                        ? "2rem 3rem"
                        : screenWidth >= 1200 && screenWidth <= 2000
                        ? "2rem 12rem"
                        : screenWidth >= 2000
                        ? "2rem 20rem"
                        : "2rem 3rem"
                    }`,
                    borderBottom: "0.5px solid rgba(0,0,0,0.15)",
                  }}
                >
                  <div className="row w-100 mx-auto">
                    {/* TITLE */}

                    <div className="col-12 p-0">
                      <div
                        className="w-100 text-start"
                        style={{
                          fontSize: "1.75rem",
                          lineHeight: "1.25",
                          fontWeight: "500",
                        }}
                      >
                        {bottomContentHeaderData.title}
                      </div>
                    </div>

                    {/* SLIDER */}

                    <div className="col-12 p-0">
                      <div
                        className="d-flex align-items-center justify-content-center w-100 pt-4"
                        style={{
                          borderBottom: "1px solid rgba(0,0,0, 0.2)",
                        }}
                      >
                        <div className="position-relative w-100">
                          <div
                            className="d-flex align-items-start justify-content-start w-100"
                            style={{
                              overflow: "auto",
                              scrollbarWidth: "none",
                              gap: "1.75rem",
                            }}
                          >
                            {bottomContentHeaderData.slider.map(
                              (item, index) => {
                                return (
                                  <BottomMenubarItem
                                    active={index === activeBottomSliderItem}
                                    title={item.title}
                                    setActive={() =>
                                      setActiveBottomSliderItem(index)
                                    }
                                  />
                                );
                              }
                            )}
                          </div>

                          {/* SLIDER ARROW */}
                          {screenWidth <= 1100 && (
                            <div
                              className="position-absolute"
                              style={{
                                top: "0",
                                right: "0",
                                bottom: "0",
                              }}
                            >
                              <FaAngleRight
                                className=""
                                style={{
                                  height: "1.25rem",
                                  width: "1.25rem",
                                  backgroundColor: "rgb(247, 247, 247)",
                                  borderRadius: "0.7rem",
                                  boxShadow:
                                    "rgb(247, 247, 247) 0px 0px 10px 14px",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM ITEMS */}

                    <div className="col-12 p-0">
                      <div className="row w-100 mx-auto py-4" style={{}}>
                        <div className="col-6 p-0">
                          <div className="row w-100 mx-auto">
                            {bottomContentHeaderData.smallItems.left.map(
                              (item, index) => {
                                return (
                                  <BottomSectionItem
                                    key={index}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                  />
                                );
                              }
                            )}

                            {screenWidth >= 992 && (
                              <>
                                {bottomContentHeaderData.largeItems.left.map(
                                  (item, index) => {
                                    return (
                                      <BottomSectionItem
                                        key={index}
                                        title={item.title}
                                        subtitle={item.subtitle}
                                      />
                                    );
                                  }
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="col-6 p-0">
                          <div className="row w-100 mx-auto">
                            {bottomContentHeaderData.smallItems.right.map(
                              (item, index) => {
                                return (
                                  <BottomSectionItem
                                    key={index}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                  />
                                );
                              }
                            )}

                            {screenWidth >= 992 && (
                              <>
                                {bottomContentHeaderData.largeItems.right.map(
                                  (item, index) => {
                                    return (
                                      <BottomSectionItem
                                        key={index}
                                        title={item.title}
                                        subtitle={item.subtitle}
                                      />
                                    );
                                  }
                                )}
                              </>
                            )}

                            <ShowMoreBtn />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM CONTENT ABOUT SECTION */}

                <div
                  className="col-12"
                  style={{
                    padding: `${
                      screenWidth <= 767
                        ? "2rem 1.5rem"
                        : screenWidth <= 1200
                        ? "2rem 3rem"
                        : screenWidth >= 1200 && screenWidth <= 2000
                        ? "2rem 12rem"
                        : screenWidth >= 2000
                        ? "2rem 20rem"
                        : "2rem 3rem"
                    }`,
                  }}
                >
                  <div className="row w-100 mx-auto">
                    <div
                      className="col-12 col-lg-4 p-0 pb-4"
                      style={{
                        borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div
                        className="d-flex flex-column align-items-start w-100 justify-content-start pt-lg-2 pb-lg-5 gap-1"
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: "500",
                          color: "rgba(0,0,0, 0.6)",
                        }}
                      >
                        <div
                          className="text-start py-1"
                          style={{
                            fontWeight: "600",
                            color: "black",
                          }}
                        >
                          {bottomContentData.sectionOne.title}
                        </div>

                        {bottomContentData.sectionOne.items.map(
                          (item, index) => {
                            return (
                              <div className="text-start py-1" key={index}>
                                {item}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <div
                      className="col-12 col-lg-4 p-0 pb-4 pt-4 pt-lg-0"
                      style={{
                        borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div
                        className="d-flex flex-column align-items-start w-100 justify-content-start pt-lg-2 pb-lg-5 gap-1"
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: "500",
                          color: "rgba(0,0,0, 0.6)",
                        }}
                      >
                        <div
                          className="text-start py-1"
                          style={{
                            fontWeight: "600",
                            color: "black",
                          }}
                        >
                          {bottomContentData.sectionTwo.title}
                        </div>
                        {bottomContentData.sectionTwo.items.map(
                          (item, index) => {
                            return (
                              <div className="text-start py-1" key={index}>
                                {item}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <div
                      className="col-12 col-lg-4 p-0 pb-4 pt-4 pt-lg-0"
                      style={{
                        borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div
                        className="d-flex flex-column align-items-start w-100 justify-content-start pt-lg-2 pb-lg-5 gap-1"
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: "500",
                          color: "rgba(0,0,0, 0.6)",
                        }}
                      >
                        <div
                          className="text-start py-1"
                          style={{
                            fontWeight: "600",
                            color: "black",
                          }}
                        >
                          {bottomContentData.sectionThree.title}
                        </div>

                        {bottomContentData.sectionThree.items.map(
                          (item, index) => {
                            return (
                              <div className="text-start py-1" key={index}>
                                {item}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>

                    {/* FOOTER */}

                    <div className="col-12 p-0">
                      <div className="row w-100 flex-column flex-lg-row align-items-center justify-content-between mx-auto pb-3 pt-3">
                        <div className="col-12 col-sm-auto col-lg order-1 order-lg-2 p-0">
                          <div
                            className="d-flex align-items-center justify-content-start justify-content-sm-between justify-content-lg-end py-3"
                            style={{
                              fontSize: "1.05rem",
                              fontWeight: "600",
                            }}
                          >
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                minWidth: "6.8rem",
                              }}
                            >
                              {footerData.sectionRight.icon}

                              <div
                                className="d-flex align-items-center"
                                style={{
                                  marginLeft: "0.55rem",
                                  lineHeight: 1,
                                }}
                              >
                                {footerData.sectionRight.title.language}
                                <span
                                  className=""
                                  style={{
                                    marginLeft: "0.25rem",
                                    fontSize: "1.05rem",
                                    fontWeight: "700",
                                  }}
                                >
                                  (
                                </span>
                                {footerData.sectionRight.title.country}
                                <span
                                  style={{
                                    fontSize: "1.05rem",
                                    fontWeight: "700",
                                  }}
                                >
                                  )
                                </span>
                              </div>
                            </div>

                            <div className="px-3" style={{}}>
                              {footerData.sectionRight.currency}
                            </div>

                            {screenWidth >= 576 && (
                              <div
                                className="d-flex align-items-center justify-content-center"
                                style={{
                                  minWidth: "6.8rem",
                                }}
                              >
                                {footerData.sectionRight.icons.map(
                                  (item, index) => {
                                    return item;
                                  }
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-12 col-sm-auto col-lg-auto order-2 order-lg-1 p-0 ps-1 ps-sm-0">
                          <div
                            className="text-start text-sm-center"
                            style={{
                              fontSize: "1.05rem",
                            }}
                          >
                            {footerData.sectionMiddle}
                          </div>
                        </div>

                        <div className="col-12 col-sm-auto col-lg-auto order-2 order-lg-1 p-0 ps-1 ps-sm-0">
                          <div
                            className="text-start text-sm-center"
                            style={{
                              fontSize: "1.05rem",
                            }}
                          >
                            {footerData.sectionLeft[0]}{" "}
                            <span
                              style={{
                                margin: "0 0.75rem",
                                fontSize: "0.75rem",
                              }}
                            >
                              •
                            </span>{" "}
                            {footerData.sectionLeft[1]}{" "}
                            <span
                              style={{
                                margin: "0 0.75rem",
                                fontSize: "0.75rem",
                              }}
                            >
                              •
                            </span>{" "}
                            {footerData.sectionLeft[2]}{" "}
                            <span
                              style={{
                                margin: "0 0.75rem",
                                fontSize: "0.75rem",
                              }}
                            >
                              •
                            </span>{" "}
                            {footerData.sectionLeft[3]}
                            <span className="ms-2">
                              <FooterCheckbox />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM MENU BAR */}
            {screenWidth <= 767 && !isScrolling && screenWidth <= 991 && (
              <div
                className="col-12 p-0"
                style={{
                  position: "fixed",
                  zIndex: 1000,
                  backgroundColor: "white",
                  bottom: 0,
                }}
              >
                <div
                  className="row w-100 h-100 mx-auto align-items-center justify-content-center"
                  style={{
                    minHeight: "3.7rem",
                    boxShadow:
                      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    gap: "2.2rem",
                    padding: "0.85rem 0",
                  }}
                >
                  <div className="col-auto p-0">
                    <div
                      className="d-flex flex-column align-items-center justify-content-center"
                      style={{
                        minWidth: "3.8rem",
                        gap: "0.05rem",
                      }}
                    >
                      <HiOutlineSearch
                        className=""
                        style={{
                          width: "2.25rem",
                          height: "2.25rem",
                          color: "#E81948",
                        }}
                      />

                      <div
                        className=""
                        style={{
                          fontSize: "0.825rem",
                          fontWeight: "500",
                          color: "#E81948",
                          letterSpacing: "normal",
                        }}
                      >
                        Explore
                      </div>
                    </div>
                  </div>

                  <div className="col-auto p-0">
                    <div
                      className="d-flex flex-column align-items-center justify-content-center"
                      style={{
                        minWidth: "3.8rem",
                        gap: "0.05rem",
                      }}
                    >
                      <IoHeartOutline
                        className=""
                        style={{
                          width: "2.25rem",
                          height: "2.25rem",
                          color: "#6A6A6A",
                        }}
                      />

                      <div
                        className=""
                        style={{
                          fontSize: "0.825rem",
                          fontWeight: "400",
                          color: "#6A6A6A",
                          letterSpacing: "normal",
                        }}
                      >
                        Wishlists
                      </div>
                    </div>
                  </div>

                  <div className="col-auto p-0">
                    <div
                      className="d-flex flex-column align-items-center justify-content-center"
                      style={{
                        minWidth: "3.8rem",
                        gap: "0.05rem",
                      }}
                    >
                      <HiOutlineUserCircle
                        className=""
                        style={{
                          width: "2.25rem",
                          height: "2.25rem",
                          color: "#6A6A6A",
                        }}
                      />

                      <div
                        className=""
                        style={{
                          fontSize: "0.825rem",
                          fontWeight: "400",
                          color: "#6A6A6A",
                          letterSpacing: "normal",
                        }}
                      >
                        Log in
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
